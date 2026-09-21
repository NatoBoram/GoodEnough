<script lang="ts">
	import type { Attribute, AttributeValue } from '$lib/server/db/kysely-codegen.js'
	import type { Selectable } from 'kysely'
	import type { SvelteHTMLElements } from 'svelte/elements'
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
		readonly class: SvelteHTMLElements['div']['class']
	}

	const { attribute, format, class: className }: Props = $props()
</script>

<div class="rounded bg-surface p-4 {className}">
	<div class="flex flex-row items-center justify-between">
		<p class="font-semibold">{attribute.name}</p>
		<ItemAttributeValue value={attribute} {format} />
	</div>
	<p>
		{attribute.summary}
	</p>
</div>
