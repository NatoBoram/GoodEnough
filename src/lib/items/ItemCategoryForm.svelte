<script lang="ts">
	import { enhance } from '$app/forms'
	import { edit } from '$lib/client/form.js'
	import { m } from '$lib/paraglide/messages.js'
	import type { Category, CategoryItem } from '$lib/server/db/kysely-codegen.js'
	import type { Selectable } from 'kysely'
	import ItemCategoryCheckbox from './ItemCategoryCheckbox.svelte'

	interface Props {
		readonly categories: Pick<Selectable<Category>, 'id' | 'name' | 'summary'>[]
		readonly assigned: Pick<Selectable<CategoryItem>, 'category'>[]
		readonly error: string | undefined
	}

	const { categories, assigned, error }: Props = $props()
</script>

{#if categories.length}
	<form method="POST" use:enhance={edit} action="?/categories" class="flex flex-col gap-4">
		<h2 id="categories" class="text-xl">{m.items_edit_categories_title()}</h2>

		{#each categories as category (category.id)}
			<ItemCategoryCheckbox {category} assigned={assigned.some(a => a.category === category.id)} />
		{/each}

		{#if error}
			<p class="text-error">{error}</p>
		{/if}

		{#if categories.length}
			<button type="submit" class="self-end rounded bg-success px-2 py-1">
				{m.form_label_submit()}
			</button>
		{/if}
	</form>
{:else}
	<p class="mx-auto text-dim italic">{m.items_edit_categories_empty()}</p>
{/if}
