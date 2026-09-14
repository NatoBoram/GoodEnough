<script lang="ts">
	import type { Attribute, AttributeValue } from '$lib/server/db/kysely-codegen.js'
	import type { Selectable } from 'kysely'

	interface Props {
		readonly value: Pick<
			Selectable<Attribute & AttributeValue>,
			'id' | 'name' | 'summary' | 'value_boolean' | 'value_date' | 'value_number' | 'value_text'
		>
	}

	const { value }: Props = $props()
</script>

<div>
	<label for="attribute-{value.id}">{value.name}</label>
	<input type="text" id="attribute-{value.id}" name="attribute-{value.id}" class="bg-container" />
	<p>{value.summary}</p>
</div>
