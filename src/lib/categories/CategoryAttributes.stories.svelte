<script module lang="ts">
	import type { Attribute, User } from '$lib/server/db/kysely-codegen.js'
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import type { Selectable } from 'kysely'
	import CategoryAttributes from './CategoryAttributes.svelte'

	const admin = {
		id: 'b6341290-e45b-4c5e-a55c-d2a68ebb5c85',
		role: 'admin',
	} as const satisfies Pick<Selectable<User>, 'id' | 'role'>

	const profile = {
		id: '3f458d71-0197-43ab-a4e2-8a4cad1f2655',
		username: 'profilename',
		role: 'user',
	} as const satisfies Pick<Selectable<User>, 'id' | 'role'> &
		Pick<Selectable<User>, 'id' | 'username'>

	const user = {
		id: 'd306ddc4-7deb-4b1f-a5ce-9d77ee1dd11a',
		role: 'user',
	} as const satisfies Pick<Selectable<User>, 'id' | 'role'>

	const { Story } = defineMeta({
		title: 'Categories/CategoryAttributes',
		component: CategoryAttributes,
		tags: ['autodocs'],
		argTypes: {},
		args: {
			category: { id: '21e4cec2-abaf-43d5-8fe5-5898cb6da3e0', slug: 'teas' },
			profile,
			user,
		},
	})

	const attributes = [
		{
			id: 'a50653a0-84fa-4134-864f-1953367aa5bf',
			name: 'Cultivar',
			summary: 'The specific cultivated variety.',
			type: 'text',
		},
		{
			id: '196deb4b-1983-4330-b98e-2f1009d8d413',
			name: 'Certified',
			summary: 'Some teas are certified by Ecocert.',
			type: 'boolean',
		},
		{
			id: 'd27993b2-2e65-4b2a-b8fe-1080bd57e18d',
			name: 'Altitude (m)',
			summary: 'The height of cultivation.',
			type: 'number',
		},
		{
			id: 'a4d8de4c-b55c-4626-b8f9-5617ab57c7d3',
			name: 'Date of harvest',
			summary: 'Each batch is cultivated at a different time.',
			type: 'date',
		},
	] as const satisfies Pick<Selectable<Attribute>, 'id' | 'name' | 'summary' | 'type'>[]
</script>

<Story name="Default" args={{ attributes }} />

<Story name="User" args={{ attributes: [] }} />

<Story name="Owner" args={{ attributes: [], user: profile }} />

<Story name="Admin" args={{ attributes: [], user: admin }} />
