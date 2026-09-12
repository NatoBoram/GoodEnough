<script lang="ts">
	import type { Attribute } from '$lib/server/db/kysely-codegen.js'
	import type { Selectable } from 'kysely'

	interface Props {
		readonly attribute: Pick<Selectable<Attribute>, 'id' | 'name' | 'summary' | 'type'>
		readonly assigned: boolean
	}

	const { attribute, assigned }: Props = $props()
</script>

<label
	for="attribute-{attribute.id}"
	class="flex cursor-pointer flex-row items-center gap-3 p-2 hover:bg-container"
>
	<input
		checked={assigned}
		class="rounded border-container bg-surface checked:bg-primary"
		id="attribute-{attribute.id}"
		name="attributes"
		type="checkbox"
		value={attribute.id}
	/>

	<div>
		{attribute.name} <span class="text-sm text-dim"> ({attribute.type}) </span>
		{#if attribute.summary}
			<p class="text-sm text-dim">{attribute.summary}</p>
		{/if}
	</div>
</label>
