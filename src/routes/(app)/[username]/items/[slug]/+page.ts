import { parseMarkdown } from '$lib/markdown.js'
import { db } from '$lib/server/db/db.js'
import type { PageLoad } from './$types.ts'

export const load: PageLoad = (async ({ parent }) => {
	const { item, profile } = await parent()

	const [description, review] = await Promise.all([
		parseMarkdown(item.description),
		db
			.selectFrom('reviews')
			.selectAll()
			.where('item', '=', item.id)
			.where('user', '=', profile.id)
			.executeTakeFirst(),
	])

	return { description, review }
}) satisfies PageLoad
