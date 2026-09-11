<script module lang="ts">
	import { dateTimeOptions } from '$lib/date_time_format.js'
	import { parseMarkdown } from '$lib/markdown.js'
	import type { Category, User } from '$lib/server/db/kysely-codegen.js'
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import type { Selectable } from 'kysely'
	import CategoryView from './CategoryView.svelte'

	const { Story } = defineMeta({
		title: 'Categories/CategoryView',
		component: CategoryView,
		tags: ['autodocs'],
		argTypes: {},
		args: {},
	})

	const firstDate = new Date(Date.UTC(2026, 8, 23, 14, 30, 0))
	const secondDate = new Date(Date.UTC(2026, 11, 25, 18, 45, 0))

	const category = {
		id: '8b93b7fa-0107-4f42-a01f-d98a84b9bd19',
		name: 'Tea',
		slug: 'tea',
		summary: 'Discover the highest quality teas, selected directly from the tea gardens.',
		image:
			'https://camellia-sinensis.com/theme/camellia/resources/assets/images/products/headers/tea.jpg',
		created_at: firstDate,
		updated_at: firstDate,
	} as const satisfies Pick<
		Selectable<Category>,
		'created_at' | 'id' | 'image' | 'name' | 'slug' | 'summary' | 'updated_at'
	>

	const description =
		await parseMarkdown(`The full description supports markdown. This includes **bold**, _italic_, \`code\` and other blocks.

It's also a place where, normally, a user could write all their thoughts about the category itself.`)

	const profile = {
		id: 'c63d409c-d2ac-4d5d-8485-66b231e459a0',
		username: 'profilename',
	} as const satisfies Pick<Selectable<User>, 'id' | 'username'>

	const user = {
		id: 'ac1490e4-ffb5-4426-b827-fe36b619b183',
		role: 'user',
	} as const satisfies Pick<Selectable<User>, 'id' | 'role'>
</script>

<Story
	name="Default"
	args={{
		category,
		description,
		format: Intl.DateTimeFormat('en-ca', dateTimeOptions),
		profile,
	}}
/>

<Story
	name="Edited"
	args={{
		category: { ...category, updated_at: secondDate },
		description,
		format: Intl.DateTimeFormat('en-ca', dateTimeOptions),
		profile,
	}}
/>

<Story
	name="Owner"
	args={{
		category,
		description,
		format: Intl.DateTimeFormat('en-ca', dateTimeOptions),
		profile: { ...user, ...profile },
		user: { ...user, ...profile },
	}}
/>

<Story
	name="Admin"
	args={{
		category,
		description,
		format: Intl.DateTimeFormat('en-ca', dateTimeOptions),
		profile,
		user: { ...user, role: 'admin' },
	}}
/>
