<script lang="ts">
	import { replaceState } from '$app/navigation'
	import { resolve } from '$app/paths'
	import { page } from '$app/state'
	import { canEdit } from '$lib/auth/authorization.js'
	import { nextCursor } from '$lib/cursor/cursor.js'
	import { getLimit } from '$lib/cursor/limit.js'
	import type { Page } from '$lib/cursor/page.js'
	import type { SortableSelection } from '$lib/cursor/sort.js'
	import {
		getDirection,
		getSortable,
		OrderByDirection,
		Sortable,
		SortableColumns,
		toSortable,
	} from '$lib/cursor/sort.js'
	import ItemRow from '$lib/items/ItemRow.svelte'
	import { m } from '$lib/paraglide/messages.js'
	import type { Item } from '$lib/server/db/kysely-codegen.js'
	import { Spinner } from '@natoboram/heroicons.svelte'
	import type { Selectable } from 'kysely'
	import { onMount, tick } from 'svelte'
	import { SvelteURLSearchParams } from 'svelte/reactivity'
	import type { PageProps } from './$types.ts'

	const { data, params }: PageProps = $props()

	let sentinel: HTMLDivElement
	let observer: IntersectionObserver | undefined

	// svelte-ignore state_referenced_locally
	let pages = $state([data.page])

	onMount(() => {
		void setupObserver()
		return () => observer?.disconnect()
	})

	async function setupObserver() {
		await data.page
		await tick()

		/** The first observer is reused until it fails */
		observer = new IntersectionObserver((entries, o) => void callback(entries, o))
		observer.observe(sentinel)
	}

	async function callback(
		entries: IntersectionObserverEntry[],
		o: IntersectionObserver,
	): Promise<void> {
		if (!observer) return
		if (!entries.some(element => element.isIntersecting)) return

		o.disconnect()
		observer.disconnect()
		observer = undefined

		const lastPage = await pages[pages.length - 1]
		if (!lastPage || lastPage.data.length !== lastPage.limit) {
			observer = o
			return
		}

		const lastItem = lastPage.data[lastPage.data.length - 1]
		if (!lastItem) {
			observer = o
			return
		}

		/** Push the next page so it can be rendered */
		const res = nextPage(lastItem)
		pages.push(res)

		// Wait for the next page to be rendered
		await res
		await tick()

		// Once the next page is rendered, reattach the observer
		console.log('reattaching the observer')
		observer = o
		o.observe(sentinel)
	}

	async function nextPage(lastItem: SortableSelection): Promise<Page<Selectable<Item>>> {
		const search = new SvelteURLSearchParams()
		search.set('direction', direction)
		search.set('id', lastItem.id)
		search.set('limit', limit.toString())
		search.set('sort', sort)

		const column = SortableColumns[toSortable(sort)]
		const cursor = nextCursor(lastItem, column)
		search.set('cursor', cursor)

		const url = resolve(`/(app)/[username]/items?${search.toString()}`, {
			username: params.username,
		})

		const res: Promise<Page<Selectable<Item>>> = fetch(url).then(res => res.json())
		return res
	}

	// svelte-ignore non_reactive_update
	let direction = getDirection(page.url)
	// svelte-ignore non_reactive_update
	let limit = getLimit(page.url)
	// svelte-ignore non_reactive_update
	let sort = getSortable(page.url)

	async function onChange() {
		if (!observer) return
		const o = observer
		observer.disconnect()
		observer = undefined

		const search = new SvelteURLSearchParams(page.url.searchParams)
		search.set('direction', direction)
		search.set('limit', limit.toString())
		search.set('sort', sort)
		search.delete('id')
		search.delete('cursor')

		const url = resolve(`/(app)/[username]/items?${search.toString()}`, {
			username: params.username,
		})
		replaceState(url, {})

		/** Insert the page so it can be rendered */
		const res = fetch(url).then(res => res.json())
		pages = [res]

		// Wait for the new page to be rendered
		await res
		await tick()

		// Once the next page is rendered, reattach the observer
		observer = o
		observer.observe(sentinel)
	}
</script>

<div class="mx-auto mt-4">
	<!-- Search bar -->
	<form method="GET" class="mb-4 flex flex-row flex-wrap items-center gap-4">
		<input
			type="text"
			placeholder={m.items_list_search()}
			class="flex-1 rounded border border-container bg-page px-3 py-2"
		/>

		<select
			name="sort"
			class="w-3xs rounded border border-container bg-page px-3 py-2"
			bind:value={sort}
			onchange={onChange}
		>
			<option value={Sortable.id}>{m.cursor_sort_id()}</option>
			<option value={Sortable.name}>{m.cursor_sort_name()}</option>
			<option value={Sortable.created} disabled>{m.cursor_sort_created()}</option>
			<option value={Sortable.updated} disabled>{m.cursor_sort_updated()}</option>
		</select>

		<select
			name="direction"
			bind:value={direction}
			class="w-3xs rounded border border-container bg-page px-3 py-2"
			onchange={onChange}
		>
			<option value={OrderByDirection.asc}>{m.cursor_direction_asc()}</option>
			<option value={OrderByDirection.desc}>{m.cursor_direction_desc()}</option>
		</select>

		<input
			type="number"
			name="limit"
			min="1"
			max="100"
			bind:value={limit}
			placeholder={m.cursor_limit()}
			class="w-3xs rounded border border-container bg-page px-3 py-2"
			onchange={onChange}
		/>

		{#if canEdit(data.profile, data.user)}
			<a
				class="rounded bg-success px-3 py-2"
				href={resolve('/(app)/[username]/items/new', { username: params.username })}
			>
				{m.items_list_new()}
			</a>
		{/if}
	</form>

	<div class="flex flex-col gap-2">
		{#each pages as page (page)}
			{#await page}
				<Spinner class="size-6" />
			{:then page}
				{#each page.data as item (item.id)}
					<ItemRow profile={data.profile} {item} />
				{/each}
			{/await}
		{/each}

		<div bind:this={sentinel} aria-hidden="true"></div>
	</div>
</div>
