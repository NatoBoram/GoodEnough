import type { DB } from '$lib/server/db/schema.js'
import { isUuid } from '$lib/uuid.js'
import type { SelectQueryBuilder } from 'kysely'
import { sql } from 'kysely'
import type { SortableSelection } from './sort.ts'
import { directionOperators, SortableColumns, toOrderByDirection, toSortable } from './sort.ts'

/** The cursor is the ID of the element serving as the cursor plus the value of the column that is
 * being sorted by. */
interface Cursor {
	readonly cursor: string
	readonly id: string
}

export function setCursor<TB extends keyof DB, O>(
	query: SelectQueryBuilder<DB, TB, O>,
	url: URL,
): SelectQueryBuilder<DB, TB, O> {
	const id = url.searchParams.get('id')
	if (!isUuid(id)) return query

	const column = SortableColumns[toSortable(url.searchParams.get('sort'))]
	const cursor = toCursor(url.searchParams.get('cursor'), column)
	if (!cursor) return query

	const direction = toOrderByDirection(url.searchParams.get('direction'))
	const operator = directionOperators[direction]

	return query.where(sql`(${sql.ref(column)}, id)`, operator, sql`(${cursor}, ${id})`)
}

export function getCursor(url: URL): Cursor | undefined {
	const id = url.searchParams.get('id')
	if (!isUuid(id)) return

	const column = SortableColumns[toSortable(url.searchParams.get('sort'))]
	const cursor = toCursor(url.searchParams.get('cursor'), column)
	if (!cursor) return

	return { cursor, id }
}

export function toCursor(value: unknown, column: SortableColumns): string | null {
	if (!value) return null
	switch (column) {
		case 'created_at':
		case 'updated_at': {
			if (typeof value !== 'string') return null
			const date = new Date(value)
			if (isNaN(date.getTime())) return null
			return date.toISOString()
		}

		case 'id':
			if (isUuid(value)) return value
			return null

		case 'name':
			if (typeof value === 'string') return value
			return null
	}
}

export function nextCursor(row: SortableSelection, column: SortableColumns): string {
	switch (column) {
		case 'created_at':
		case 'updated_at': {
			return new Date(row[column]).toISOString()
		}

		case 'id':
			return row.id

		case 'name':
			return row.name
	}
}
