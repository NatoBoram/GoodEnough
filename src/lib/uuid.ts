import type { UUID } from 'node:crypto'

/**
 * @see https://github.com/uuidjs/uuid/blob/fd59f0277549d22cc7ec00a7b3b5c9bccb4d3c1d/src/regex.ts
 */
const regex =
	/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i

/**
 * @see https://github.com/uuidjs/uuid/blob/fd59f0277549d22cc7ec00a7b3b5c9bccb4d3c1d/src/validate.ts
 */
export function isUuid(value: unknown): value is UUID {
	return typeof value === 'string' && regex.test(value)
}
