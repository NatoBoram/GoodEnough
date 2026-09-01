import type { Kysely } from 'kysely'
import { sql } from 'kysely'

export async function up(db: Kysely<unknown>): Promise<void> {
	// Categories belong to a user, are described by attributes and contain items.
	await db.schema
		.createTable('categories')
		.addColumn('id', 'uuid', col => col.primaryKey().defaultTo(sql`uuidv7()`))
		.addColumn('name', 'text', col => col.notNull())
		.addColumn('description', 'text', col => col.notNull().defaultTo(''))
		.addColumn('slug', 'text', col => col.notNull())
		.addColumn('user', 'uuid', col => col.notNull().references('users.id'))
		.addColumn('parent', 'uuid', col => col.references('categories.id'))
		.addUniqueConstraint('categories_user_slug_unique', ['user', 'slug'])
		.execute()

	// Attributes have a type.
	await db.schema.createType('attribute_type').asEnum(['text', 'number', 'boolean']).execute()

	// Attributes belong to a user, describe categories and are fulfilled by items.
	await db.schema
		.createTable('attributes')
		.addColumn('id', 'uuid', col => col.primaryKey().defaultTo(sql`uuidv7()`))
		.addColumn('name', 'text', col => col.notNull())
		.addColumn('type', sql`attribute_type`, col => col.notNull())
		.addColumn('user', 'uuid', col => col.notNull().references('users.id'))
		.execute()

	// Category-attribute relationships define which attributes are applicable to which categories.
	await db.schema
		.createTable('category_attributes')
		.addColumn('id', 'uuid', col => col.primaryKey().defaultTo(sql`uuidv7()`))
		.addColumn('category', 'uuid', col => col.notNull().references('categories.id'))
		.addColumn('attribute', 'uuid', col => col.notNull().references('attributes.id'))
		.addUniqueConstraint('category_attributes_category_attribute_unique', ['category', 'attribute'])
		.execute()

	// Items belong to a user, are in categories and fulfill their attributtes.
	await db.schema
		.createTable('items')
		.addColumn('id', 'uuid', col => col.primaryKey().defaultTo(sql`uuidv7()`))
		.addColumn('name', 'text', col => col.notNull())
		.addColumn('description', 'text', col => col.notNull().defaultTo(''))
		.addColumn('user', 'uuid', col => col.notNull().references('users.id'))
		.execute()

	// Attribute values link items to attributes and store their values.
	await db.schema
		.createTable('attribute_values')
		.addColumn('id', 'uuid', col => col.primaryKey().defaultTo(sql`uuidv7()`))
		.addColumn('attribute', 'uuid', col => col.notNull().references('attributes.id'))
		.addColumn('item', 'uuid', col => col.notNull().references('items.id'))
		.addColumn('value_text', 'text', col => col)
		.addColumn('value_number', 'numeric', col => col)
		.addColumn('value_boolean', 'boolean', col => col)
		.addUniqueConstraint('attribute_values_item_attribute_unique', ['item', 'attribute'])
		.execute()
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('attribute_values').execute()
	await db.schema.dropTable('items').execute()
	await db.schema.dropTable('category_attributes').execute()
	await db.schema.dropTable('attributes').execute()
	await db.schema.dropType('attribute_type').execute()
	await db.schema.dropTable('categories').execute()
}
