<script lang="ts">
	import { resolve } from '$app/paths'
	import { m } from '$lib/paraglide/messages.js'
	import { getLocale } from '$lib/paraglide/runtime.js'
	import type { PageProps } from './$types.ts'

	const { data, params }: PageProps = $props()
</script>

<main class="container mx-auto flex flex-col gap-4">
	<h1 class="text-lg font-bold">{data.category.name}</h1>
	<p class="prose text-main">{data.category.description}</p>
	<p class="text-sm text-dim italic">
		{m.categories_view_edited({
			date: Intl.DateTimeFormat(getLocale(), {
				day: 'numeric',
				month: 'long',
				year: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
			}).format(data.category.updated_at),
		})}
	</p>
	<a
		href={resolve('/(app)/[username]/categories/[slug]/edit', {
			slug: params.slug,
			username: params.username,
		})}
		class="self-end rounded bg-success px-2 py-1">{m.categories_view_edit()}</a
	>
</main>
