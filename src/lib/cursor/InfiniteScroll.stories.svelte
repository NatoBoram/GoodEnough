<script module lang="ts">
	import type { Page } from '$lib/cursor/page.js'
	import ItemRow from '$lib/items/ItemRow.svelte'
	import type { Item, User } from '$lib/server/db/schema.js'
	import { defineMeta, type StoryContext } from '@storybook/addon-svelte-csf'
	import type { Selectable } from 'kysely'
	import { fn } from 'storybook/test'
	import type { Snippet } from 'svelte'
	import type { ClassValue } from 'svelte/elements'
	import InfiniteScroll from './InfiniteScroll.svelte'
	import { OrderByDirection, SortableColumns } from './sort.js'

	interface Props {
		readonly class?: ClassValue
		readonly initialPage: Promise<Page<ItemInRow>>
		readonly loadNext: (lastRow: ItemInRow) => Promise<Page<ItemInRow>>
	}

	const firstDate = new Date(Date.UTC(2026, 8, 23, 14, 30, 0))
	const secondDate = new Date(Date.UTC(2026, 11, 25, 18, 45, 0))

	type ItemInRow = Pick<
		Selectable<Item>,
		'created_at' | 'id' | 'name' | 'slug' | 'summary' | 'updated_at'
	>

	const limit = 3

	const profile = {
		id: 'd4cf3b95-8f12-4ce5-ad04-6857d0401594',
		username: 'profilename',
	} as const satisfies Pick<Selectable<User>, 'id' | 'username'>

	const firstRows = [
		{
			id: '08e514e2-8586-447b-baa0-8b714e20fbdc',
			name: 'Dong Ding Mr. Nen Yu (roasted)',
			slug: 'dong-ding-mr-nen-yu-roasted',
			summary: 'Frozen Summit',
			created_at: firstDate,
			updated_at: secondDate,
		},
		{
			id: '8e7b6ba4-e979-421f-be7a-5c9f21e46b7b',
			name: 'Gyokuro Shizuoka Organic',
			slug: 'gyokuro-shizuoka-organic',
			summary: 'Jade Dew',
			created_at: firstDate,
			updated_at: secondDate,
		},
		{
			id: '26afb2ec-d7c8-4229-9b09-3c07f9995862',
			name: 'Jingning Yin Zhen',
			slug: 'jingning-yin-zhen',
			summary: 'Silver Needles',
			created_at: firstDate,
			updated_at: secondDate,
		},
	] as const satisfies ItemInRow[]

	const secondRows = [
		{
			id: '27889b91-5bac-4de8-9d11-8d20f1d722fc',
			name: 'Long Jing Zhejiang',
			slug: 'long-jing-zhejiang',
			summary: 'Dragon Well from Zhejiang',
			created_at: firstDate,
			updated_at: secondDate,
		},

		{
			id: 'e2bee9f1-f089-459f-b1f2-74ade0e68446',
			name: 'Meng Ding Huang Ya',
			slug: 'meng-ding-huang-ya',
			summary: 'Yellow bud from Meng Ding',
			created_at: firstDate,
			updated_at: secondDate,
		},
	] as const satisfies ItemInRow[]

	function page(data: ItemInRow[], cursor?: string): Page<ItemInRow> {
		return {
			column: SortableColumns.name,
			cursor,
			data: [...data],
			direction: OrderByDirection.asc,
			limit,
		}
	}

	async function delayedPage(data: ItemInRow[], cursor?: string): Promise<Page<ItemInRow>> {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve(page(data, cursor))
			}, 1_000)
		})
	}

	async function loadNextPage() {
		return delayedPage(secondRows)
	}

	async function loadEmptyPage(): Promise<Page<ItemInRow>> {
		return Promise.resolve(page([]))
	}

	const { Story } = defineMeta<Snippet<[Props, StoryContext<Props>]>, typeof InfiniteScroll>({
		title: 'Layout/InfiniteScroll',
		component: InfiniteScroll,
		tags: ['autodocs'],
		argTypes: {},
		args: {
			initialPage: Promise.resolve(page(firstRows, firstRows.at(-1)?.name)),
			loadNext: fn(loadNextPage),
		},
	})
</script>

{#snippet template(args: Props)}
	<InfiniteScroll {...args}>
		{#snippet row(item: ItemInRow)}
			<ItemRow {item} {profile} />
		{/snippet}
	</InfiniteScroll>
{/snippet}

<Story name="Default" {template} args={{}} />

<Story
	name="Loading"
	{template}
	args={{
		initialPage: delayedPage(firstRows, firstRows.at(-1)?.name),
	}}
/>

<Story
	name="Empty"
	{template}
	args={{
		initialPage: Promise.resolve(page([])),
		loadNext: fn(loadEmptyPage),
	}}
/>
