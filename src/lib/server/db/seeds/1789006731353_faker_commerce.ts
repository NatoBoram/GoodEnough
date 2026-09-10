import { faker } from '@faker-js/faker'
import type { InsertObject, Kysely, Selectable } from 'kysely'
import { randomPercent } from '../../../faker/random.js'
import type { Category, DB, User } from '../kysely-codegen.ts'
import { usernameToEmail } from '../utils.ts'

async function upsertCategory(
	db: Kysely<DB>,
	user: Pick<Selectable<User>, 'id'>,
	name: string,
): Promise<Pick<Selectable<Category>, 'id'>> {
	const selected = await db
		.selectFrom('categories')
		.select(['id'])
		.where('user', '=', user.id)
		.where('name', '=', name)
		.executeTakeFirst()
	if (selected?.id) return selected

	return db
		.insertInto('categories')
		.values({
			name,
			slug: faker.helpers.slugify(name),
			summary: faker.commerce.productAdjective(),
			description: faker.commerce.productDescription(),
			image: faker.image.url(),
			user: user.id,
		})
		.returning('id')
		.executeTakeFirstOrThrow()
}

function valueByAttribute(attributeSlug: string) {
	switch (attributeSlug) {
		case 'colour':
			return faker.color.human()
		case 'format':
			return faker.book.format()
		case 'genre':
			return faker.book.genre()
		case 'material':
			return faker.commerce.productMaterial()
		default:
			return faker.lorem.word()
	}
}

export async function seed(db: Kysely<DB>): Promise<void> {
	await db.transaction().execute(async db => {
		const user = await db
			.insertInto('users')
			.values({
				name: 'Faker Commerce',
				username: 'faker-commerce',
				email: usernameToEmail('faker-commerce'),
				email_verified: false,
				role: 'user',
			})
			.returning('id')
			.executeTakeFirstOrThrow()

		// Seed some items
		const items = await db
			.insertInto('items')
			.values(
				new Array(50).fill(undefined).map<InsertObject<DB, 'items'>>(() => {
					const name = faker.commerce.productName()
					return {
						name,
						slug: faker.helpers.slugify(name),
						summary: faker.commerce.productAdjective(),
						description: faker.commerce.productDescription(),
						image: faker.image.url(),
						user: user.id,
					} satisfies InsertObject<DB, 'items'>
				}),
			)
			.onConflict(oc => oc.columns(['user', 'slug']).doNothing())
			.returning(['id'])
			.execute()

		// Put items in categories
		for (const item of items) {
			const name = faker.commerce.department()
			const category = await upsertCategory(db, user, name)
			await db
				.insertInto('category_items')
				.values({ category: category.id, item: item.id })
				.execute()
		}

		const categories = await db
			.selectFrom('categories')
			.select(['id'])
			.where('user', '=', user.id)
			.execute()

		// Create attributes
		const attributes = await db
			.insertInto('attributes')
			.values([
				{ name: 'Colour', slug: 'colour', type: 'text', user: user.id },
				{ name: 'Format', slug: 'format', type: 'text', user: user.id },
				{ name: 'Genre', slug: 'genre', type: 'text', user: user.id },
				{ name: 'Material', slug: 'material', type: 'text', user: user.id },
			])
			.returning(['id'])
			.execute()

		// Put attributes in categories
		for (const attribute of attributes) {
			for (const category of categories) {
				if (!randomPercent(50)) continue
				await db
					.insertInto('category_attributes')
					.values({ category: category.id, attribute: attribute.id })
					.execute()
			}
		}

		// Put values in items' attributes
		const pairs = await db
			.selectFrom('category_items')
			.innerJoin('category_attributes', 'category_attributes.category', 'category_items.category')
			.innerJoin('attributes', 'attributes.id', 'category_attributes.attribute')
			.select([
				'category_items.item as item_id',
				'category_attributes.attribute as attribute_id',
				'attributes.slug as attribute_slug',
				'attributes.type as attribute_type',
			])
			.distinct()
			.execute()

		for (const pair of pairs) {
			if (!randomPercent(50)) continue
			await db
				.insertInto('attribute_values')
				.values({
					item: pair.item_id,
					attribute: pair.attribute_id,
					value_text: valueByAttribute(pair.attribute_slug),
				})
				.execute()
		}
	})
}
