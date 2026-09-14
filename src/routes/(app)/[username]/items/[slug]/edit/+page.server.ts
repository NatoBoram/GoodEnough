import { resolve } from '$app/paths'
import { canEdit } from '$lib/auth/authorization.js'
import { asyncResult } from '$lib/result.js'
import { db } from '$lib/server/db/db.js'
import { getItemAttributeValues } from '$lib/server/db/queries.js'
import { getFormString } from '$lib/server/forms.js'
import { logger } from '$lib/server/logger.js'
import { error, fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types.ts'

export const load: PageServerLoad = (async ({ parent, locals }) => {
	if (!locals.user?.id) return error(401, 'Unauthorized')

	const { profile } = await parent()
	if (!canEdit(profile, locals.user)) return error(403, 'Forbidden')
}) satisfies PageServerLoad

export const actions: Actions = {
	item: async ({ request, params, locals }) => {
		// Authentication
		if (!locals.user?.id) return fail(401, 'Unauthorized')

		// Authorization
		const profile = await asyncResult(
			db
				.selectFrom('users')
				.where('username', '=', params.username)
				.select(['id', 'username'])
				.executeTakeFirst(),
			'selecting profile',
		)
		if (!profile.ok) {
			logger.error({ error: profile.error }, 'Failed to select profile')
			return fail(500, 'Failed to select profile')
		}
		if (!profile.value?.username) return fail(404, 'Profile not found')
		if (!canEdit(profile.value, locals.user)) return fail(403, 'Forbidden')

		// Form
		const data = await request.formData()

		const name = getFormString(data, 'name')
		const slug = getFormString(data, 'slug')
		const summary = getFormString(data, 'summary')
		const description = getFormString(data, 'description')

		if (!name) return fail(400, { message: 'Name is required' })
		if (!slug) return fail(400, { message: 'Slug is required' })

		if (slug !== encodeURIComponent(slug)) return fail(400, { message: 'Invalid slug' })

		// Update
		const updated = await asyncResult(
			db
				.updateTable('items')
				.set({ name, slug, summary, description, updated_at: new Date() })
				.where('user', '=', profile.value.id)
				.where('slug', '=', params.slug)
				.returning(['slug'])
				.executeTakeFirstOrThrow(),
			'updating item',
		)
		if (!updated.ok) {
			logger.error({ error: updated.error }, 'Failed to update item')
			return fail(500, { message: 'Failed to update item' })
		}

		return redirect(
			303,
			resolve('/(app)/[username]/items/[slug]', { slug, username: profile.value.username }),
		)
	},
	attributes: async ({ locals, params, request }) => {
		// Authentication
		if (!locals.user?.id) return fail(401, 'Unauthorized')

		// Authorization
		const presult = await asyncResult(
			db
				.selectFrom('users')
				.where('username', '=', params.username)
				.select(['id', 'username'])
				.executeTakeFirst(),
			'selecting profile',
		)
		if (!presult.ok) {
			logger.error({ error: presult.error }, 'Failed to select profile')
			return fail(500, 'Failed to select profile')
		}
		const profile = presult.value

		if (!profile?.username) return fail(404, 'Profile not found')
		if (!canEdit(profile, locals.user)) return fail(403, 'Forbidden')

		const iresult = await asyncResult(
			db
				.selectFrom('items')
				.selectAll()
				.where('slug', '=', params.slug)
				.where('user', '=', profile.id)
				.executeTakeFirst(),
			'loading item',
		)
		if (!iresult.ok) {
			logger.error({ error: iresult.error }, 'Failed to load item')
			return fail(500, 'Failed to load item')
		}
		const item = iresult.value
		if (!item) return fail(404, 'Item not found')

		const aresult = await asyncResult(getItemAttributeValues(item, profile), 'loading attributes')
		if (!aresult.ok) {
			logger.error({ error: aresult.error }, 'Failed to load attributes')
			return fail(500, 'Failed to load attributes')
		}
		const attributes = aresult.value

		if (!attributes.length) return fail(422, { message: 'No attributes found' })

		// Form
		const data = await request.formData()

		const result = await asyncResult(
			db
				.insertInto('attribute_values')
				.values(
					attributes.map(attribute => {
						const value = getFormString(data, `attribute-${attribute.id}`)
						return {
							attribute: attribute.id,
							item: item.id,
							value_boolean:
								attribute.type === 'boolean' ? data.has(`attribute-${attribute.id}`) : null,
							value_date: attribute.type === 'date' && value ? new Date(value) : null,
							value_text: attribute.type === 'text' ? value : null,
							value_number: attribute.type === 'number' && value !== '' ? Number(value) : null,
						}
					}),
				)
				.onConflict(oc =>
					oc.columns(['item', 'attribute']).doUpdateSet({
						value_boolean: eb => eb.ref('excluded.value_boolean'),
						value_date: eb => eb.ref('excluded.value_date'),
						value_number: eb => eb.ref('excluded.value_number'),
						value_text: eb => eb.ref('excluded.value_text'),
					}),
				)
				.execute(),
			'saving attribute values',
		)
		if (!result.ok) {
			logger.error({ error: result.error }, 'Failed to save attribute values')
			return fail(500, 'Failed to save attribute values')
		}

		return { success: true }
	},
}
