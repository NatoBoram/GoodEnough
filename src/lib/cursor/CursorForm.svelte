<script lang="ts">
	import { OrderByDirection, Sortable } from '$lib/cursor/sort.js'
	import { m } from '$lib/paraglide/messages.js'
	import type { Snippet } from 'svelte'
	import type { ClassValue } from 'svelte/elements'

	interface Props {
		readonly actions: Snippet
		readonly class?: ClassValue
		readonly direction?: OrderByDirection
		readonly limit?: number
		readonly onchange: () => Promise<void> | void
		readonly placeholder: string
		readonly sort?: Sortable
	}

	let {
		actions,
		class: className,
		direction = $bindable(),
		limit = $bindable(),
		onchange,
		placeholder,
		sort = $bindable(),
	}: Props = $props()
</script>

<form method="GET" action="?" class="flex flex-row flex-wrap items-center gap-4 {className}">
	<input
		type="text"
		{placeholder}
		class="flex-1 rounded border border-container bg-page px-3 py-2"
	/>

	{#if sort !== undefined}
		<select
			name="sort"
			class="w-3xs rounded border border-container bg-page px-3 py-2"
			bind:value={sort}
			{onchange}
		>
			<option value={Sortable.id}>{m.cursor_sort_id()}</option>
			<option value={Sortable.name}>{m.cursor_sort_name()}</option>
			<option value={Sortable.created} disabled>{m.cursor_sort_created()}</option>
			<option value={Sortable.updated} disabled>{m.cursor_sort_updated()}</option>
		</select>
	{/if}

	{#if direction !== undefined}
		<select
			name="direction"
			bind:value={direction}
			class="w-3xs rounded border border-container bg-page px-3 py-2"
			{onchange}
		>
			<option value={OrderByDirection.asc}>{m.cursor_direction_asc()}</option>
			<option value={OrderByDirection.desc}>{m.cursor_direction_desc()}</option>
		</select>
	{/if}

	{#if limit !== undefined}
		<input
			type="number"
			name="limit"
			min="1"
			max="100"
			bind:value={limit}
			placeholder={m.cursor_limit()}
			class="w-3xs rounded border border-container bg-page px-3 py-2"
			{onchange}
		/>
	{/if}

	{@render actions()}
</form>
