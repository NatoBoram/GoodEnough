import { clamp } from '$lib/maths.js'
import type { DB } from '$lib/server/db/kysely-codegen.js'
import type { SelectQueryBuilder } from 'kysely'

export function setLimit<TB extends keyof DB, O>(
	query: SelectQueryBuilder<DB, TB, O>,
	url: URL,
): SelectQueryBuilder<DB, TB, O> {
	const limit = getLimit(url)
	return query.limit(limit)
}

export function getLimit(url: URL): number {
	return clamp(Number(url.searchParams.get('limit')) || 10, 1, 100)
}
