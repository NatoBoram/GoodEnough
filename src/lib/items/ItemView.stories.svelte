<script module lang="ts">
	import { dateTimeOptions } from '$lib/date_time_format.js'
	import { parseMarkdown } from '$lib/markdown.js'
	import type { Item, User } from '$lib/server/db/kysely-codegen.js'
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import type { Selectable } from 'kysely'
	import ItemView from './ItemView.svelte'

	const description =
		await parseMarkdown(`A great Chinese classic whole leaf green tea with a bright tint of jade. Our producer Mr. He masters marvelously this "Dragonwell" style.

A clear green liquor, brisk and tasty with elegant floral and grassy notes well structured with an edge of fresh hazelnut.

This lot is exclusive to our tea house and produced according to our specifications.`)

	const format = Intl.DateTimeFormat('en-ca', dateTimeOptions)

	const profile = {
		id: '7c7c2700-5025-49ab-8f41-06aa43f8673f',
		username: 'profilename',
	} as const satisfies Pick<Selectable<User>, 'id' | 'username'>

	const { Story } = defineMeta({
		title: 'Items/ItemView',
		component: ItemView,
		tags: ['autodocs'],
		argTypes: {},
		args: { description, format, profile },
	})

	const firstDate = new Date(Date.UTC(2026, 8, 23, 14, 30, 0))
	const secondDate = new Date(Date.UTC(2026, 11, 25, 18, 45, 0))

	const item = {
		id: '2f7c58c9-9e45-47e8-aed8-2b231edc96e1',
		name: 'Long Jing Zhejiang',
		slug: 'long-jing-zhejiang',
		summary: 'Dragon Well from Zhejiang',
		created_at: firstDate,
		updated_at: firstDate,
	} as const satisfies Pick<
		Selectable<Item>,
		'created_at' | 'id' | 'name' | 'slug' | 'summary' | 'updated_at'
	>
</script>

<Story
	name="Default"
	args={{
		item,
	}}
/>

<Story
	name="Edited"
	args={{
		item: { ...item, updated_at: secondDate },
	}}
/>
