<script module lang="ts">
	import type { Item, User } from '$lib/server/db/schema.js'
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import type { Selectable } from 'kysely'
	import CategoryItems from './CategoryItems.svelte'

	const { Story } = defineMeta({
		title: 'Categories/CategoryItems',
		component: CategoryItems,
		tags: ['autodocs'],
		argTypes: {},
		args: {},
	})

	type PickedItem = Pick<Selectable<Item>, 'id' | 'name' | 'slug' | 'summary'>
	type PickedUser = Pick<Selectable<User>, 'id' | 'username'>

	const items = [
		{
			id: '21b336a3-829f-4f0e-a584-bfe625a5510d',
			name: 'Dong Ding Mr. Nen Yu (roasted)',
			slug: 'dong-ding-mr-nen-yu-roasted',
			summary: 'Frozen Summit',
		},
		{
			id: '9e859d37-49f0-47d8-83ac-d917ef63f601',
			name: 'Gyokuro Shizuoka Organic',
			slug: 'gyokuro-shizuoka-organic',
			summary: 'Jade Dew',
		},
		{
			id: 'f4b3442f-5f43-48ad-80db-3b5558f28f85',
			name: 'Jingning Yin Zhen',
			slug: 'jingning-yin-zhen',
			summary: 'Silver Needles',
		},
		{
			id: '47d40810-23b7-4feb-b7be-457dea086c27',
			name: 'Long Jing Zhejiang',
			slug: 'long-jing-zhejiang',
			summary: 'Dragon Well from Zhejiang',
		},

		{
			id: 'a62fc0c9-9da2-4cbb-9b64-99b6389525d4',
			name: 'Meng Ding Huang Ya',
			slug: 'meng-ding-huang-ya',
			summary: 'Yellow bud from Meng Ding',
		},
	] as const satisfies PickedItem[]

	const profile = {
		id: '1a2ae865-100b-4bdd-aa66-76446374a239',
		username: 'profilename',
	} as const satisfies PickedUser
</script>

<Story name="Default" args={{ items, profile }} />

<Story name="Empty" args={{ items: [], profile }} />
