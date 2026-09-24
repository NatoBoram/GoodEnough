<script lang="ts">
	import type { Attribute } from '$lib/server/db/schema.js'
	import type { Selectable } from 'kysely'

	interface Props {
		readonly attribute: Pick<Selectable<Attribute>, 'id' | 'name' | 'summary' | 'type'>
	}
	const { attribute }: Props = $props()
</script>

<div class="rounded bg-surface p-4 shadow-sm">
	<div class="flex flex-row items-baseline gap-2">
		<h2 class="font-semibold">{attribute.name}</h2>
		<span class="rounded-full bg-container px-2 py-1 text-xs text-dim">
			{attribute.type}
		</span>
	</div>

	{#if attribute.summary}
		<p class="text-dim">{attribute.summary}</p>
	{/if}
</div>
