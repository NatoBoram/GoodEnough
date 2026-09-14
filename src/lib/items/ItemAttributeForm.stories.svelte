<script module lang="ts">
	import type { Attribute, AttributeValue } from '$lib/server/db/kysely-codegen.js'
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import type { Selectable } from 'kysely'
	import ItemAttributeForm from './ItemAttributeForm.svelte'

	const { Story } = defineMeta({
		title: 'Items/ItemAttributeForm',
		component: ItemAttributeForm,
		tags: ['autodocs'],
		argTypes: {},
		args: { attributes: [], error: undefined },
	})

	type AttributeRow = Pick<
		Selectable<Attribute & AttributeValue>,
		| 'id'
		| 'name'
		| 'summary'
		| 'type'
		| 'value_boolean'
		| 'value_date'
		| 'value_number'
		| 'value_text'
	>

	const nullAttribute = {
		value_boolean: null,
		value_date: null,
		value_number: null,
		value_text: null,
	}

	const textAttribute = {
		...nullAttribute,
		id: '008b1b69-b124-41a9-b2f8-d59fd3aa8873',
		name: 'Cultivar',
		summary: 'The specific cultivated variety.',
		type: 'text',
		value_text: 'Long Jing 43',
	} as const satisfies AttributeRow

	const booleanAttribute = {
		...nullAttribute,
		id: 'ed7ef265-84e2-4203-a057-bf8a40cc8fa9',
		name: 'Certified',
		summary: 'Some teas are certified by Ecocert.',
		type: 'boolean',
		value_boolean: true,
	} as const satisfies AttributeRow

	const numberAttribute = {
		...nullAttribute,
		id: '4f54f538-56ab-4d4f-a2b4-8564caa1536d',
		name: 'Altitude (m)',
		summary: 'The height of cultivation.',
		type: 'number',
		value_number: '500',
	} as const satisfies AttributeRow

	const dateAttribute = {
		...nullAttribute,
		id: '4983af84-c481-4d29-9bb7-26a109aebc0c',
		name: 'Date of harvest',
		summary: 'Each batch is cultivated at a different time.',
		type: 'date',
		value_date: new Date(Date.UTC(2026, 4, 12)),
	} as const satisfies AttributeRow

	const attributes: AttributeRow[] = [
		textAttribute,
		booleanAttribute,
		numberAttribute,
		dateAttribute,
	]

	const emptyAttributes = attributes.map<AttributeRow>(attribute => ({
		...attribute,
		...nullAttribute,
	}))
</script>

<Story name="Filled" args={{ attributes }} />

<Story name="Unfilled" args={{ attributes: emptyAttributes }} />

<Story name="Empty" args={{ attributes: [] }} />

<Story name="Error" args={{ attributes, error: 'Failed to update item attributes.' }} />
