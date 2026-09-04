import { logger } from '$lib/logger.js'
import { asyncResult } from '$lib/result.js'
import { auth } from '../auth.ts'
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '../env.ts'
import { db } from './db.ts'

export async function seedAdmin(): Promise<void> {
	if (!ADMIN_EMAIL || !ADMIN_PASSWORD) return

	const selected = await asyncResult(
		db
			.selectFrom('users')
			.select(['id', 'role', 'name'])
			.where('email', '=', ADMIN_EMAIL)
			.executeTakeFirst(),
		'selecting admin user',
	)
	if (!selected.ok) {
		logger.error({ error: selected.error }, 'Failed to select admin user')
		return
	}

	if (selected.value) {
		if (selected.value.role === 'admin') return
		const promoted = await asyncResult(
			db
				.updateTable('users')
				.set('role', 'admin')
				.where('id', '=', selected.value.id)
				.executeTakeFirst(),
			'promoting user to admin',
		)

		if (!promoted.ok) {
			logger.error({ error: promoted.error, user: selected }, 'Failed to promote user to admin')
			return
		}

		logger.info({ user: promoted.value }, 'Promoted user to admin')
		return
	}

	const created = await asyncResult(
		auth.api.createUser({
			body: {
				data: { username: 'admin' },
				email: ADMIN_EMAIL,
				name: 'Admin',
				password: ADMIN_PASSWORD,
				role: 'admin',
			},
		}),
		'creating admin user',
	)
	if (!created.ok) {
		logger.error({ error: created.error }, 'Failed to create admin user')
		return
	}

	logger.info({ user: created.value.user }, 'Seeded admin user')
}
