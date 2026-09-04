<script lang="ts">
	import { enhance } from '$app/forms'
	import type { ActionData } from './$types.ts'

	let { form }: { form: ActionData } = $props()
</script>

<h1>Login</h1>

<form method="post" action="?/login" use:enhance>
	<label for="email"> Email </label>
	<input type="email" name="email" />

	<label for="password"> Password </label>
	<input type="password" name="password" />

	<button type="submit"> Login </button>
</form>

<p class="text-red-500">{form?.message ?? ''}</p>
