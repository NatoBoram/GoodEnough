<script module lang="ts">
	import type { Item, User } from '$lib/server/db/kysely-codegen.js'
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import type { Selectable } from 'kysely'
	import ItemRow from './ItemRow.svelte'

	const { Story } = defineMeta({
		title: 'Items/ItemRow',
		component: ItemRow,
		tags: ['autodocs'],
		argTypes: {},
		args: {},
	})

	const profile = {
		id: '986f8099-68cb-447a-be24-e15fa7fe0979',
		username: 'profilename',
	} as const satisfies Pick<Selectable<User>, 'id' | 'username'>

	const item = {
		id: 'd4174731-8b29-4a12-af12-c53b1ba0ea4c',
		name: 'Long Jing Zhejiang',
		slug: 'long-jing-zhejiang',
		summary: 'Dragon Well from Zhejiang',
	} as const satisfies Pick<Selectable<Item>, 'id' | 'name' | 'slug' | 'summary'>
</script>

<Story name="Default" args={{ item, profile }} />
