import type { LayoutServerLoad } from './$types.ts'

export const load: LayoutServerLoad = (({ locals }) => {
	return { user: locals.user }
}) satisfies LayoutServerLoad
