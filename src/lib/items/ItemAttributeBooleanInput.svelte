<script lang="ts">
	import type { Attribute, AttributeValue } from '$lib/server/db/kysely-codegen.js'
	import type { Selectable } from 'kysely'

	interface Props {
		readonly value: Pick<
			Selectable<Attribute & AttributeValue>,
			'id' | 'name' | 'summary' | 'value_boolean'
		>
	}

	const { value }: Props = $props()
</script>

<div>
	<label for="attribute-{value.id}">{value.name}</label>
	<input
		type="checkbox"
		id="attribute-{value.id}"
		name="attribute-{value.id}"
		value={true}
		class="bg-container"
		checked={value.value_boolean}
	/>
	<p>{value.summary}</p>
</div>
