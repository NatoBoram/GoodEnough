<script module lang="ts">
	import type { Item, User } from '$lib/server/db/kysely-codegen.js'
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import type { Selectable } from 'kysely'
	import CategoryItem from './CategoryItem.svelte'

	const { Story } = defineMeta({
		title: 'Categories/CategoryItem',
		component: CategoryItem,
		tags: ['autodocs'],
		argTypes: {},
		args: {},
	})

	const item = {
		id: '4ddb2a34-4055-4bfa-a517-f629fa27333d',
		name: 'Long Jing Zhejiang',
		summary: 'Dragon Well from Zhejiang',
		slug: 'long-jing-zhejiang',
	} as const satisfies Pick<Selectable<Item>, 'id' | 'name' | 'slug' | 'summary'>

	const profile = {
		id: 'c0d44f99-d78d-447c-bcd0-7e95bbaedc68',
		username: 'profilename',
	} as const satisfies Pick<Selectable<User>, 'id' | 'username'>
</script>

<Story name="Default" args={{ item, profile }} />
