<script module lang="ts">
	import type { Attribute, User } from '$lib/server/db/kysely-codegen.js'
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import type { Selectable } from 'kysely'
	import AttributeRow from './AttributeRow.svelte'

	const { Story } = defineMeta({
		title: 'Attributes/AttributeRow',
		component: AttributeRow,
		tags: ['autodocs'],
		argTypes: {},
		args: {},
	})

	const profile = {
		id: '8b819c2c-d260-4b74-885c-a34d7ee5a482',
		username: 'profilename',
	} as const satisfies Pick<Selectable<User>, 'id' | 'username'>

	const attribute = {
		id: 'cb0536d6-cfd4-40f5-9647-580690e9fb57',
		name: 'Cultivar',
		slug: 'cultivar',
		summary: 'The specific cultivated variety.',
	} as const satisfies Pick<Selectable<Attribute>, 'id' | 'name' | 'slug' | 'summary'>
</script>

<Story name="Default" args={{ attribute, profile }} />
