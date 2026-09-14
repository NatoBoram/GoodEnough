<script module lang="ts">
	import { dateOptions } from '$lib/date_time_format.js'
	import type { Attribute, AttributeValue } from '$lib/server/db/kysely-codegen.js'
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import type { Selectable } from 'kysely'
	import ItemAttribute from './ItemAttribute.svelte'

	const format = Intl.DateTimeFormat('en-ca', dateOptions)

	const { Story } = defineMeta({
		title: 'Items/ItemAttribute',
		component: ItemAttribute,
		tags: ['autodocs'],
		argTypes: {},
		args: { format },
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
		id: 'a50653a0-84fa-4134-864f-1953367aa5bf',
		name: 'Cultivar',
		summary: 'The specific cultivated variety.',
		type: 'text',
		value_text: 'Long Jing 43',
	} as const satisfies AttributeRow

	const booleanAttribute = {
		...nullAttribute,
		id: '196deb4b-1983-4330-b98e-2f1009d8d413',
		name: 'Certified',
		summary: 'Some teas are certified by Ecocert.',
		type: 'boolean',
		value_boolean: false,
	} as const satisfies AttributeRow

	const numberAttribute = {
		...nullAttribute,
		id: 'd27993b2-2e65-4b2a-b8fe-1080bd57e18d',
		name: 'Altitude (m)',
		summary: 'The height of cultivation.',
		type: 'number',
		value_number: '500',
	} as const satisfies AttributeRow

	const dateAttribute = {
		...nullAttribute,
		id: 'a4d8de4c-b55c-4626-b8f9-5617ab57c7d3',
		name: 'Date of harvest',
		summary: 'Each batch is cultivated at a different time.',
		type: 'date',
		value_date: new Date(Date.UTC(2026, 4, 12)),
	} as const satisfies AttributeRow
</script>

<Story
	name="Text"
	args={{
		attribute: textAttribute,
	}}
/>

<Story
	name="Number"
	args={{
		attribute: numberAttribute,
	}}
/>

<Story
	name="Boolean"
	args={{
		attribute: booleanAttribute,
	}}
/>

<Story
	name="Date"
	args={{
		attribute: dateAttribute,
	}}
/>
