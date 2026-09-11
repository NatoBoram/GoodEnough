import { db } from '$lib/server/db/db.js'
import type { PageServerLoad } from './$types.ts'

export const load: PageServerLoad = (async ({ parent }) => {
	const { profile, category } = await parent()

	const query = db
		.selectFrom('category_items')
		.innerJoin('items', 'items.id', 'category_items.item')
		.selectAll('items')
		.where('items.user', '=', profile.id)
		.where('category_items.category', '=', category.id)

	// query = setCursor(query, url)
	// query = setLimit(query, url)
	// query = setSort(query, url)

	const items = await query.execute()
	return { items }
}) satisfies PageServerLoad
