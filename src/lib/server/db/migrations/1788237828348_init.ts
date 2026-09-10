import type { Kysely } from 'kysely'
import { sql } from 'kysely'

/** 2^6 */
const maxName = 64
/** 2^6 */
const maxSlug = 64
/** 2^7 */
const maxSummary = 128
/** 2^17 */
const maxDescription = 131_072
/** 2^11 */
const maxImage = 2_048

export async function up(db: Kysely<unknown>): Promise<void> {
	// Categories belong to a user, are described by attributes and contain items.
	await db.schema
		.createTable('categories')
		.addColumn('id', 'uuid', col => col.primaryKey().defaultTo(sql`uuidv7()`))
		.addColumn('name', 'text', col => col.notNull())
		.addColumn('slug', 'text', col => col.notNull())
		.addColumn('summary', 'text', col => col.notNull().defaultTo(''))
		.addColumn('description', 'text', col => col.notNull().defaultTo(''))
		.addColumn('image', 'text')
		.addColumn('user', 'uuid', col => col.notNull().references('users.id').onDelete('cascade'))
		.addColumn('created_at', 'timestamptz', col => col.notNull().defaultTo(sql`current_timestamp`))
		.addColumn('updated_at', 'timestamptz', col => col.notNull().defaultTo(sql`current_timestamp`))
		.addUniqueConstraint('categories_user_slug_unique', ['user', 'slug'])
		.addCheckConstraint(
			'categories_name_length',
			sql`char_length(trim(name)) >= 1 and char_length(name) <= ${sql.lit(maxName)}`,
		)
		.addCheckConstraint(
			'categories_slug_length',
			sql`char_length(trim(slug)) >= 1 and char_length(slug) <= ${sql.lit(maxSlug)}`,
		)
		.addCheckConstraint(
			'categories_summary_length',
			sql`char_length(summary) <= ${sql.lit(maxSummary)}`,
		)
		.addCheckConstraint(
			'categories_description_length',
			sql`char_length(description) <= ${sql.lit(maxDescription)}`,
		)
		.addCheckConstraint('categories_image_length', sql`char_length(image) <= ${sql.lit(maxImage)}`)
		.execute()

	// Attributes have a type.
	await db.schema
		.createType('attribute_type')
		.asEnum(['text', 'number', 'boolean', 'date'])
		.execute()

	// Attributes belong to a user, describe categories and are fulfilled by items.
	await db.schema
		.createTable('attributes')
		.addColumn('id', 'uuid', col => col.primaryKey().defaultTo(sql`uuidv7()`))
		.addColumn('name', 'text', col => col.notNull())
		.addColumn('slug', 'text', col => col.notNull())
		.addColumn('summary', 'text', col => col.notNull().defaultTo(''))
		.addColumn('type', sql`attribute_type`, col => col.notNull())
		.addColumn('user', 'uuid', col => col.notNull().references('users.id').onDelete('cascade'))
		.addColumn('created_at', 'timestamptz', col => col.notNull().defaultTo(sql`current_timestamp`))
		.addColumn('updated_at', 'timestamptz', col => col.notNull().defaultTo(sql`current_timestamp`))
		.addUniqueConstraint('attributes_user_slug_unique', ['user', 'slug'])
		.addCheckConstraint(
			'attributes_name_length',
			sql`char_length(trim(name)) >= 1 and char_length(name) <= ${sql.lit(maxName)}`,
		)
		.addCheckConstraint(
			'attributes_slug_length',
			sql`char_length(trim(slug)) >= 1 and char_length(slug) <= ${sql.lit(maxSlug)}`,
		)
		.addCheckConstraint(
			'attributes_summary_length',
			sql`char_length(summary) <= ${sql.lit(maxSummary)}`,
		)
		.execute()

	// Category-attribute relationships define which attributes are applicable to which categories.
	await db.schema
		.createTable('category_attributes')
		.addColumn('category', 'uuid', col =>
			col.notNull().references('categories.id').onDelete('cascade'),
		)
		.addColumn('attribute', 'uuid', col =>
			col.notNull().references('attributes.id').onDelete('cascade'),
		)
		.addPrimaryKeyConstraint('category_attributes_pkey', ['category', 'attribute'])
		.execute()

	// Items belong to a user, are in categories and fulfill their attributtes.
	await db.schema
		.createTable('items')
		.addColumn('id', 'uuid', col => col.primaryKey().defaultTo(sql`uuidv7()`))
		.addColumn('name', 'text', col => col.notNull())
		.addColumn('slug', 'text', col => col.notNull())
		.addColumn('summary', 'text', col => col.notNull().defaultTo(''))
		.addColumn('description', 'text', col => col.notNull().defaultTo(''))
		.addColumn('image', 'text')
		.addColumn('user', 'uuid', col => col.notNull().references('users.id').onDelete('cascade'))
		.addColumn('created_at', 'timestamptz', col => col.notNull().defaultTo(sql`current_timestamp`))
		.addColumn('updated_at', 'timestamptz', col => col.notNull().defaultTo(sql`current_timestamp`))
		.addUniqueConstraint('items_user_slug_unique', ['user', 'slug'])
		.addCheckConstraint(
			'items_name_length',
			sql`char_length(trim(name)) >= 1 and char_length(name) <= ${sql.lit(maxName)}`,
		)
		.addCheckConstraint(
			'items_slug_length',
			sql`char_length(trim(slug)) >= 1 and char_length(slug) <= ${sql.lit(maxSlug)}`,
		)
		.addCheckConstraint('items_summary_length', sql`char_length(summary) <= ${sql.lit(maxSummary)}`)
		.addCheckConstraint(
			'items_description_length',
			sql`char_length(description) <= ${sql.lit(maxDescription)}`,
		)
		.addCheckConstraint('items_image_length', sql`char_length(image) <= ${sql.lit(maxImage)}`)
		.execute()

	// Reviews are made by a user about an item
	await db.schema
		.createTable('reviews')
		.addColumn('id', 'uuid', col => col.primaryKey().defaultTo(sql`uuidv7()`))
		.addColumn('user', 'uuid', col => col.notNull().references('users.id').onDelete('cascade'))
		.addColumn('item', 'uuid', col => col.notNull().references('items.id').onDelete('cascade'))
		.addColumn('rating', 'smallint', col => col.notNull())
		.addColumn('comment', 'text', col => col.notNull().defaultTo(''))
		.addColumn('created_at', 'timestamptz', col => col.notNull().defaultTo(sql`current_timestamp`))
		.addColumn('updated_at', 'timestamptz', col => col.notNull().defaultTo(sql`current_timestamp`))
		.addUniqueConstraint('reviews_user_item_unique', ['user', 'item'])
		.addCheckConstraint('reviews_rating_range', sql`rating >= 1 and rating <= 10`)
		.addCheckConstraint(
			'reviews_comment_length',
			sql`char_length(comment) <= ${sql.lit(maxDescription)}`,
		)
		.execute()

	// Category items link items to categories. While categories and items belong to a user, a user
	// could add another user's items to their categories.
	await db.schema
		.createTable('category_items')
		.addColumn('category', 'uuid', col =>
			col.notNull().references('categories.id').onDelete('cascade'),
		)
		.addColumn('item', 'uuid', col => col.notNull().references('items.id').onDelete('cascade'))
		.addPrimaryKeyConstraint('category_items_pkey', ['category', 'item'])
		.execute()

	// Attribute values link items to attributes and store their values.
	await db.schema
		.createTable('attribute_values')
		.addColumn('id', 'uuid', col => col.primaryKey().defaultTo(sql`uuidv7()`))
		.addColumn('attribute', 'uuid', col =>
			col.notNull().references('attributes.id').onDelete('cascade'),
		)
		.addColumn('item', 'uuid', col => col.notNull().references('items.id').onDelete('cascade'))
		.addColumn('value_text', 'text', col => col)
		.addColumn('value_number', 'numeric', col => col)
		.addColumn('value_boolean', 'boolean', col => col)
		.addColumn('value_date', 'date', col => col)
		.addUniqueConstraint('attribute_values_item_attribute_unique', ['item', 'attribute'])
		.execute()

	// Index an attribute's categories
	await db.schema
		.createIndex('category_attributes_attribute_idx')
		.on('category_attributes')
		.column('attribute')
		.execute()

	// Index an item's categories
	await db.schema
		.createIndex('category_items_item_idx')
		.on('category_items')
		.column('item')
		.execute()

	// Index an item's reviews
	await db.schema.createIndex('reviews_item_idx').on('reviews').column('item').execute()
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropIndex('category_items_item_idx').execute()
	await db.schema.dropIndex('reviews_item_idx').execute()
	await db.schema.dropIndex('category_attributes_attribute_idx').execute()

	await db.schema.dropTable('attribute_values').execute()
	await db.schema.dropTable('category_items').execute()
	await db.schema.dropTable('reviews').execute()
	await db.schema.dropTable('items').execute()
	await db.schema.dropTable('category_attributes').execute()
	await db.schema.dropTable('attributes').execute()
	await db.schema.dropType('attribute_type').execute()
	await db.schema.dropTable('categories').execute()
}
