<script module lang="ts">
	import type { Category, CategoryItem } from '$lib/server/db/kysely-codegen.js'
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import type { Selectable } from 'kysely'
	import ItemCategoryForm from './ItemCategoryForm.svelte'

	const { Story } = defineMeta({
		title: 'Items/ItemCategoryForm',
		component: ItemCategoryForm,
		tags: ['autodocs'],
		argTypes: {},
		args: { categories: [], assigned: [], error: undefined },
	})

	type CategoryRow = Pick<Selectable<Category>, 'id' | 'name' | 'summary'>
	type Assigned = Pick<Selectable<CategoryItem>, 'category'>

	const green = {
		id: 'ce7d871d-fa53-4eef-a62e-b09ab6d65ec7',
		name: 'Green tea',
		summary:
			'Green teas are non-oxidized. An intensive drying, known as withering, is performed on fresh leaves causing an increase in tannins and vegetal taste the liquor.',
	} as const satisfies CategoryRow

	const wulong = {
		id: 'd92edde8-4555-4754-a338-6e38f5e70689',
		name: 'Wulong tea',
		summary:
			'Wulongs are partially oxidized. By varying the degrees of oxidation, a greener (floral and vegetable) or more black (woody, fruity, roasted) wulong can be obtained.',
	} as const satisfies CategoryRow

	const categories = [green, wulong] as const satisfies CategoryRow[]

	const assigned = [{ category: green.id }] as const satisfies Assigned[]
</script>

<Story name="Mixed" args={{ categories, assigned }} />

<Story
	name="Assigned"
	args={{ categories, assigned: [{ category: green.id }, { category: wulong.id }] }}
/>

<Story name="Unassigned" args={{ categories }} />

<Story name="Empty" args={{ categories: [] }} />

<Story name="Error" args={{ categories, assigned, error: 'Failed to update item categories.' }} />
