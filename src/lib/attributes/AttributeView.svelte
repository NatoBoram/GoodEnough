<script lang="ts">
	import { resolve } from '$app/paths'
	import { m } from '$lib/paraglide/messages.js'
	import type { Attribute, User } from '$lib/server/db/kysely-codegen.js'
	import type { Selectable } from 'kysely'
	import type { SvelteHTMLElements } from 'svelte/elements'

	interface Props {
		readonly attribute: Pick<
			Selectable<Attribute>,
			'created_at' | 'id' | 'name' | 'slug' | 'summary' | 'type' | 'updated_at'
		>
		readonly format: Intl.DateTimeFormat
		readonly profile: Pick<Selectable<User>, 'id' | 'username'>
		readonly class?: SvelteHTMLElements['main']['class']
	}

	const { attribute, format, profile, class: className }: Props = $props()
</script>

<main class="mx-auto flex flex-col gap-4 {className}">
	<div class="flex flex-row items-baseline gap-2">
		<h1 class="text-lg font-bold">{attribute.name}</h1>
		<span class="text-sm text-dim">({attribute.type})</span>
	</div>

	<p>{attribute.summary}</p>

	{#if attribute.created_at.getTime() !== attribute.updated_at.getTime()}
		<p class="text-sm text-dim italic">
			{m.attributes_view_edited({ date: format.format(attribute.updated_at) })}
		</p>
	{/if}

	<a
		href={resolve('/(app)/[username]/attributes/[slug]/edit', {
			slug: attribute.slug,
			username: profile.username,
		})}
		class="self-end rounded bg-success px-2 py-1">{m.attributes_view_edit()}</a
	>
</main>
