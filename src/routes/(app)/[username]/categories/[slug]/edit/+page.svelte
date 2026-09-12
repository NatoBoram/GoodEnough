<script lang="ts">
	import CategoryEdit from '$lib/categories/CategoryEdit.svelte'
	import type { PageProps } from './$types.ts'

	const { form, data }: PageProps = $props()
</script>

<CategoryEdit category={data.category} error={form?.message} />
