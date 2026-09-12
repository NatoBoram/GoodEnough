<script lang="ts">
	import CategoryAttribute from '$lib/categories/CategoryAttribute.svelte'
	import CategoryItem from '$lib/categories/CategoryItem.svelte'
	import CategoryView from '$lib/categories/CategoryView.svelte'
	import { dateTimeOptions } from '$lib/date_time_format.js'
	import { getLocale } from '$lib/paraglide/runtime.js'
	import type { PageProps } from './$types.ts'

	const { data }: PageProps = $props()

	const format = Intl.DateTimeFormat(getLocale(), dateTimeOptions)
</script>

<main class="mx-auto">
	<CategoryView
		{format}
		category={data.category}
		description={data.description}
		profile={data.profile}
		user={data.user}
	/>

	{#each data.attributes as attribute (attribute.id)}
		<CategoryAttribute {attribute}></CategoryAttribute>
	{/each}

	<!-- Property 'items' does not exist -->
	{#each data.items as item (item.id)}
		<CategoryItem {item} profile={data.profile}></CategoryItem>
	{/each}
</main>
