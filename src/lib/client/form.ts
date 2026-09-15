import type { SubmitFunction } from '@sveltejs/kit'

export const submit: SubmitFunction = (() => {
	return ({ update }) => update({ reset: false })
}) satisfies SubmitFunction
