import { resolve } from '$app/paths'
import { canEdit } from '$lib/auth/authorization.js'
import { asyncResult } from '$lib/result.js'
import { db } from '$lib/server/db/db.js'
import { getFormString, getFormStrings } from '$lib/server/forms.js'
import { logger } from '$lib/server/logger.js'
import { error, fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types.ts'

export const load: PageServerLoad = (async ({ locals, parent }) => {
	if (!locals.user?.id) return error(401, 'Unauthorized')
	const { profile, attributes } = await parent()
	if (!canEdit(profile, locals.user)) return error(403, 'Forbidden')

	let query = db
		.selectFrom('attributes')
		.orderBy('name', 'asc')
		.selectAll()
		.where('user', '=', profile.id)

	if (attributes.length)
		query = query.where(
			'id',
			'not in',
			attributes.map(({ id }) => id),
		)

	const unassigned = await query.execute()
	return { unassigned }
}) satisfies PageServerLoad

export const actions: Actions = {
	category: async ({ request, params, locals }) => {
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
		if (!profile.ok) return fail(500, 'Failed to select profile')
		if (!profile.value?.username) return fail(404, 'Profile not found')
		if (!canEdit(profile.value, locals.user)) return fail(403, 'Forbidden')

		// Form
		const data = await request.formData()

		const name = getFormString(data, 'name')
		const slug = getFormString(data, 'slug')
		const summary = getFormString(data, 'summary')
		const description = getFormString(data, 'description')

		if (!name) return fail(400, { name: { value: name, missing: true } })
		if (!slug) return fail(400, { slug: { value: slug, missing: true } })

		if (slug !== encodeURIComponent(slug))
			return fail(422, { slug: { value: slug, invalid: true } })

		// Update
		const updated = await asyncResult(
			db
				.updateTable('categories')
				.set({ name, slug, summary, description, updated_at: new Date() })
				.where('user', '=', profile.value.id)
				.where('slug', '=', params.slug)
				.returning(['slug'])
				.executeTakeFirstOrThrow(),
			'updating category',
		)
		if (!updated.ok) {
			logger.error({ error: updated.error }, 'Failed to update category')
			return fail(500, { message: 'Failed to update category' })
		}

		// Success
		return redirect(
			303,
			resolve('/(app)/[username]/categories/[slug]', { slug, username: profile.value.username }),
		)
	},
	attributes: async ({ request, params, locals }) => {
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
		if (!presult.ok) return fail(500, 'Failed to select profile')
		const profile = presult.value

		if (!profile?.username) return fail(404, 'Profile not found')
		if (!canEdit(profile, locals.user)) return fail(403, 'Forbidden')

		const cresult = await asyncResult(
			db
				.selectFrom('categories')
				.select(['id'])
				.where('user', '=', profile.id)
				.where('slug', '=', params.slug)
				.executeTakeFirst(),
			'selecting category',
		)
		if (!cresult.ok) {
			logger.error({ profile, params, error: cresult.error }, 'Failed to select category')
			return fail(500, 'Failed to select category')
		}
		const category = cresult.value

		if (!category?.id) return fail(404, 'Category not found')

		// Form
		const data = await request.formData()
		const attributes = getFormStrings(data, 'attributes')

		const result = await asyncResult(
			db.transaction().execute(async db => {
				let dquery = db.deleteFrom('category_attributes').where('category', '=', category.id)
				if (attributes.length) dquery = dquery.where('attribute', 'not in', attributes)
				await dquery.execute()

				await db
					.insertInto('category_attributes')
					.values(attributes.map(attribute => ({ category: category.id, attribute })))
					.onConflict(oc => oc.columns(['category', 'attribute']).doNothing())
					.execute()
			}),
			'updating category attributes',
		)
		if (!result.ok) {
			logger.error({ error: result.error }, 'Failed to update category attributes')
			return fail(500, 'Failed to update category attributes')
		}

		return { success: true }
	},
}
