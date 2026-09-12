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
	default: async ({ request, params, locals }) => {
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
		// const type = getFormString(data, 'type') // Note: Should we really allow modifying an attribute's type?

		if (!name) return fail(400, { message: 'Name is required' })
		if (!slug) return fail(400, { message: 'Slug is required' })
		// if (!type) return fail(400, { message: 'Type is required' })

		if (slug !== encodeURIComponent(slug)) return fail(400, { message: 'Invalid slug' })
		// if (!isAttributeType(type)) return fail(400, { message: 'Invalid type' })

		// Update
		const updated = await asyncResult(
			db
				.updateTable('attributes')
				.set({ name, slug, summary, updated_at: new Date() })
				.where('user', '=', profile.value.id)
				.where('slug', '=', params.slug)
				.returning(['slug'])
				.executeTakeFirstOrThrow(),
			'updating attribute',
		)
		if (!updated.ok) {
			logger.error({ error: updated.error }, 'Failed to update attribute')
			return fail(500, { message: 'Failed to update attribute' })
		}

		return redirect(
			303,
			resolve('/(app)/[username]/attributes/[slug]', { slug, username: profile.value.username }),
		)
	},
}
