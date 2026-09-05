import { building } from '$app/environment'
import { logger } from '$lib/logger.js'
import { getTextDirection } from '$lib/paraglide/runtime.js'
import { paraglideMiddleware } from '$lib/paraglide/server.js'
import { syncResult } from '$lib/result.js'
import { auth } from '$lib/server/auth.js'
import { seedAdmin } from '$lib/server/db/admin.js'
import { db } from '$lib/server/db/db.js'
import type { Handle, ServerInit } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import type { BetterAuthOptions } from 'better-auth'

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

const handleSession: Handle = (async ({ event, resolve }) => {
	const session = await auth.api.getSession({ headers: event.request.headers })
	if (!session) {
		return resolve(event)
	}
	event.locals.session = session.session

	const user = await db
		.selectFrom('users')
		.selectAll()
		.where('id', '=', session.session.userId)
		.executeTakeFirst()
	if (!user) {
		logger.error(session, 'User not found')
		return resolve(event)
	}
	event.locals.user = user

	return resolve(event)
}) satisfies Handle

/**
 * A re-implementation of `svelteKitHandler` with a less buggy {@link isAuthPath}.
 */
const handleBetterAuth: Handle = (async ({ event, resolve }) => {
	if (building) return resolve(event)
	const { request, url } = event
	if (isAuthPath(url, auth.options)) return auth.handler(request)
	return resolve(event)
}) satisfies Handle

function isAuthPath(url: URL, options: BetterAuthOptions) {
	return url.pathname.startsWith(options.basePath || '/api/auth/')
}

const handleLogger: Handle = (async ({ event, resolve }) => {
	// Timing
	const start = performance.now()
	const response = await resolve(event)
	const end = performance.now()
	const duration = end - start

	// Request
	const ipResult = syncResult(() => event.getClientAddress(), 'getting client address')
	if (!ipResult.ok) logger.error({ error: ipResult.error })
	const ip = ipResult.ok ? ipResult.value : '-'

	const user = event.locals.user?.username || event.locals.user?.email || '-'
	const { method } = event.request
	const { pathname } = event.url
	const protocol = event.url.protocol.substring(0, event.url.protocol.length - 1)
	const referrer = event.request.referrer || '-'
	const userAgent = event.request.headers.get('User-Agent')

	// Response
	const { status } = response
	const bytes = response.headers.get('Content-Length')

	logger.info(
		{ ip, user, method, pathname, protocol, status, bytes, referrer, userAgent, duration },
		`${ip} - ${user} "${method} ${pathname} ${protocol}" ${status} ${bytes} "${referrer}" "${userAgent}" ${Math.round(duration)}ms`,
	)

	return response
}) satisfies Handle

export const handle: Handle = sequence(
	handleLogger,
	handleParaglide,
	handleSession,
	handleBetterAuth,
)
