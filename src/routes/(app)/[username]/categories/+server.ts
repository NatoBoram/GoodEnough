import { getCursor, setCursor } from '$lib/cursor/cursor.js'
import { getLimit, setLimit } from '$lib/cursor/limit.js'
import type { Page } from '$lib/cursor/page.js'
import { getSort, setSort } from '$lib/cursor/sort.js'
import { db } from '$lib/server/db/db.js'
import type { Category } from '$lib/server/db/kysely-codegen.js'
import { json } from '@sveltejs/kit'
import type { Selectable } from 'kysely'
import type { RequestHandler } from './$types.ts'

export const GET: RequestHandler = (async ({ params, url }) => {
	const page: Page<Selectable<Category>> = {
		...getCursor(url),
		limit: getLimit(url),
		...getSort(url),
		data: [],
	}

	const profile = await db
		.selectFrom('users')
		.select(['id'])
		.where('username', '=', params.username)
		.executeTakeFirst()
	if (!profile) return json(page, { status: 404, statusText: 'Profile not found' })

	let query = db.selectFrom('categories').selectAll().where('user', '=', profile.id)
	query = setSort(query, url)
	query = setCursor(query, url)
	query = setLimit(query, url)

	const categories = await query.execute()
	page.data.push(...categories)

	return json(page)
}) satisfies RequestHandler
