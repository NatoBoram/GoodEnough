<script lang="ts">
	import { enhance } from '$app/forms'
	import { m } from '$lib/paraglide/messages.js'
	import type { ActionData } from './$types.ts'

	let { form }: { form: ActionData } = $props()
</script>

<h1>{m.auth_sign_up()}</h1>

<form method="POST" action="?/signup" use:enhance>
	<label for="name"> {m.auth_name()} </label>
	<input type="text" name="name" required />

	<label for="email"> {m.auth_email()} </label>
	<input type="email" name="email" required />

	<label for="username"> {m.auth_username()} </label>
	<input type="text" name="username" required />

	<label for="password"> {m.auth_password()} </label>
	<input type="password" name="password" required />

	<button type="submit">{m.auth_sign_up()}</button>
</form>

{#if form?.message}
	<p class="text-red-500">{form.message}</p>
{/if}
