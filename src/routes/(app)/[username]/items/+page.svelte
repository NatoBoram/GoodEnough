<script lang="ts">
	import { resolve } from '$app/paths'
	import { canEdit } from '$lib/auth/authorization.js'
	import { m } from '$lib/paraglide/messages.js'
	import type { PageProps } from './$types.ts'

	const { data, params }: PageProps = $props()
</script>

<div class="mx-auto mt-4 flex flex-col gap-4">
	<!-- Search bar -->
	<form method="GET" class="flex flex-row items-center gap-4">
		<input
			type="text"
			placeholder={m.items_list_search()}
			class="flex-1 rounded border border-container bg-page px-3 py-2"
		/>
		{#if canEdit(data.profile, data.user)}
			<a
				class="rounded bg-success px-3 py-2"
				href={resolve('/(app)/[username]/items/new', { username: params.username })}
			>
				{m.items_list_new()}
			</a>
		{/if}
	</form>

	{#each data.items as item (item.id)}
		<div class="rounded bg-surface p-4">
			<a
				href={resolve('/(app)/[username]/items/[slug]', {
					slug: item.slug,
					username: params.username,
				})}
			>
				<h2 class="font-semibold">{item.name}</h2>
			</a>
			<p class="prose text-main">{item.summary}</p>
		</div>
	{/each}
</div>
