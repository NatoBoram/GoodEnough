import { getCursor } from '$lib/cursor/cursor.js'
import { getLimit, setLimit } from '$lib/cursor/limit.js'
import type { Page } from '$lib/cursor/page.js'
import { getSort, setSort } from '$lib/cursor/sort.js'
import { db } from '$lib/server/db/db.js'
import type { Attribute } from '$lib/server/db/schema.js'
import type { Selectable } from 'kysely'
import type { PageServerLoad } from './$types.ts'

export const load: PageServerLoad = (async ({ parent, url }) => {
	const { profile } = await parent()

	let query = db.selectFrom('attributes').selectAll().where('user', '=', profile.id)
	query = setSort(query, url)
	query = setLimit(query, url)

	const cursor = getCursor(url)
	const limit = getLimit(url)
	const sort = getSort(url)

	const attributes = query.execute()
	const page = attributes.then<Page<Selectable<Attribute>>>(attributes => ({
		...cursor,
		limit,
		...sort,
		data: attributes,
	}))

	return { page }
}) satisfies PageServerLoad
