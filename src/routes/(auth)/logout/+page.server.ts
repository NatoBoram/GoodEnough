import { logger } from '$lib/logger.js'
import { asyncResult } from '$lib/result.js'
import { auth } from '$lib/server/auth.js'
import { fail, redirect } from '@sveltejs/kit'
import { APIError } from 'better-auth'
import type { Actions, PageServerLoad } from './$types.ts'

export const load: PageServerLoad = (async event => {
	await auth.api.signOut({ headers: event.request.headers })
	return redirect(302, '/')
}) satisfies PageServerLoad

export const actions: Actions = {
	logout: async event => {
		const result = await asyncResult(
			auth.api.signOut({ headers: event.request.headers }),
			'signing out',
			APIError,
		)
		if (!result.ok) {
			const { error } = result
			logger.error({ error }, 'Failed to log out')
			return fail(500, { message: 'Failed to log out' })
		}

		return redirect(302, '/')
	},
}
