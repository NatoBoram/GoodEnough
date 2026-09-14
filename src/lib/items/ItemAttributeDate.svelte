<script lang="ts">
	import type { Attribute, AttributeValue } from '$lib/server/db/kysely-codegen.js'
	import type { Selectable } from 'kysely'

	interface Props {
		readonly value: Pick<Selectable<Attribute & AttributeValue>, 'value_date'>
		readonly format: Intl.DateTimeFormat
	}

	const { value, format }: Props = $props()
</script>

{#if value.value_date}
	{format.format(value.value_date)}
{/if}
