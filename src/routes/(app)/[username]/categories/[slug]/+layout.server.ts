import { asyncResult } from '$lib/result.js'
import { db } from '$lib/server/db/db.js'
import { logger } from '$lib/server/logger.js'
import { error } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types.ts'

export const load: LayoutServerLoad = (async ({ params, parent }) => {
	const { profile } = await parent()

	const result = await asyncResult(
		db
			.selectFrom('categories')
			.selectAll()
			.where('slug', '=', params.slug)
			.where('user', '=', profile.id)
			.executeTakeFirst(),
		'loading category',
	)

	if (!result.ok) {
		logger.error({ error: result.error, category: params.slug }, 'Failed to load category')
		return error(500, 'Failed to load category')
	}

	const category = result.value
	if (!category) return error(404, 'Category not found')

	return { category }
}) satisfies LayoutServerLoad
