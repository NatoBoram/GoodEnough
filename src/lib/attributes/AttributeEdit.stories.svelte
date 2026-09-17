<script module lang="ts">
	import type { Attribute } from '$lib/server/db/kysely-codegen.js'
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import type { Selectable } from 'kysely'
	import AttributeEdit from './AttributeEdit.svelte'

	const { Story } = defineMeta({
		title: 'Attributes/AttributeEdit',
		component: AttributeEdit,
		tags: ['autodocs'],
		argTypes: {},
		args: {},
	})

	const attribute = {
		id: '2a50aa58-bd22-4367-a5a0-ab4e4410f35f',
		name: 'Cultivar',
		slug: 'cultivar',
		summary: 'The specific cultivated variety.',
		type: 'number',
	} as const satisfies Pick<Selectable<Attribute>, 'id' | 'name' | 'slug' | 'summary' | 'type'>
</script>

<Story name="Default" args={{ attribute }} />

<Story name="Error" args={{ attribute, error: 'Name is required.' }} />
