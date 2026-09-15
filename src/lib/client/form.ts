import type { SubmitFunction } from '@sveltejs/kit'

export const create: SubmitFunction = (() =>
	({ update, result }) =>
		update({ reset: result.type === 'success' })) satisfies SubmitFunction

export const edit: SubmitFunction = (() =>
	({ update }) =>
		update({ reset: false })) satisfies SubmitFunction
