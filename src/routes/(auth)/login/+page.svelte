<script lang="ts">
	import { enhance } from '$app/forms'
	import { m } from '$lib/paraglide/messages.js'
	import { BookOpen } from '@natoboram/heroicons.svelte/24/solid'
	import type { ActionData } from './$types.ts'

	let { form }: { form: ActionData } = $props()
</script>

<form
	action="?/login"
	class="container mx-auto flex max-w-md flex-col p-4"
	method="post"
	use:enhance
>
	<BookOpen class="size-6 self-center" />
	<h1 class="mb-4 self-center text-lg font-semibold">{m.auth_log_in()}</h1>

	<label for="email" class="mb-1 text-sm font-semibold"> {m.auth_email()} </label>
	<input type="email" name="email" class="mb-4 bg-bg-container" />

	<label for="password" class="mb-1 text-sm font-semibold"> {m.auth_password()} </label>
	<input type="password" name="password" class="mb-4 bg-bg-container" />

	<button type="submit" class="mb-4 rounded bg-nord-14 p-2">
		{m.auth_log_in()}
	</button>

	{#if form?.message}
		<p class="text-nord-11">{form.message}</p>
	{/if}
</form>
