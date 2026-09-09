import { parseMarkdown } from '$lib/markdown.js'
import type { PageLoad } from './$types.ts'

export const load: PageLoad = (async ({ parent }) => {
	const { item } = await parent()
	const description = await parseMarkdown(item.description)
	return { description }
}) satisfies PageLoad
