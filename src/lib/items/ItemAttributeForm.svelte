<script lang="ts">
	import { m } from '$lib/paraglide/messages.js'
	import type { Attribute, AttributeValue } from '$lib/server/db/kysely-codegen.js'
	import type { Selectable } from 'kysely'
	import ItemAttributeValueInput from './ItemAttributeValueInput.svelte'

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
		readonly error: string | undefined
	}

	const { attributes, error }: Props = $props()
</script>

<form method="GET" action="?/attributes">
	{#each attributes as attribute (attribute.id)}
		<ItemAttributeValueInput value={attribute} />
	{/each}
	{#if error}
		<p class="error">{error}</p>
	{/if}

	<button type="submit" class="self-end rounded bg-success px-2 py-1">
		{m.form_label_submit()}
	</button>
</form>
