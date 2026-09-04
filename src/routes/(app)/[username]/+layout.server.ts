import { logger } from '$lib/logger.js'
import { asyncResult } from '$lib/result.js'
import { db } from '$lib/server/db/db.js'
import { error } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types.ts'

export const load: LayoutServerLoad = (async ({ params }) => {
	const result = await asyncResult(
		db.selectFrom('users').selectAll().where('username', '=', params.username).executeTakeFirst(),
		'selecting user',
	)

	if (!result.ok) {
		logger.error({ error: result.error, profile: params.username }, 'Failed to load user profile')
		return error(500, 'Failed to load user profile')
	}

	const profile = result.value
	if (!profile) return error(404, 'User not found')

	return { profile }
}) satisfies LayoutServerLoad
