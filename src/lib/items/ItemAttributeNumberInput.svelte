<script lang="ts">
	import type { Attribute, AttributeValue } from '$lib/server/db/schema.js'
	import type { Selectable } from 'kysely'

	interface Props {
		readonly value: Pick<
			Selectable<Attribute & AttributeValue>,
			'id' | 'name' | 'summary' | 'value_number'
		>
	}

	const { value }: Props = $props()
</script>

<div class="flex flex-row items-center justify-between">
	<div>
		<label for="attribute-{value.id}" class="font-semibold">{value.name}</label>
		<p class="text-sm text-dim">{value.summary}</p>
	</div>
	<input
		id="attribute-{value.id}"
		name="attribute-{value.id}"
		value={value.value_number}
		type="number"
		class="w-3xs bg-container"
		placeholder={value.name}
	/>
</div>
