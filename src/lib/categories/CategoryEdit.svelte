<script lang="ts">
	import { enhance } from '$app/forms'
	import { maxDescription, maxName, maxSlug, maxSummary } from '$lib/forms.js'
	import { m } from '$lib/paraglide/messages.js'
	import type { Category } from '$lib/server/db/kysely-codegen.js'
	import type { Selectable } from 'kysely'

	interface Props {
		readonly category: Pick<
			Selectable<Category>,
			'description' | 'id' | 'name' | 'slug' | 'summary'
		>
		readonly error: string | undefined
	}

	const { category, error }: Props = $props()
</script>

<form action="?" class="container mx-auto flex max-w-xl flex-col p-4" method="POST" use:enhance>
	<h1 class="mb-1 text-xl">{m.categories_edit_title({ name: category.name })}</h1>

	<!-- Name -->
	<label for="name" class="mb-1 text-sm font-semibold"> {m.form_label_name()} </label>
	<input
		id="name"
		name="name"
		type="text"
		required
		class="mb-4 bg-container"
		value={category.name}
		maxlength={maxName}
		minlength={1}
	/>

	<!-- Slug -->
	<label for="slug" class="mb-1 text-sm font-semibold"> {m.form_label_slug()} </label>
	<input
		id="slug"
		name="slug"
		type="text"
		required
		class="mb-4 bg-container"
		value={category.slug}
		maxlength={maxSlug}
		minlength={1}
	/>

	<!-- Summary -->
	<label for="summary" class="mb-1 text-sm font-semibold"> {m.form_label_summary()} </label>
	<input
		id="summary"
		name="summary"
		type="text"
		class="mb-4 bg-container"
		maxlength={maxSummary}
		value={category.summary}
	/>

	<!-- Description -->
	<label for="description" class="mb-1 text-sm font-semibold">
		{m.form_label_description()}
	</label>
	<textarea
		id="description"
		name="description"
		class="mb-1 h-100 bg-container"
		value={category.description}
		maxlength={maxDescription}></textarea>
	<label for="description" class="mb-4 self-end text-xs text-dim">
		{m.form_hint_description()}
	</label>

	{#if error}
		<p class="text-error">{error}</p>
	{/if}

	<button type="submit" class="mb-4 self-end rounded bg-success p-2">
		{m.categories_edit_submit()}
	</button>
</form>
