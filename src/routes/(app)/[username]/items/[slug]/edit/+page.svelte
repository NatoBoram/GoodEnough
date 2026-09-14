<script lang="ts">
	import ItemAttributeForm from '$lib/items/ItemAttributeForm.svelte'
	import ItemEdit from '$lib/items/ItemEdit.svelte'
	import type { PageProps } from './$types.ts'

	const { form, data }: PageProps = $props()
</script>

<ItemEdit item={data.item} error={form?.message} />

<ItemAttributeForm attributes={data.attributes} error={form?.message} />
