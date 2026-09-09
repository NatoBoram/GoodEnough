import type { AttributeType } from './server/db/kysely-codegen.ts'

/** 2^6 */
export const maxName = 64
/** 2^6 */
export const maxSlug = 64
/** 2^7 */
export const maxSummary = 128
/** 2^17 */
export const maxDescription = 131_072
/** 2^11 */
export const maxImage = 2_048

export function isAttributeType(value: string): value is AttributeType {
	switch (value) {
		case 'boolean':
		case 'number':
		case 'text':
			return true
	}

	return false
}
