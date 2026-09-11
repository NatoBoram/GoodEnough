<script lang="ts">
	import type { Attribute } from '$lib/server/db/kysely-codegen.js'
	import type { Selectable } from 'kysely'

	interface Props {
		readonly attribute: Pick<Selectable<Attribute>, 'id' | 'name' | 'summary' | 'type'>
	}
	const { attribute }: Props = $props()
</script>

<div>
	{attribute.name} <span class="text-sm text-dim">({attribute.type})</span>
	<p>{attribute.summary}</p>
</div>
