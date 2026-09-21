<script lang="ts">
	import AttributeView from '$lib/attributes/AttributeView.svelte'
	import { dateTimeOptions } from '$lib/date_time_format.js'
	import { getLocale } from '$lib/paraglide/runtime.js'
	import type { PageProps } from './$types.ts'

	const { data }: PageProps = $props()

	const format = Intl.DateTimeFormat(getLocale(), dateTimeOptions)
</script>

<AttributeView class="mt-4" attribute={data.attribute} {format} profile={data.profile} />
