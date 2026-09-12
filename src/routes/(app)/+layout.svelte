<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import { page } from '$app/state'
	import { authClient } from '$lib/client/auth_client.js'
	import type { User } from '$lib/server/db/kysely-codegen.js'
	import type { Theme } from '$lib/theme.js'
	import { applyTheme, toTheme } from '$lib/theme.js'
	import TopBar from '$lib/TopBar.svelte'
	import type { Selectable } from 'kysely'
	import { onMount } from 'svelte'
	import type { LayoutProps } from './$types.ts'

	const { data, children }: LayoutProps = $props()

	const pathname = $derived(page.url.pathname)
	const profile = $derived<Selectable<User> | undefined>(page.data.profile ?? data.user)
	const user = $derived<Selectable<User> | undefined>(data.user)

	let theme: Theme | null = $state(null)

	onMount(() => (theme = toTheme(localStorage.getItem('theme'))))

	async function onLogout() {
		return authClient.signOut({ fetchOptions: { onSuccess: invalidateAll } })
	}

	function toggleTheme(next: Theme) {
		applyTheme(next)
		theme = next
	}

	function toggleDark() {
		toggleTheme('dark')
	}

	function toggleLight() {
		toggleTheme('light')
	}
</script>

<TopBar {onLogout} {pathname} {profile} {theme} {toggleDark} {toggleLight} {user} />
<div class="container mx-auto mb-4">{@render children()}</div>
