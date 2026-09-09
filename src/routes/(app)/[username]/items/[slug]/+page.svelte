<script lang="ts">
	import { resolve } from '$app/paths'
	import { m } from '$lib/paraglide/messages.js'
	import { getLocale } from '$lib/paraglide/runtime.js'
	import type { PageProps } from './$types.ts'

	const { data, params }: PageProps = $props()

	const format = Intl.DateTimeFormat(getLocale(), {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	})
</script>

<main class="container mx-auto flex flex-col gap-4">
	<h1 class="text-lg font-bold">{data.item.name}</h1>

	<p>{data.item.summary}</p>

	<p class="prose text-main prose-strong:text-main">{@html data.description}</p>

	{#if data.item.created_at.getTime() !== data.item.updated_at.getTime()}
		<p class="text-sm text-dim italic">
			{m.items_view_edited({ date: format.format(data.item.updated_at) })}
		</p>
	{/if}

	<a
		href={resolve('/(app)/[username]/items/[slug]/edit', {
			slug: params.slug,
			username: params.username,
		})}
		class="self-end rounded bg-success px-2 py-1">{m.items_view_edit()}</a
	>
</main>
