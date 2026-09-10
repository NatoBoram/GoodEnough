import { asyncResult } from '../../result.ts'
import { auth } from '../auth.ts'
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '../env.ts'
import { logger } from '../logger.ts'
import { db } from './db.ts'
import { usernameToEmail } from './utils.ts'

export async function seedAdmin(): Promise<string | undefined> {
	const email = ADMIN_EMAIL || usernameToEmail('admin')
	const password = ADMIN_PASSWORD || crypto.randomUUID()

	const selected = await asyncResult(
		db
			.selectFrom('users')
			.select(['id', 'role', 'name'])
			.where('email', '=', email)
			.executeTakeFirst(),
		'selecting admin user',
	)
	if (!selected.ok) {
		logger.error({ error: selected.error }, 'Failed to select admin user')
		return undefined
	}

	if (selected.value) {
		if (selected.value.role === 'admin') return selected.value.id
		const promoted = await asyncResult(
			db
				.updateTable('users')
				.set('role', 'admin')
				.where('id', '=', selected.value.id)
				.returning(['id'])
				.executeTakeFirst(),
			'promoting user to admin',
		)

		if (!promoted.ok) {
			logger.error({ error: promoted.error, user: selected }, 'Failed to promote user to admin')
			return undefined
		}

		if (!promoted.value?.id) {
			logger.error({ selected, promoted }, 'Failed to promote user to admin')
			return undefined
		}

		logger.info({ user: promoted.value }, 'Promoted user to admin')
		return promoted.value.id
	}

	const created = await asyncResult(
		auth.api.createUser({
			body: {
				data: { username: 'admin' },
				email,
				name: 'Admin',
				password,
				role: 'admin',
			},
		}),
		'creating admin user',
	)
	if (!created.ok) {
		logger.error({ error: created.error }, 'Failed to create admin user')
		return undefined
	}

	logger.info(
		{
			...(ADMIN_EMAIL ? {} : { email }),
			...(ADMIN_PASSWORD ? {} : { password }),
			user: created.value.user,
		},
		'Seeded admin user',
	)

	return created.value.user.id
}
