import { setLimit } from '$lib/cursor/limit.js'
import { setSort } from '$lib/cursor/sort.js'
import { db } from '$lib/server/db/db.js'
import type { PageServerLoad } from './$types.ts'

export const load: PageServerLoad = (async ({ url, parent }) => {
	const { profile } = await parent()

	let query = db.selectFrom('categories').selectAll().where('user', '=', profile.id)
	query = setSort(query, url)
	query = setLimit(query, url)

	const categories = await query.execute()
	return { categories }
}) satisfies PageServerLoad
