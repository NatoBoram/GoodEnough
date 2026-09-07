import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types.ts'

export const load: PageServerLoad = (({ params, locals }) => {
	if (params.username !== locals.user?.username) return error(403, 'Forbidden')
	return {}
}) satisfies PageServerLoad
