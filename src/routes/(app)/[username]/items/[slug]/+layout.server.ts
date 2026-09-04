import { logger } from '$lib/logger.js'
import { asyncResult } from '$lib/result.js'
import { db } from '$lib/server/db/db.js'
import { error } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types.ts'

export const load: LayoutServerLoad = (async ({ params }) => {
	const result = await asyncResult(
		db.selectFrom('items').selectAll().where('slug', '=', params.slug).executeTakeFirst(),
		'loading item',
	)

	if (!result.ok) {
		logger.error({ error: result.error, item: params.slug }, 'Failed to load item')
		return error(500, 'Failed to load item')
	}

	const item = result.value
	if (!item) return error(404, 'Item not found')

	return { item }
}) satisfies LayoutServerLoad
