<script lang="ts">
	import type { Attribute, AttributeValue } from '$lib/server/db/kysely-codegen.js'
	import type { Selectable } from 'kysely'
	import type { Component } from 'svelte'
	import ItemAttributeBooleanInput from './ItemAttributeBooleanInput.svelte'
	import ItemAttributeDateInput from './ItemAttributeDateInput.svelte'
	import ItemAttributeNumberInput from './ItemAttributeNumberInput.svelte'
	import ItemAttributeTextInput from './ItemAttributeTextInput.svelte'

	interface Props {
		readonly value: Pick<
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
	}

	const { value }: Props = $props()

	const components = {
		boolean: ItemAttributeBooleanInput,
		date: ItemAttributeDateInput,
		number: ItemAttributeNumberInput,
		text: ItemAttributeTextInput,
	} as const satisfies Record<Attribute['type'], Component<Props, object, ''>>

	const Value = $derived(components[value.type])
</script>

<Value {value} />
