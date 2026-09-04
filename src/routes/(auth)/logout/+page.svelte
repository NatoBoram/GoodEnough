<script lang="ts">
	import { browser } from '$app/env'
	import { goto } from '$app/navigation'
	import { resolve } from '$app/paths'
	import { authClient } from '$lib/client/auth_client.js'
	import { onMount } from 'svelte'

	onMount(async () => {
		if (!browser) return
		await authClient.signOut({ fetchOptions: { onSuccess: async () => goto(resolve('/')) } })
	})
</script>

Logging out...
