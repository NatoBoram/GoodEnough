import { resolve } from '$app/paths'
import { canEdit } from '$lib/auth/authorization.js'
import { asyncResult } from '$lib/result.js'
import { db } from '$lib/server/db/db.js'
import type { CategoryItem } from '$lib/server/db/kysely-codegen.js'
import { getItemAttributeValues } from '$lib/server/db/queries.js'
import {
	getFormBoolean,
	getFormDate,
	getFormNumber,
	getFormString,
	getFormStrings,
} from '$lib/server/forms.js'
import { logger } from '$lib/server/logger.js'
import { error, fail, redirect } from '@sveltejs/kit'
import type { Selectable } from 'kysely'
import type { Actions, PageServerLoad } from './$types.ts'

export const load: PageServerLoad = (async ({ parent, locals }) => {
	if (!locals.user?.id) return error(401, 'Unauthorized')
	const { profile, item } = await parent()
	if (!canEdit(profile, locals.user)) return error(403, 'Forbidden')

	const categories = await db
		.selectFrom('categories')
		.selectAll()
		.where('user', '=', profile.id)
		.orderBy('name', 'asc')
		.execute()

	if (!categories.length)
		return { categories, assigned: new Array<Pick<Selectable<CategoryItem>, 'category'>>() }

	const assigned = await db
		.selectFrom('category_items')
		.select(['category_items.category'])
		.where('item', '=', item.id)
		.where(
			'category_items.category',
			'in',
			categories.map(({ id }) => id),
		)
		.execute()

	return { categories, assigned }
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
	categories: async ({ locals, params, request }) => {
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

		// Item
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

		// Form
		const data = await request.formData()
		const categories = getFormStrings(data, 'categories')

		const result = await asyncResult(
			db.transaction().execute(async db => {
				let dquery = db.deleteFrom('category_items').where('item', '=', item.id)
				if (categories.length) dquery = dquery.where('category', 'not in', categories)
				await dquery.execute()

				if (categories.length)
					await db
						.insertInto('category_items')
						.values(categories.map(category => ({ category, item: item.id })))
						.onConflict(oc => oc.columns(['category', 'item']).doNothing())
						.execute()
			}),
			'updating item categories',
		)
		if (!result.ok) {
			logger.error({ error: result.error }, 'Failed to update item categories')
			return fail(500, { message: 'Failed to update item categories' })
		}

		return { success: true }
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

		// Item
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

		// You can't give attribute values to an item that's not in a category with those attributes.
		if (!attributes.length) return fail(422, { message: 'No attributes found' })

		// Form
		const data = await request.formData()

		const result = await asyncResult(
			db
				.insertInto('attribute_values')
				.values(
					attributes.map(({ id, type }) => {
						const name = `attribute-${id}`

						return {
							attribute: id,
							item: item.id,
							...(type === 'text' ? { value_text: getFormString(data, name) } : {}),
							...(type === 'number' ? { value_number: getFormNumber(data, name) } : {}),
							...(type === 'boolean' ? { value_boolean: getFormBoolean(data, name) } : {}),
							...(type === 'date' ? { value_date: getFormDate(data, name) } : {}),
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
