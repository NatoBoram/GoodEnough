import type { Kysely } from 'kysely'
import { sql } from 'kysely'

export async function up(db: Kysely<unknown>): Promise<void> {
	// Users own categories and items.
	await db.schema
		.createTable('users')
		.addColumn('id', 'uuid', col => col.primaryKey().defaultTo(sql`uuidv7()`))
		.addColumn('email', 'text', col => col.notNull().unique())
		.addColumn('password', 'text', col => col.notNull())
		.addColumn('username', 'text', col => col.notNull().unique())
		.execute()

	// Categories belong to a user, are described by attributes and contain items.
	await db.schema
		.createTable('categories')
		.addColumn('id', 'uuid', col => col.primaryKey().defaultTo(sql`uuidv7()`))
		.addColumn('name', 'text', col => col.notNull())
		.addColumn('description', 'text', col => col.notNull().defaultTo(''))
		.addColumn('slug', 'text', col => col.notNull())
		.addColumn('user', 'uuid', col => col.notNull().references('users.id'))
		.addUniqueConstraint('categories_user_slug_unique', ['user', 'slug'])
		.execute()

	// Attributes belong to a user, describe categories and are fulfilled by
	// items.
	await db.schema
		.createTable('attributes')
		.addColumn('id', 'uuid', col => col.primaryKey().defaultTo(sql`uuidv7()`))
		.addColumn('name', 'text', col => col.notNull())
		.addColumn('user', 'uuid', col => col.notNull().references('users.id'))
		.execute()

	// Items belong to a user, are in categories and fulfill their attributtes.
	await db.schema
		.createTable('items')
		.addColumn('id', 'uuid', col => col.primaryKey().defaultTo(sql`uuidv7()`))
		.addColumn('name', 'text', col => col.notNull())
		.addColumn('description', 'text', col => col.notNull().defaultTo(''))
		.addColumn('user', 'uuid', col => col.notNull().references('users.id'))
		.execute()
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('categories').execute()
	await db.schema.dropTable('users').execute()
	await db.schema.dropTable('attributes').execute()
	await db.schema.dropTable('items').execute()
}
