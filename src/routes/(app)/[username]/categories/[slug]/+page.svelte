<script lang="ts">
	import CategoryAttributes from '$lib/categories/CategoryAttributes.svelte'
	import CategoryItems from '$lib/categories/CategoryItems.svelte'
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
		class="mt-4"
		description={data.description}
		profile={data.profile}
		user={data.user}
	/>

	<CategoryAttributes
		attributes={data.attributes}
		category={data.category}
		class="mt-4"
		profile={data.profile}
	/>

	<CategoryItems items={data.items} profile={data.profile} class="mt-4" />
</main>
