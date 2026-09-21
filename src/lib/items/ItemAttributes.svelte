<script lang="ts">
	import ItemAttribute from '$lib/items/ItemAttribute.svelte'
	import type { Attribute, AttributeValue } from '$lib/server/db/kysely-codegen.js'
	import type { Selectable } from 'kysely'

	interface Props {
		readonly attributes: Pick<
			Selectable<Attribute & AttributeValue>,
			| 'id'
			| 'name'
			| 'summary'
			| 'type'
			| 'value_boolean'
			| 'value_date'
			| 'value_number'
			| 'value_text'
		>[]
		readonly format: Intl.DateTimeFormat
	}

	const { attributes, format }: Props = $props()
</script>

{#each attributes as attribute (attribute.id)}
	<ItemAttribute {attribute} {format} />
{/each}
