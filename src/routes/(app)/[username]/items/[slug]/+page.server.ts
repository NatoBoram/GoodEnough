import { db } from '$lib/server/db/db.js'
import type { PageServerLoad } from './$types.ts'

export const load: PageServerLoad = (async ({ parent }) => {
	const { item, profile } = await parent()

	const reviews = db
		.selectFrom('reviews')
		.selectAll()
		.where('item', '=', item.id)
		.where('user', '=', profile.id)
		.executeTakeFirst()

	return { reviews }
}) satisfies PageServerLoad
