<script lang="ts">
	import type { Attribute, AttributeValue } from '$lib/server/db/kysely-codegen.js'
	import type { Selectable } from 'kysely'

	interface Props {
		readonly value: Pick<
			Selectable<Attribute & AttributeValue>,
			'id' | 'name' | 'summary' | 'value_date'
		>
	}

	const { value }: Props = $props()
</script>

<div>
	<label for="attribute-{value.id}">{value.name}</label>
	<input
		type="date"
		id="attribute-{value.id}"
		name="attribute-{value.id}"
		value={value.value_date instanceof Date ? value.value_date.toISOString().slice(0, 10) : ''}
		class="bg-container"
	/>
	<p>{value.summary}</p>
</div>
