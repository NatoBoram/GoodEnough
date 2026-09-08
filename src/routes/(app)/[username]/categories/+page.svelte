<script lang="ts">
	import { resolve } from '$app/paths'
	import { m } from '$lib/paraglide/messages.js'
	import type { PageProps } from './$types.ts'

	const { data, params }: PageProps = $props()
</script>

<div class="container mx-auto mt-4 flex flex-col gap-4">
	<!-- Search bar -->
	<form method="GET" class="flex flex-row items-center gap-4">
		<input
			type="text"
			placeholder={m.categories_list_search()}
			class="flex-1 rounded border border-container bg-page px-3 py-2"
		/>
		{#if data.profile.id === data.user?.id}
			<a
				class="rounded bg-success px-3 py-2"
				href={resolve('/(app)/[username]/categories/new', { username: params.username })}
			>
				{m.categories_list_new()}
			</a>
		{/if}
	</form>

	{#each data.categories as category (category.id)}
		<div class="rounded bg-surface p-4">
			<a
				href={resolve('/(app)/[username]/categories/[slug]', {
					slug: category.slug,
					username: params.username,
				})}
			>
				<h2 class="font-semibold">{category.name}</h2>
			</a>
			<p class="prose text-main">{category.summary}</p>
		</div>
	{/each}
</div>
