<script lang="ts">
	import type { Item, User } from '$lib/server/db/kysely-codegen.js'
	import type { Selectable } from 'kysely'
	import type { SvelteHTMLElements } from 'svelte/elements'
	import CategoryItem from './CategoryItem.svelte'

	interface Props {
		readonly items: Pick<Selectable<Item>, 'id' | 'name' | 'slug' | 'summary'>[]
		readonly profile: Pick<Selectable<User>, 'id' | 'username'>
		readonly class?: SvelteHTMLElements['div']['class']
	}
	const { items, profile, class: className }: Props = $props()
</script>

<div class={className}>
	{#each items as item (item.id)}
		<CategoryItem {item} {profile} />
	{/each}
</div>
