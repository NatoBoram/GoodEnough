<script module lang="ts">
	import type { Attribute } from '$lib/server/db/kysely-codegen.js'
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import type { Selectable } from 'kysely'
	import CategoryAttributes from './CategoryAttributes.svelte'

	const { Story } = defineMeta({
		title: 'Categories/CategoryAttributes',
		component: CategoryAttributes,
		tags: ['autodocs'],
		argTypes: {},
		args: {
			category: { id: '21e4cec2-abaf-43d5-8fe5-5898cb6da3e0', slug: 'teas' },
			profile: { id: '3f458d71-0197-43ab-a4e2-8a4cad1f2655', username: 'profilename' },
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

<Story name="Empty" args={{ attributes: [] }} />
