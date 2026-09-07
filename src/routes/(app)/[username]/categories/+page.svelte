<script lang="ts">
	import { resolve } from '$app/paths'
	import { m } from '$lib/paraglide/messages.js'
	import type { PageProps } from './$types.ts'

	const { data, params }: PageProps = $props()
</script>

<div class="container mx-auto mt-4 flex flex-col gap-4">
	<!-- Search bar -->
	<form method="GET">
		<input
			type="text"
			placeholder={m.categories_list_search()}
			class="w-full rounded border border-container bg-page p-2"
		/>
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
			<p class="prose text-main">{category.description}</p>
		</div>
	{/each}
</div>
