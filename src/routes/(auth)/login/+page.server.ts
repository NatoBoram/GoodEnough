import { getFormString } from '$lib/forms.js'
import { asyncResult } from '$lib/result.js'
import { auth } from '$lib/server/auth.js'
import { fail, redirect } from '@sveltejs/kit'
import { APIError } from 'better-auth/api'
import type { Actions, PageServerLoad } from './$types.ts'

export const load: PageServerLoad = (({ locals }) => {
	if (locals.user) return redirect(302, '/')
	return {}
}) satisfies PageServerLoad

export const actions: Actions = {
	login: async event => {
		const formData = await event.request.formData()
		const email = getFormString(formData, 'email')
		const password = getFormString(formData, 'password')

		const signInEmail = await asyncResult(
			auth.api.signInEmail({
				body: { email, password, callbackURL: '/auth/verification-success' },
				headers: event.request.headers,
			}),
			'signing in',
			APIError,
		)
		if (!signInEmail.ok) {
			const { error } = signInEmail
			if (error instanceof APIError) return fail(400, { message: error.message || 'Signin failed' })
			return fail(500, { message: 'Unexpected error' })
		}

		return redirect(302, '/')
	},
}
