/**
 * ### Roles
 *
 * By default, there are two roles:
 *
 * * `admin`: Users with the admin role have full control over other users.
 * * `user`: Users with the user role have no control over other users.
 *
 * **Note:** A user can have multiple roles. Multiple roles are stored as string separated by comma (`,`).
 *
 * @see https://better-auth.com/docs/plugins/admin#roles
 *
 * @module
 */

import type { User } from '$lib/server/db/kysely-codegen.js'
import type { Selectable } from 'kysely'

export type Role = (typeof Role)[keyof typeof Role]
export const Role = {
	admin: 'admin',
	user: 'user',
} as const

export function hasAdmin(role: string | null | undefined): boolean {
	if (!role) return false
	return role.split(',').some(r => r === Role.admin)
}

export function isOwner(
	profile: Pick<Selectable<User>, 'id'>,
	user: Pick<Selectable<User>, 'id'> | undefined,
): boolean {
	return profile.id === user?.id
}

export function canEdit(
	profile: Pick<Selectable<User>, 'id'>,
	user: Pick<Selectable<User>, 'id' | 'role'> | undefined,
): boolean {
	return isOwner(profile, user) || hasAdmin(user?.role)
}
