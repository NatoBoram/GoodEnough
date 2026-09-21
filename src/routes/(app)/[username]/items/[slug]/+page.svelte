<script lang="ts">
	import { dateOptions } from '$lib/date_time_format.js'
	import ItemAttributes from '$lib/items/ItemAttributes.svelte'
	import ItemView from '$lib/items/ItemView.svelte'
	import { getLocale } from '$lib/paraglide/runtime.js'
	import type { PageProps } from './$types.ts'

	const { data }: PageProps = $props()

	const format = Intl.DateTimeFormat(getLocale(), dateOptions)
</script>

<ItemView item={data.item} description={data.description} profile={data.profile} {format} />

<ItemAttributes class="mt-4" attributes={data.attributes} {format} />
