import { resolve } from '$app/paths'
import { asyncResult } from '$lib/result.js'
import { db } from '$lib/server/db/db.js'
import { getFormString } from '$lib/server/forms.js'
import { logger } from '$lib/server/logger.js'
import { error, fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types.ts'

export const load: PageServerLoad = (({ params, locals }) => {
	if (params.username !== locals.user?.username) return error(403, 'Forbidden')
	return {}
}) satisfies PageServerLoad

export const actions: Actions = {
	default: async ({ request, params, locals }) => {
		if (params.username !== locals.user?.username) return error(403, 'Forbidden')

		// Form
		const data = await request.formData()

		const name = getFormString(data, 'name')
		const slug = getFormString(data, 'slug')
		const summary = getFormString(data, 'summary')
		const description = getFormString(data, 'description')

		if (!name) return fail(400, { message: 'Name is required' })
		if (!slug) return fail(400, { message: 'Slug is required' })

		if (slug !== encodeURIComponent(slug)) return fail(400, { message: 'Invalid slug' })

		// Update
		const updated = await asyncResult(
			db
				.updateTable('categories')
				.set({ name, slug, summary, description, updated_at: new Date() })
				.where('user', '=', locals.user.id)
				.where('slug', '=', params.slug)
				.returning(['slug'])
				.executeTakeFirstOrThrow(),
			'updating category',
		)
		if (!updated.ok) {
			logger.error({ error: updated.error }, 'Failed to update category')
			return fail(500, { message: 'Failed to update category' })
		}

		return redirect(
			303,
			resolve('/(app)/[username]/categories/[slug]', { slug, username: locals.user.username }),
		)
	},
}
