<script lang="ts">
	import ItemNew from '$lib/items/ItemNew.svelte'
	import type { ActionData } from './$types.ts'

	const { form }: { form: ActionData } = $props()
</script>

<ItemNew error={form?.message} />
