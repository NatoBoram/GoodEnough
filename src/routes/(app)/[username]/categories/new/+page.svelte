<script lang="ts">
	import { enhance } from '$app/forms'
	import { m } from '$lib/paraglide/messages.js'
	import type { ActionData } from './$types.ts'

	const { form }: { form: ActionData } = $props()
</script>

<form action="?" class="container mx-auto flex max-w-md flex-col p-4" method="POST" use:enhance>
	<h1 class="mb-1 text-xl">{m.categories_new_title()}</h1>
	<p class="mb-4 text-xs text-dim">{m.categories_new_subtitle()}</p>

	<!-- Name -->
	<label for="name" class="mb-1 text-sm font-semibold"> {m.categories_new_name()} </label>
	<input id="name" name="name" type="text" required class="mb-4 bg-container" />

	<!-- Slug -->
	<label for="slug" class="mb-1 text-sm font-semibold"> {m.categories_new_slug()} </label>
	<input id="slug" name="slug" type="text" required class="mb-4 bg-container" />

	<!-- Description -->
	<label for="description" class="mb-1 text-sm font-semibold">
		{m.categories_new_description()}
	</label>
	<textarea id="description" name="description" required class="mb-1 bg-container"></textarea>
	<label for="description" class="mb-4 self-end text-xs text-dim">
		{m.categories_new_description_hint()}
	</label>

	<button type="submit" class="mb-4 self-end rounded bg-success p-2">
		{m.categories_new_submit()}
	</button>

	{#if form?.message}
		<p class="text-error">{form.message}</p>
	{/if}
</form>
