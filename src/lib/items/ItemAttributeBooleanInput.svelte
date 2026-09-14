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

<div class="flex flex-row items-center justify-between">
	<div>
		<label for="attribute-{value.id}" class="font-semibold">{value.name}</label>
		<p class="text-sm text-dim">{value.summary}</p>
	</div>
	<input
		type="checkbox"
		id="attribute-{value.id}"
		name="attribute-{value.id}"
		value={true}
		class="bg-surface checked:bg-container"
		checked={value.value_boolean}
		placeholder={value.name}
	/>
</div>
