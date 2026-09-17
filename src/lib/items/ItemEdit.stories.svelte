<script module lang="ts">
	import type { Item } from '$lib/server/db/kysely-codegen.js'
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import type { Selectable } from 'kysely'
	import ItemEdit from './ItemEdit.svelte'

	const { Story } = defineMeta({
		title: 'Items/ItemEdit',
		component: ItemEdit,
		tags: ['autodocs'],
		argTypes: {},
		args: {},
	})

	const item = {
		id: '35db2b10-2a1b-44c1-867d-73a6d5d01e87',
		name: 'Long Jing Zhejiang',
		slug: 'long-jing-zhejiang',
		summary: 'Dragon Well from Zhejiang',
		description: `A great Chinese classic whole leaf green tea with a bright tint of jade. Our producer Mr. He masters marvelously this "Dragonwell" style.

A clear green liquor, brisk and tasty with elegant floral and grassy notes well structured with an edge of fresh hazelnut.

This lot is exclusive to our tea house and produced according to our specifications.`,
	} as const satisfies Pick<Selectable<Item>, 'description' | 'id' | 'name' | 'slug' | 'summary'>
</script>

<Story name="Default" args={{ item }} />

<Story name="Error" args={{ item, error: 'Slug is required.' }} />
