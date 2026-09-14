<script lang="ts">
	import { dateOptions } from '$lib/date_time_format.js'
	import ItemAttribute from '$lib/items/ItemAttribute.svelte'
	import ItemView from '$lib/items/ItemView.svelte'
	import { getLocale } from '$lib/paraglide/runtime.js'
	import type { PageProps } from './$types.ts'

	const { data }: PageProps = $props()

	const format = Intl.DateTimeFormat(getLocale(), dateOptions)
</script>

<ItemView item={data.item} description={data.description} profile={data.profile} {format} />

{#each data.attributes as attribute (attribute.id)}
	<ItemAttribute {attribute} {format} />
{/each}
