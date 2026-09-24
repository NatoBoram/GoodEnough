<script module lang="ts">
	import { dateTimeOptions } from '$lib/date_time_format.js'
	import type { Attribute, User } from '$lib/server/db/schema.js'
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import type { Selectable } from 'kysely'
	import AttributeView from './AttributeView.svelte'

	const format = Intl.DateTimeFormat('en-gb', dateTimeOptions)

	const { Story } = defineMeta({
		title: 'Attributes/AttributeView',
		component: AttributeView,
		tags: ['autodocs'],
		argTypes: {},
		args: { format },
	})

	const firstDate = new Date(Date.UTC(2026, 8, 23, 14, 30, 0))
	const secondDate = new Date(Date.UTC(2026, 11, 25, 18, 45, 0))

	const attribute = {
		id: 'eec685d7-9a2e-4eac-a4fc-726bef5c1c92',
		name: 'Cultivar',
		slug: 'cultivar',
		summary: 'The specific cultivated variety.',
		type: 'number',
		created_at: firstDate,
		updated_at: firstDate,
	} as const satisfies Pick<
		Selectable<Attribute>,
		'created_at' | 'id' | 'name' | 'slug' | 'summary' | 'type' | 'updated_at'
	>

	const profile = {
		id: 'e2e7d329-d1ed-4257-bb95-307272588562',
		username: 'profilename',
	} as const satisfies Pick<Selectable<User>, 'id' | 'username'>
</script>

<Story name="Default" args={{ attribute, profile }} />

<Story name="Edited" args={{ attribute: { ...attribute, updated_at: secondDate }, profile }} />
