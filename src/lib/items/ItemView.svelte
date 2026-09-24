<script lang="ts">
	import { resolve } from '$app/paths'
	import { m } from '$lib/paraglide/messages.js'
	import type { Item, User } from '$lib/server/db/schema.js'
	import type { Selectable } from 'kysely'
	import type { SvelteHTMLElements } from 'svelte/elements'

	interface Props {
		readonly item: Pick<
			Selectable<Item>,
			'created_at' | 'id' | 'name' | 'slug' | 'summary' | 'updated_at'
		>
		readonly description: string
		readonly profile: Pick<Selectable<User>, 'id' | 'username'>
		readonly format: Intl.DateTimeFormat
		readonly class?: SvelteHTMLElements['div']['class']
	}

	const { item, description, profile, format, class: className }: Props = $props()
</script>

<div class="flex flex-col gap-4 {className}">
	<h1 class="text-lg font-bold">{item.name}</h1>

	<p class="text-sm text-dim">{item.summary}</p>

	<p class="prose text-main prose-strong:text-main">{@html description}</p>

	{#if item.created_at.getTime() !== item.updated_at.getTime()}
		<p class="text-sm text-dim italic">
			{m.items_view_edited({ date: format.format(item.updated_at) })}
		</p>
	{/if}

	<a
		href={resolve('/(app)/[username]/items/[slug]/edit', {
			slug: item.slug,
			username: profile.username,
		})}
		class="self-end rounded bg-success px-2 py-1">{m.items_view_edit()}</a
	>
</div>
