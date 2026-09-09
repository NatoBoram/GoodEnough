import { clamp } from '$lib/maths.js'
import { db } from '$lib/server/db/db.js'
import type { DB, Item } from '$lib/server/db/kysely-codegen.js'
import { isUuid } from '$lib/uuid.js'
import type { ComparisonOperator, OrderByDirection, SelectQueryBuilder } from 'kysely'
import { sql } from 'kysely'
import type { PageServerLoad } from './$types.ts'

export const load: PageServerLoad = (async ({ parent, url }) => {
	const { profile } = await parent()

	const limit = clamp(Number(url.searchParams.get('limit')) || 10, 0, 100)

	const query = db.selectFrom('items').limit(limit).selectAll().where('user', '=', profile.id)
	const withSort = setSort(query, url)
	const withCursor = setCursor(withSort, url)

	const items = await withCursor.execute()
	return { items }
}) satisfies PageServerLoad

function setSort<T>(query: SelectQueryBuilder<DB, 'items', T>, url: URL) {
	const column = SortableColumns[toSortable(url.searchParams.get('sort'))]
	const direction = toOrderByDirection(url.searchParams.get('direction'))
	return query.orderBy(column, direction)
}

function setCursor<T, TB extends keyof DB>(query: SelectQueryBuilder<DB, TB, T>, url: URL) {
	const id = url.searchParams.get('id')
	if (!isUuid(id)) return query

	const column = SortableColumns[toSortable(url.searchParams.get('sort'))]
	const cursor = toCursor(url.searchParams.get('cursor'), column)
	if (!cursor) return query

	const direction = toOrderByDirection(url.searchParams.get('direction'))
	const operator = directionOperators[direction]

	return query.where(sql`(${sql.ref(column)}, id)`, operator, sql`(${cursor}, ${id})`)
}

function toCursor(value: unknown, column: SortableColumns): string | null {
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

const Sortable = { id: 'id', name: 'name', created: 'created', updated: 'updated' } as const
type Sortable = (typeof Sortable)[keyof typeof Sortable]
function isSortable(value: unknown): value is Sortable {
	return Object.values<unknown>(Sortable).includes(value)
}
function toSortable(value: unknown): Sortable {
	return isSortable(value) ? value : Sortable.id
}

const SortableColumns = {
	[Sortable.id]: 'id',
	[Sortable.name]: 'name',
	[Sortable.created]: 'created_at',
	[Sortable.updated]: 'updated_at',
} as const satisfies Record<Sortable, keyof Item>
type SortableColumns = (typeof SortableColumns)[keyof typeof SortableColumns]

const OrderByDirection = { asc: 'asc', desc: 'desc' } as const

const directionOperators = {
	[OrderByDirection.asc]: '>',
	[OrderByDirection.desc]: '<',
} as const satisfies Record<OrderByDirection, ComparisonOperator>

function isOrderByDirection(value: unknown): value is OrderByDirection {
	return Object.values<unknown>(OrderByDirection).includes(value)
}

function toOrderByDirection(value: unknown): OrderByDirection {
	return isOrderByDirection(value) ? value : OrderByDirection.desc
}
