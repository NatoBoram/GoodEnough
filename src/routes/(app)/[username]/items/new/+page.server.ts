import { resolve } from '$app/paths'
import { canEdit } from '$lib/auth/authorization.js'
import { asyncResult } from '$lib/result.js'
import { db } from '$lib/server/db/db.js'
import { getFormString } from '$lib/server/forms.js'
import { logger } from '$lib/server/logger.js'
import { error, fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types.ts'

export const load: PageServerLoad = (async ({ locals, parent }) => {
	if (!locals.user?.id) return error(401, 'Unauthorized')

	const { profile } = await parent()
	if (!canEdit(profile, locals.user)) return error(403, 'Forbidden')
}) satisfies PageServerLoad

export const actions: Actions = {
	default: async ({ request, locals, params }) => {
		// Authentication
		if (!locals.user?.id) return error(401, 'Unauthorized')

		// Authorization
		const profile = await asyncResult(
			db
				.selectFrom('users')
				.where('username', '=', params.username)
				.select(['id', 'username'])
				.executeTakeFirst(),
			'selecting profile',
		)
		if (!profile.ok) return error(500, 'Failed to select profile')
		if (!profile.value?.username) return error(404, 'Profile not found')
		if (!canEdit(profile.value, locals.user)) return error(403, 'Forbidden')

		// Form
		const data = await request.formData()
		const name = getFormString(data, 'name')
		const slug = getFormString(data, 'slug')
		const summary = getFormString(data, 'summary')

		if (!name) return fail(400, { message: 'Name is required' })
		if (!slug) return fail(400, { message: 'Slug is required' })

		if (slug !== encodeURIComponent(slug)) return fail(400, { message: 'Invalid slug' })

		const result = await asyncResult(
			db
				.insertInto('items')
				.values({
					summary,
					name,
					slug,
					user: profile.value.id,
				})
				.returning(['slug'])
				.executeTakeFirstOrThrow(),
			'inserting item',
		)
		if (!result.ok) {
			logger.error({ error: result.error }, 'Error inserting item')
			return fail(500, { message: 'An unexpected error happened while creating the item.' })
		}

		return redirect(
			303,
			resolve('/(app)/[username]/items/[slug]', { slug, username: profile.value.username }),
		)
	},
}
