import { resolve } from '$app/paths'
import { asyncResult } from '$lib/result.js'
import { db } from '$lib/server/db/db.js'
import { getFormString } from '$lib/server/forms.js'
import { logger } from '$lib/server/logger.js'
import { error, fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types.ts'

export const load: PageServerLoad = (({ locals, params }) => {
	if (locals.user?.username !== params.username) return error(403)
	return
}) satisfies PageServerLoad

export const actions: Actions = {
	default: async ({ request, locals }) => {
		if (!locals.user?.username) return fail(403, { message: 'Forbidden' })

		const data = await request.formData()
		const name = getFormString(data, 'name')
		const slug = getFormString(data, 'slug')
		const summary = getFormString(data, 'summary')

		if (!name) return fail(400, { message: 'Name is required' })
		if (!slug) return fail(400, { message: 'Slug is required' })

		if (slug !== encodeURIComponent(slug)) return fail(400, { message: 'Invalid slug' })

		const result = await asyncResult(
			db
				.insertInto('categories')
				.values({
					summary,
					name,
					slug,
					user: locals.user.id,
				})
				.returning(['slug'])
				.executeTakeFirstOrThrow(),
			'inserting category',
		)
		if (!result.ok) {
			logger.error({ error: result.error }, 'Error inserting category')
			return fail(500, { message: 'An unexpected error happened while creating the category.' })
		}

		return redirect(
			303,
			resolve('/(app)/[username]/categories/[slug]', { slug, username: locals.user.username }),
		)
	},
}
