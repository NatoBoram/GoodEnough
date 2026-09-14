import { asyncResult } from '$lib/result.js'
import { db } from '$lib/server/db/db.js'
import { logger } from '$lib/server/logger.js'
import { error } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types.ts'

export const load: LayoutServerLoad = (async ({ params, parent }) => {
	const { profile } = await parent()

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
		logger.error({ error: iresult.error, item: params.slug }, 'Failed to load item')
		return error(500, 'Failed to load item')
	}

	const item = iresult.value
	if (!item) return error(404, 'item not found')

	const aresult = await asyncResult(
		db
			.selectFrom('category_items')
			.where('category_items.item', '=', item.id)
			.innerJoin('categories', join =>
				join
					.onRef('categories.id', '=', 'category_items.category')
					.on('categories.user', '=', profile.id),
			)
			.innerJoin('category_attributes', 'category_attributes.category', 'categories.id')
			.innerJoin('attributes', join =>
				join
					.onRef('attributes.id', '=', 'category_attributes.attribute')
					.on('attributes.user', '=', profile.id),
			)
			.leftJoin('attribute_values', join =>
				join
					.onRef('attribute_values.attribute', '=', 'attributes.id')
					.on('attribute_values.item', '=', item.id),
			)
			.select([
				'attributes.id',
				'attributes.name',
				'attributes.slug',
				'attributes.summary',
				'attributes.type',
				'attribute_values.value_text',
				'attribute_values.value_number',
				'attribute_values.value_boolean',
				'attribute_values.value_date',
			])
			.orderBy('attributes.id', 'asc')
			.distinctOn('attributes.id')
			.execute(),
		'loading attributes',
	)
	if (!aresult.ok) {
		logger.error({ error: aresult.error, item }, 'Failed to load attributes')
		return error(500, 'Failed to load attributes')
	}
	const attributes = aresult.value

	return { item, attributes }
}) satisfies LayoutServerLoad
