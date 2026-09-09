import { resolve } from '$app/paths'
import { isAttributeType } from '$lib/forms.js'
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
		const type = getFormString(data, 'type')

		if (!name) return fail(400, { message: 'Name is required' })
		if (!slug) return fail(400, { message: 'Slug is required' })
		if (!type) return fail(400, { message: 'Type is required' })

		if (slug !== encodeURIComponent(slug)) return fail(400, { message: 'Invalid slug' })
		if (!isAttributeType(type)) return fail(400, { message: 'Invalid type' })

		const result = await asyncResult(
			db
				.insertInto('attributes')
				.values({
					name,
					slug,
					summary,
					type,
					user: locals.user.id,
				})
				.returning(['slug'])
				.executeTakeFirstOrThrow(),
			'inserting attribute',
		)
		if (!result.ok) {
			logger.error({ error: result.error }, 'Error inserting attribute')
			return fail(500, { message: 'An unexpected error happened while creating the attribute.' })
		}

		return redirect(
			303,
			resolve('/(app)/[username]/attributes/[slug]', { slug, username: locals.user.username }),
		)
	},
}
