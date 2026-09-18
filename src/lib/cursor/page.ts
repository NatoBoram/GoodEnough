import type { OrderByDirection } from 'kysely'
import type { SortableColumns } from './sort.ts'

export interface Page<T> {
	readonly data: T[]

	readonly column: SortableColumns
	readonly cursor?: string | undefined
	readonly direction: OrderByDirection
	readonly id?: string | undefined
	readonly limit: number
}
