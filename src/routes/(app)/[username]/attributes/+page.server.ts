import { setLimit } from '$lib/cursor/limit.js'
import { setSort } from '$lib/cursor/sort.js'
import { db } from '$lib/server/db/db.js'
import type { PageServerLoad } from './$types.ts'

export const load: PageServerLoad = (async ({ parent, url }) => {
	const { profile } = await parent()

	let query = db.selectFrom('attributes').selectAll().where('user', '=', profile.id)
	query = setSort(query, url)
	query = setLimit(query, url)

	const attributes = await query.execute()
	return { attributes }
}) satisfies PageServerLoad
