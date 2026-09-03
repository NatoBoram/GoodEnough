import { building } from '$app/environment'
import { logger } from '$lib/logger.js'
import { getTextDirection } from '$lib/paraglide/runtime.js'
import { paraglideMiddleware } from '$lib/paraglide/server.js'
import { auth } from '$lib/server/auth.js'
import { seedAdmin } from '$lib/server/db/admin.js'
import type { Handle, ServerInit } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import { svelteKitHandler } from 'better-auth/svelte-kit'

export const init: ServerInit = (async () => {
	logger.info('Initializing...')
	await seedAdmin()
}) satisfies ServerInit

const handleParaglide: Handle = (({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request

		return resolve(event, {
			transformPageChunk: ({ html }) =>
				html
					.replace('%paraglide.lang%', locale)
					.replace('%paraglide.dir%', getTextDirection(locale)),
		})
	})) satisfies Handle

const handleBetterAuth: Handle = (async ({ event, resolve }) => {
	const session = await auth.api.getSession({ headers: event.request.headers })

	if (session) {
		event.locals.session = session.session
		event.locals.user = session.user
	}

	return svelteKitHandler({ event, resolve, auth, building })
}) satisfies Handle

export const handle: Handle = sequence(handleParaglide, handleBetterAuth)
