<script lang="ts">
	import CategoryAttributeForm from '$lib/categories/CategoryAttributeForm.svelte'
	import CategoryEdit from '$lib/categories/CategoryEdit.svelte'
	import { m } from '$lib/paraglide/messages.js'
	import type { PageProps } from './$types.ts'

	const { form, data }: PageProps = $props()
</script>

<div class="mx-auto max-w-xl">
	<h1 class="mb-4 text-xl">{m.categories_edit_title({ name: data.category.name })}</h1>

	<CategoryEdit category={data.category} error={form?.message} />

	<CategoryAttributeForm
		assigned={data.attributes}
		unassigned={data.unassigned}
		error={form?.message}
		profile={data.profile}
	/>
</div>
