<script module lang="ts">
	import type { Category, User } from '$lib/server/db/kysely-codegen.js'
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import type { Selectable } from 'kysely'
	import CategoryRow from './CategoryRow.svelte'

	const { Story } = defineMeta({
		title: 'Categories/CategoryRow',
		component: CategoryRow,
		tags: ['autodocs'],
		argTypes: {},
		args: {},
	})

	const profile = {
		id: '494d3f58-a268-4639-91ea-a95613810a92',
		username: 'profilename',
	} as const satisfies Pick<Selectable<User>, 'id' | 'username'>

	const category = {
		id: '7563b847-4e60-4d43-9deb-984b565f91f3',
		name: 'Tea',
		slug: 'tea',
		summary: 'Discover the highest quality teas, selected directly from the tea gardens.',
	} as const satisfies Pick<Selectable<Category>, 'id' | 'name' | 'slug' | 'summary'>
</script>

<Story name="Default" args={{ category, profile }} />
