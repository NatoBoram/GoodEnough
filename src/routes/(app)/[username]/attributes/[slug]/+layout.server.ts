import { logger } from '$lib/logger.js'
import { asyncResult } from '$lib/result.js'
import { db } from '$lib/server/db/db.js'
import { error } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types.ts'

export const load: LayoutServerLoad = (async ({ params }) => {
	const result = await asyncResult(
		db.selectFrom('attributes').selectAll().where('slug', '=', params.slug).executeTakeFirst(),
		'loading attribute',
	)

	if (!result.ok) {
		logger.error({ error: result.error, attribute: params.slug }, 'Failed to load attribute')
		return error(500, 'Failed to load attribute')
	}

	const attribute = result.value
	if (!attribute) return error(404, 'Attribute not found')

	return { attribute }
}) satisfies LayoutServerLoad
