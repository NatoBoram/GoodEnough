<script lang="ts">
	import CategoryNew from '$lib/categories/CategoryNew.svelte'
	import type { ActionData } from './$types.ts'

	const { form }: { form: ActionData } = $props()
</script>

<CategoryNew error={form?.message} />
