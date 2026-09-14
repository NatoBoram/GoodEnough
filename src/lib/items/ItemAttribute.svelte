<script lang="ts">
	import type { Attribute, AttributeValue } from '$lib/server/db/kysely-codegen.js'
	import type { Selectable } from 'kysely'
	import ItemAttributeValue from './ItemAttributeValue.svelte'

	interface Props {
		readonly attribute: Pick<
			Selectable<Attribute & AttributeValue>,
			| 'id'
			| 'name'
			| 'summary'
			| 'type'
			| 'value_boolean'
			| 'value_date'
			| 'value_number'
			| 'value_text'
		>
		readonly format: Intl.DateTimeFormat
	}

	const { attribute, format }: Props = $props()
</script>

<div>
	<p>
		{attribute.name}: <ItemAttributeValue value={attribute} {format} />
	</p>
	<p>
		{attribute.summary}
	</p>
</div>
