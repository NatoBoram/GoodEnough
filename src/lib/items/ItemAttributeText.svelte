<script lang="ts">
	import type { Attribute, AttributeValue } from '$lib/server/db/schema.js'
	import type { Selectable } from 'kysely'

	interface Props {
		readonly value: Pick<Selectable<Attribute & AttributeValue>, 'value_text'>
	}

	const { value }: Props = $props()
</script>

{value.value_text}
