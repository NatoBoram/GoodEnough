<script lang="ts">
	import { enhance } from '$app/forms'
	import { m } from '$lib/paraglide/messages.js'
	import type { ActionData } from './$types.ts'

	let { form }: { form: ActionData } = $props()
</script>

<h1>{m.auth_log_in()}</h1>

<form method="post" action="?/login" use:enhance>
	<label for="email"> {m.auth_email()} </label>
	<input type="email" name="email" />

	<label for="password"> {m.auth_password()} </label>
	<input type="password" name="password" />

	<button type="submit"> {m.auth_log_in()} </button>
</form>

{#if form?.message}
	<p class="text-red-500">{form.message}</p>
{/if}
