<script lang="ts">
	import { resolve } from '$app/paths'
	import { dateTimeOptions } from '$lib/date_time_format.js'
	import { m } from '$lib/paraglide/messages.js'
	import { getLocale } from '$lib/paraglide/runtime.js'
	import type { PageProps } from './$types.ts'

	const { data, params }: PageProps = $props()

	const format = Intl.DateTimeFormat(getLocale(), dateTimeOptions)
</script>

<main class="container mx-auto flex flex-col gap-4">
	<div class="flex flex-row items-baseline gap-2">
		<h1 class="text-lg font-bold">{data.attribute.name}</h1>
		<span class="text-sm text-dim">({data.attribute.type})</span>
	</div>

	<p>{data.attribute.summary}</p>

	{#if data.attribute.created_at.getTime() !== data.attribute.updated_at.getTime()}
		<p class="text-sm text-dim italic">
			{m.attributes_view_edited({ date: format.format(data.attribute.updated_at) })}
		</p>
	{/if}

	<a
		href={resolve('/(app)/[username]/attributes/[slug]/edit', {
			slug: params.slug,
			username: params.username,
		})}
		class="self-end rounded bg-success px-2 py-1">{m.attributes_view_edit()}</a
	>
</main>
