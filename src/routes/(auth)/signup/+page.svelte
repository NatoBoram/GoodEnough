<script lang="ts">
	import { enhance } from '$app/forms'
	import { m } from '$lib/paraglide/messages.js'
	import { BookOpen } from '@natoboram/heroicons.svelte/24/solid'
	import type { ActionData } from './$types.ts'

	let { form }: { form: ActionData } = $props()
</script>

<form
	method="POST"
	action="?/signup"
	use:enhance
	class="container mx-auto flex max-w-md flex-col p-4"
>
	<BookOpen class="size-6 self-center" />
	<h1 class="mb-4 self-center text-lg font-semibold">{m.auth_sign_up()}</h1>

	<label for="name" class="mb-1 text-sm font-semibold"> {m.auth_name()} </label>
	<input type="text" name="name" required class="mb-4 bg-container" />

	<label for="email" class="mb-1 text-sm font-semibold"> {m.auth_email()} </label>
	<input type="email" name="email" required class="mb-4 bg-container" />

	<label for="username" class="mb-1 text-sm font-semibold"> {m.auth_username()} </label>
	<input type="text" name="username" required class="mb-4 bg-container" />

	<label for="password" class="mb-1 text-sm font-semibold"> {m.auth_password()} </label>
	<input type="password" name="password" required class="mb-4 bg-container" />

	<button type="submit" class="mb-4 rounded bg-success p-2">{m.auth_sign_up()}</button>

	{#if form?.message}
		<p class="text-error">{form.message}</p>
	{/if}
</form>
