<script module lang="ts">
	import type { Attribute, User } from '$lib/server/db/kysely-codegen.js'
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import type { Selectable } from 'kysely'
	import { fn } from 'storybook/test'
	import CategoryAttributeForm from './CategoryAttributeForm.svelte'

	const profile = {
		id: '9b3e8be3-21d5-4d6f-9673-07de3f4f7d96',
		username: 'profilename',
	} as const satisfies Pick<Selectable<User>, 'id' | 'username'>

	const { Story } = defineMeta({
		title: 'Categories/CategoryAttributeForm',
		component: CategoryAttributeForm,
		tags: ['autodocs'],
		args: { onsubmit: fn(), profile, assigned: [], unassigned: [] },
	})

	type PickedAttributes = Pick<Selectable<Attribute>, 'id' | 'name' | 'summary' | 'type'>[]

	const assigned = [
		{
			id: 'f40b63ca-c01c-4cd8-91c3-05fcd84d8a45',
			name: 'Cultivar',
			summary: 'The specific cultivated variety.',
			type: 'text',
		},
		{
			id: 'ddc7313f-4d6c-47b4-8ef8-0f3637bca2a6',
			name: 'Altitude (m)',
			summary: 'The height of cultivation.',
			type: 'number',
		},
	] as const satisfies PickedAttributes

	const unassigned = [
		{
			id: '47f61884-9ed5-44a4-b042-e2be8df3cb93',
			name: 'Date of harvest',
			type: 'date',
			summary: 'Each batch is cultivated at a different time.',
		},
		{
			id: '2db1d62b-7260-4463-b9e4-26b1acf75663',
			name: 'Certified',
			summary: 'Some teas are certified by Ecocert.',
			type: 'boolean',
		},
	] as const satisfies PickedAttributes
</script>

<Story name="Empty" args={{ assigned: [], unassigned: [] }} />

<Story name="Assigned" args={{ assigned, unassigned: [] }} />

<Story name="Unassigned" args={{ assigned: [], unassigned }} />

<Story
	name="Error"
	args={{ assigned, unassigned, error: 'Failed to update category attributes.' }}
/>
