<script module lang="ts">
	import type { Attribute } from '$lib/server/db/kysely-codegen.js'
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import type { Selectable } from 'kysely'
	import CategoryAttribute from './CategoryAttribute.svelte'

	const { Story } = defineMeta({
		title: 'Categories/CategoryAttribute',
		component: CategoryAttribute,
		tags: ['autodocs'],
		argTypes: {},
		args: {},
	})

	type PickedAttribute = Pick<Selectable<Attribute>, 'id' | 'name' | 'summary' | 'type'>

	const text = {
		id: '19a1b23d-0366-4608-b023-9bdbe9f709d0',
		name: 'Cultivar',
		summary: 'The specific cultivated variety.',
		type: 'text',
	} as const satisfies PickedAttribute

	const number = {
		id: '19f76f32-63ca-4c27-a532-d8f7299c9482',
		name: 'Altitude (m)',
		summary: 'The height of cultivation.',
		type: 'number',
	} as const satisfies PickedAttribute

	const date = {
		id: '9515eff3-4dfd-4e61-bfbe-c51405084a54',
		name: 'Date of harvest',
		summary: 'Each batch is cultivated at a different time.',
		type: 'date',
	} as const satisfies PickedAttribute

	const boolean = {
		id: '3f04ba67-7959-4885-9fee-356812c67c18',
		name: 'Certified',
		summary: 'Some teas are certified by Ecocert.',
		type: 'boolean',
	} as const satisfies PickedAttribute
</script>

<Story name="Text" args={{ attribute: text }} />
<Story name="Number" args={{ attribute: number }} />
<Story name="Date" args={{ attribute: date }} />
<Story name="Boolean" args={{ attribute: boolean }} />
