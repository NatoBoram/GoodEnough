<script lang="ts">
	import type { Attribute, AttributeValue } from '$lib/server/db/kysely-codegen.js'
	import type { Selectable } from 'kysely'
	import type { Component } from 'svelte'
	import ItemAttributeBoolean from './ItemAttributeBoolean.svelte'
	import ItemAttributeDate from './ItemAttributeDate.svelte'
	import ItemAttributeNumber from './ItemAttributeNumber.svelte'
	import ItemAttributeText from './ItemAttributeText.svelte'

	interface Props {
		readonly value: Pick<
			Selectable<Attribute & AttributeValue>,
			'type' | 'value_boolean' | 'value_date' | 'value_number' | 'value_text'
		>
		readonly format: Intl.DateTimeFormat
	}

	const { value, format }: Props = $props()

	const components = {
		boolean: ItemAttributeBoolean,
		date: ItemAttributeDate,
		number: ItemAttributeNumber,
		text: ItemAttributeText,
	} as const satisfies Record<Attribute['type'], Component<Props, object, ''>>

	const Value = $derived(components[value.type])
</script>

<Value {value} {format} />
