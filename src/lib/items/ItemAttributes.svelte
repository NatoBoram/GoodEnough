<script lang="ts">
	import ItemAttribute from '$lib/items/ItemAttribute.svelte'
	import type { Attribute, AttributeValue } from '$lib/server/db/schema.js'
	import type { Selectable } from 'kysely'
	import type { SvelteHTMLElements } from 'svelte/elements'

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
		readonly class?: SvelteHTMLElements['div']['class']
	}

	const { attributes, format, class: className }: Props = $props()
</script>

<div class="grid gap-2 sm:grid-cols-2 {className}">
	{#each attributes as attribute (attribute.id)}
		<ItemAttribute {attribute} {format} />
	{/each}
</div>
