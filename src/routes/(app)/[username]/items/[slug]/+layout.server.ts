import { asyncResult } from '$lib/result.js'
import { db } from '$lib/server/db/db.js'
import { getItemAttributeValues } from '$lib/server/db/queries.js'
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

	const aresult = await asyncResult(getItemAttributeValues(item, profile), 'loading attributes')
	if (!aresult.ok) {
		logger.error({ error: aresult.error, item }, 'Failed to load attributes')
		return error(500, 'Failed to load attributes')
	}
	const attributes = aresult.value

	return { item, attributes }
}) satisfies LayoutServerLoad
