<script lang="ts">
	import { enhance } from '$app/forms'
	import type { ActionData } from './$types.ts'

	let { form }: { form: ActionData } = $props()
</script>

<h1>Sign up</h1>

<form method="POST" action="?/signup" use:enhance>
	<label for="name"> Name </label>
	<input type="text" name="name" required />

	<label for="email"> Email </label>
	<input type="email" name="email" required />

	<label for="username"> Username </label>
	<input type="text" name="username" required />

	<label for="password"> Password </label>
	<input type="password" name="password" required />

	<button type="submit">Sign up</button>
</form>

<p class="text-red-500">{form?.message ?? ''}</p>
