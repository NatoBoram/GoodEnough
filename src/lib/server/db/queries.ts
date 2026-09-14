import type { Selectable } from 'kysely'
import { db } from './db.ts'
import type { Attribute, AttributeValue, Item, User } from './kysely-codegen.ts'

export async function getItemAttributeValues(
	item: Pick<Selectable<Item>, 'id'>,
	profile: Pick<Selectable<User>, 'id'>,
): Promise<
	Pick<
		Selectable<Attribute & AttributeValue>,
		| 'id'
		| 'name'
		| 'slug'
		| 'summary'
		| 'type'
		| 'value_boolean'
		| 'value_date'
		| 'value_number'
		| 'value_text'
	>[]
> {
	return db
		.selectFrom('category_items')
		.where('category_items.item', '=', item.id)
		.innerJoin('categories', join =>
			join
				.onRef('categories.id', '=', 'category_items.category')
				.on('categories.user', '=', profile.id),
		)
		.innerJoin('category_attributes', 'category_attributes.category', 'categories.id')
		.innerJoin('attributes', join =>
			join
				.onRef('attributes.id', '=', 'category_attributes.attribute')
				.on('attributes.user', '=', profile.id),
		)
		.leftJoin('attribute_values', join =>
			join
				.onRef('attribute_values.attribute', '=', 'attributes.id')
				.on('attribute_values.item', '=', item.id),
		)
		.select([
			'attributes.id',
			'attributes.name',
			'attributes.slug',
			'attributes.summary',
			'attributes.type',
			'attribute_values.value_text',
			'attribute_values.value_number',
			'attribute_values.value_boolean',
			'attribute_values.value_date',
		])
		.orderBy('attributes.id', 'asc')
		.distinctOn('attributes.id')
		.execute()
}
