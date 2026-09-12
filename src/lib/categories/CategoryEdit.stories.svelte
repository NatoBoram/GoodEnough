<script module lang="ts">
	import type { Category } from '$lib/server/db/kysely-codegen.js'
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import type { Selectable } from 'kysely'
	import CategoryEdit from './CategoryEdit.svelte'

	const { Story } = defineMeta({
		title: 'Categories/CategoryEdit',
		component: CategoryEdit,
		tags: ['autodocs'],
		argTypes: {},
		args: {},
	})

	const category = {
		id: 'b2ca1f21-6c7b-4ab6-95b7-becf5f2fc53e',
		name: 'Tea',
		slug: 'tea',
		summary: 'Discover the highest quality teas, selected directly from the tea gardens.',
		description: 'An expanded description.',
	} as const satisfies Pick<
		Selectable<Category>,
		'description' | 'id' | 'name' | 'slug' | 'summary'
	>
</script>

<Story name="Default" args={{ category }} />

<Story name="With error" args={{ category, error: 'This is an error message.' }} />
