import { asyncResult } from '$lib/result.js'
import { db } from '$lib/server/db/db.js'
import { logger } from '$lib/server/logger.js'
import { error } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types.ts'

export const load: LayoutServerLoad = (async ({ params, parent }) => {
	const { profile } = await parent()

	const cresult = await asyncResult(
		db
			.selectFrom('categories')
			.selectAll()
			.where('slug', '=', params.slug)
			.where('user', '=', profile.id)
			.executeTakeFirst(),
		'loading category',
	)

	if (!cresult.ok) {
		logger.error({ error: cresult.error, category: params.slug }, 'Failed to load category')
		return error(500, 'Failed to load category')
	}

	const category = cresult.value
	if (!category) return error(404, 'Category not found')

	const aresult = await asyncResult(
		db
			.selectFrom('category_attributes')
			.innerJoin('attributes', 'attributes.id', 'category_attributes.attribute')
			.selectAll('attributes')
			.where('category', '=', category.id)
			.execute(),
		'loading attributes',
	)

	if (!aresult.ok) {
		logger.error({ error: aresult.error, category }, 'Failed to load attributes')
		return error(500, 'Failed to load attributes')
	}

	const attributes = aresult.value

	return { category, attributes }
}) satisfies LayoutServerLoad
