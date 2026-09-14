<script lang="ts">
	import { m } from '$lib/paraglide/messages.js'
	import type { Attribute, AttributeValue } from '$lib/server/db/kysely-codegen.js'
	import type { Selectable } from 'kysely'

	interface Props {
		readonly value: Pick<Selectable<Attribute & AttributeValue>, 'value_boolean'>
	}

	const { value }: Props = $props()
</script>

{#if value.value_boolean}
	{m.item_attribute_true()}
{:else}
	{m.item_attribute_false()}
{/if}
