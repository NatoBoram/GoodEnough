import { parseMarkdown } from '$lib/markdown.js'
import type { PageLoad } from './$types.ts'

export const load: PageLoad = (async ({ parent }) => {
	const { category } = await parent()
	const description = await parseMarkdown(category.description)
	return { description }
}) satisfies PageLoad
