<script lang="ts">
	import AttributeEdit from '$lib/attributes/AttributeEdit.svelte'
	import type { PageProps } from './$types.ts'

	const { form, data }: PageProps = $props()
</script>

<AttributeEdit attribute={data.attribute} error={form?.message} />
