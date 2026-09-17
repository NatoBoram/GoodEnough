import { setCursor, setSort } from '$lib/cursor/cursor.js'
import { clamp } from '$lib/maths.js'
import { db } from '$lib/server/db/db.js'
import type { PageServerLoad } from './$types.ts'

export const load: PageServerLoad = (async ({ url, parent }) => {
	const { profile } = await parent()

	const limit = clamp(Number(url.searchParams.get('limit')) || 10, 0, 100)

	let query = db.selectFrom('categories').limit(limit).selectAll().where('user', '=', profile.id)
	query = setSort(query, url)
	query = setCursor(query, url)

	const categories = await query.execute()
	return { categories }
}) satisfies PageServerLoad
