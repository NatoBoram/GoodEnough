import { getFormString } from '$lib/forms.js'
import { asyncResult } from '$lib/result.js'
import { auth } from '$lib/server/auth.js'
import { fail, redirect } from '@sveltejs/kit'
import { APIError } from 'better-auth'
import type { Actions, PageServerLoad } from './$types.ts'

export const load: PageServerLoad = (event => {
	if (event.locals.user) return redirect(302, '/')
	return {}
}) satisfies PageServerLoad

export const actions: Actions = {
	signup: async event => {
		const formData = await event.request.formData()
		const email = getFormString(formData, 'email')
		const password = getFormString(formData, 'password')
		const name = getFormString(formData, 'name')
		const username = getFormString(formData, 'username')

		const signUpEmail = await asyncResult(
			auth.api.signUpEmail({
				// @ts-expect-error Object literal may only specify known properties and `username` does not
				// exist
				body: { email, password, name, username, callbackURL: '/auth/verification-success' },
				headers: event.request.headers,
			}),
			'signing up',
			APIError,
		)
		if (!signUpEmail.ok) {
			const { error } = signUpEmail
			if (error instanceof APIError)
				return fail(400, { message: error.message || 'Registration failed' })
			return fail(500, { message: 'Unexpected error' })
		}

		return redirect(302, '/')
	},
}
