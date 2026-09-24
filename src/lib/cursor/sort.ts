import type { DB, Item } from '$lib/server/db/schema.js'
import type { ComparisonOperator, SelectQueryBuilder } from 'kysely'

export interface SortableSelection {
	readonly created_at: Date
	readonly id: string
	readonly name: string
	readonly updated_at: Date
}

interface Sort {
	readonly column: SortableColumns
	readonly direction: OrderByDirection
}

export function getSort(url: URL): Sort {
	const column = SortableColumns[toSortable(url.searchParams.get('sort'))]
	const direction = toOrderByDirection(url.searchParams.get('direction'))
	return { column, direction }
}

export function getSortable(url: URL): Sortable {
	return toSortable(url.searchParams.get('sort'))
}

export function setSort<TB extends keyof DB, O extends SortableSelection>(
	query: SelectQueryBuilder<DB, TB, O>,
	url: URL,
): SelectQueryBuilder<DB, TB, O> {
	const { column, direction } = getSort(url)
	return query.orderBy(column, direction)
}

export const Sortable = { id: 'id', name: 'name', created: 'created', updated: 'updated' } as const

export type Sortable = (typeof Sortable)[keyof typeof Sortable]

function isSortable(value: unknown): value is Sortable {
	return Object.values<unknown>(Sortable).includes(value)
}

export function toSortable(value: unknown): Sortable {
	return isSortable(value) ? value : Sortable.id
}

export const SortableColumns: {
	readonly id: 'id'
	readonly name: 'name'
	readonly created: 'created_at'
	readonly updated: 'updated_at'
} = {
	[Sortable.id]: 'id',
	[Sortable.name]: 'name',
	[Sortable.created]: 'created_at',
	[Sortable.updated]: 'updated_at',
} as const satisfies Record<Sortable, keyof Item>

export type SortableColumns = (typeof SortableColumns)[keyof typeof SortableColumns]

export const OrderByDirection = { asc: 'asc', desc: 'desc' } as const

export type OrderByDirection = (typeof OrderByDirection)[keyof typeof OrderByDirection]

export const directionOperators: {
	readonly asc: '>'
	readonly desc: '<'
} = {
	[OrderByDirection.asc]: '>',
	[OrderByDirection.desc]: '<',
} as const satisfies Record<OrderByDirection, ComparisonOperator>

function isOrderByDirection(value: unknown): value is OrderByDirection {
	return Object.values<unknown>(OrderByDirection).includes(value)
}

export function toOrderByDirection(value: unknown): OrderByDirection {
	return isOrderByDirection(value) ? value : OrderByDirection.desc
}

export function getDirection(url: URL): OrderByDirection {
	return toOrderByDirection(url.searchParams.get('direction'))
}

export const oppositeDirection: {
	readonly asc: 'desc'
	readonly desc: 'asc'
} = {
	[OrderByDirection.asc]: OrderByDirection.desc,
	[OrderByDirection.desc]: OrderByDirection.asc,
} as const satisfies Record<OrderByDirection, OrderByDirection>
