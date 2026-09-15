<script lang="ts">
	import type { Category } from '$lib/server/db/kysely-codegen.js'
	import type { Selectable } from 'kysely'

	interface Props {
		readonly category: Pick<Selectable<Category>, 'id' | 'name' | 'summary'>
		readonly assigned: boolean
	}

	const { category, assigned }: Props = $props()
</script>

<label
	for="category-{category.id}"
	class="flex cursor-pointer flex-row items-center gap-3 p-2 hover:bg-container"
>
	<input
		checked={assigned}
		class="rounded border-container bg-surface checked:bg-primary"
		id="category-{category.id}"
		name="categories"
		type="checkbox"
		value={category.id}
	/>

	<div>
		<p>{category.name}</p>
		{#if category.summary}
			<p class="text-sm text-dim">{category.summary}</p>
		{/if}
	</div>
</label>
