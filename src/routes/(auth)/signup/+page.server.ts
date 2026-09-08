import { asyncResult } from '$lib/result.js'
import { auth } from '$lib/server/auth.js'
import { getFormString } from '$lib/server/forms.js'
import { fail, redirect } from '@sveltejs/kit'
import { APIError } from 'better-auth'
import type { Actions, PageServerLoad } from './$types.ts'

export const load: PageServerLoad = (({ locals }) => {
	if (locals.user) return redirect(302, '/')
	return {}
}) satisfies PageServerLoad

export const actions: Actions = {
	signup: async ({ request }) => {
		const data = await request.formData()

		const email = getFormString(data, 'email')
		const password = getFormString(data, 'password')
		const name = getFormString(data, 'name')
		const username = getFormString(data, 'username')

		if (!email) return fail(400, { message: 'Email is required' })
		if (!password) return fail(400, { message: 'Password is required' })
		if (!name) return fail(400, { message: 'Name is required' })
		if (!username) return fail(400, { message: 'Username is required' })

		const signUpEmail = await asyncResult(
			auth.api.signUpEmail({
				// @ts-expect-error Object literal may only specify known properties and `username` does not
				// exist
				body: { email, password, name, username, callbackURL: '/auth/verification-success' },
				headers: request.headers,
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
