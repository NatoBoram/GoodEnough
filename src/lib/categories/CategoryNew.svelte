<script lang="ts">
	import { enhance } from '$app/forms'
	import { maxName, maxSlug, maxSummary } from '$lib/forms.js'
	import { m } from '$lib/paraglide/messages.js'

	interface Props {
		readonly error: string | undefined
	}
	const { error }: Props = $props()
</script>

<form action="?" class="mx-auto flex max-w-md flex-col p-4" method="POST" use:enhance>
	<h1 class="mb-1 text-xl">{m.categories_new_title()}</h1>
	<p class="mb-4 text-xs text-dim">{m.categories_new_subtitle()}</p>

	<!-- Name -->
	<label for="name" class="mb-1 text-sm font-semibold"> {m.form_label_name()} </label>
	<input
		id="name"
		name="name"
		type="text"
		required
		class="mb-4 bg-container"
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
		maxlength={maxSlug}
		minlength={1}
	/>

	<!-- Summary -->
	<label for="summary" class="mb-1 text-sm font-semibold"> {m.form_label_summary()} </label>
	<input id="summary" name="summary" type="text" class="mb-4 bg-container" maxlength={maxSummary} />

	{#if error}
		<p class="text-error">{error}</p>
	{/if}

	<button type="submit" class="mb-4 self-end rounded bg-success p-2">
		{m.categories_new_submit()}
	</button>
</form>
