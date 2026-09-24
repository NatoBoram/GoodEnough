<script lang="ts">
	import { replaceState } from '$app/navigation'
	import { resolve } from '$app/paths'
	import { page } from '$app/state'
	import AttributeRow from '$lib/attributes/AttributeRow.svelte'
	import { canEdit } from '$lib/auth/authorization.js'
	import { nextCursor } from '$lib/cursor/cursor.js'
	import CursorForm from '$lib/cursor/CursorForm.svelte'
	import InfiniteScroll from '$lib/cursor/InfiniteScroll.svelte'
	import { getLimit } from '$lib/cursor/limit.js'
	import type { Page } from '$lib/cursor/page.js'
	import type { SortableSelection } from '$lib/cursor/sort.js'
	import { getDirection, getSortable, SortableColumns, toSortable } from '$lib/cursor/sort.js'
	import { m } from '$lib/paraglide/messages.js'
	import type { Attribute } from '$lib/server/db/schema.js'
	import type { Selectable } from 'kysely'
	import { SvelteURLSearchParams } from 'svelte/reactivity'
	import type { PageProps } from './$types.ts'

	const { data, params }: PageProps = $props()

	// svelte-ignore state_referenced_locally
	let initialPage = $state(data.page)

	async function nextPage(lastAttribute: SortableSelection): Promise<Page<Selectable<Attribute>>> {
		const search = new SvelteURLSearchParams()
		search.set('direction', direction)
		search.set('id', lastAttribute.id)
		search.set('limit', limit.toString())
		search.set('sort', sort)

		const column = SortableColumns[toSortable(sort)]
		const cursor = nextCursor(lastAttribute, column)
		search.set('cursor', cursor)

		const url = resolve(`/(app)/[username]/attributes?${search.toString()}`, {
			username: params.username,
		})

		const res: Promise<Page<Selectable<Attribute>>> = fetch(url).then(res => res.json())
		return res
	}

	// svelte-ignore non_reactive_update
	let direction = getDirection(page.url)
	// svelte-ignore non_reactive_update
	let limit = getLimit(page.url)
	// svelte-ignore non_reactive_update
	let sort = getSortable(page.url)

	function onChange() {
		const search = new SvelteURLSearchParams(page.url.searchParams)
		search.set('direction', direction)
		search.set('limit', limit.toString())
		search.set('sort', sort)
		search.delete('id')
		search.delete('cursor')

		const url = resolve(`/(app)/[username]/attributes?${search.toString()}`, {
			username: params.username,
		})
		replaceState(url, {})
		initialPage = fetch(url).then(res => res.json())
	}
</script>

<div class="mx-auto mt-4 flex flex-col gap-4">
	<CursorForm
		placeholder={m.attributes_list_search()}
		bind:sort
		bind:direction
		bind:limit
		onchange={onChange}
	>
		{#snippet actions()}
			{#if canEdit(data.profile, data.user)}
				<a
					class="rounded bg-success px-3 py-2"
					href={resolve('/(app)/[username]/attributes/new', { username: params.username })}
				>
					{m.attributes_list_new()}
				</a>
			{/if}
		{/snippet}
	</CursorForm>

	{#key initialPage}
		<InfiniteScroll {initialPage} loadNext={nextPage}>
			{#snippet row(attribute)}
				<AttributeRow {attribute} profile={data.profile} />
			{/snippet}
		</InfiniteScroll>
	{/key}
</div>
