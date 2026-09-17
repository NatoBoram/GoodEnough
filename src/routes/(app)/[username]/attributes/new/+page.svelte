<script lang="ts">
	import AttributeNew from '$lib/attributes/AttributeNew.svelte'
	import type { ActionData } from './$types.ts'

	const { form }: { form: ActionData } = $props()
</script>

<AttributeNew error={form?.message} />
