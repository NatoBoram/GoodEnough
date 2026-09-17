<script lang="ts">
	import { enhance } from '$app/forms'
	import { edit } from '$lib/client/form.js'
	import { maxName, maxSlug, maxSummary } from '$lib/forms.js'
	import { m } from '$lib/paraglide/messages.js'
	import type { Attribute } from '$lib/server/db/kysely-codegen.js'
	import type { Selectable } from 'kysely'

	interface Props {
		readonly attribute: Pick<Selectable<Attribute>, 'id' | 'name' | 'slug' | 'summary' | 'type'>
		readonly error: string | undefined
	}

	const { attribute, error }: Props = $props()
</script>

<form action="?" class="mx-auto flex flex-col p-4" method="POST" use:enhance={edit}>
	<h1 class="mb-1 text-xl">{m.attributes_edit_title({ name: attribute.name })}</h1>

	<!-- Name -->
	<label for="name" class="mb-1 text-sm font-semibold"> {m.form_label_name()} </label>
	<input
		id="name"
		name="name"
		type="text"
		required
		class="mb-4 bg-container"
		value={attribute.name}
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
		value={attribute.slug}
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
		value={attribute.summary}
	/>

	<!-- Type -->
	<label for="type" class="mb-1 text-sm font-semibold text-disabled">
		{m.attributes_new_type()}
	</label>
	<select id="type" name="type" class="mb-4 bg-surface text-disabled" required disabled>
		<option selected={attribute.type === 'boolean'} value="boolean">
			{m.attributes_new_type_boolean()}
		</option>
		<option selected={attribute.type === 'number'} value="number">
			{m.attributes_new_type_number()}
		</option>
		<option selected={attribute.type === 'text'} value="text">
			{m.attributes_new_type_text()}
		</option>
	</select>

	{#if error}
		<p class="text-error">{error}</p>
	{/if}

	<button type="submit" class="mb-4 self-end rounded bg-success p-2">
		{m.attributes_edit_submit()}
	</button>
</form>
