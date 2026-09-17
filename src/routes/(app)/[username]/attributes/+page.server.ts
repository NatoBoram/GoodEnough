import { setCursor, setSort } from '$lib/cursor/cursor.js'
import { clamp } from '$lib/maths.js'
import { db } from '$lib/server/db/db.js'
import type { PageServerLoad } from './$types.ts'

export const load: PageServerLoad = (async ({ parent, url }) => {
	const { profile } = await parent()

	const limit = clamp(Number(url.searchParams.get('limit')) || 10, 0, 100)

	let query = db.selectFrom('attributes').limit(limit).selectAll().where('user', '=', profile.id)
	query = setSort(query, url)
	query = setCursor(query, url)

	const attributes = await query.execute()
	return { attributes }
}) satisfies PageServerLoad
