<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import { page } from '$app/state'
	import { authClient } from '$lib/client/auth_client.js'
	import type { User } from '$lib/server/db/kysely-codegen.js'
	import TopBar from '$lib/TopBar.svelte'
	import type { Selectable } from 'kysely'
	import type { LayoutProps } from './$types.ts'

	const { data, children }: LayoutProps = $props()

	const profile = $derived<Selectable<User> | undefined>(page.data.profile ?? data.user)
	const user = $derived<Selectable<User> | undefined>(data.user)

	async function onLogout() {
		return authClient.signOut({ fetchOptions: { onSuccess: invalidateAll } })
	}

	function toggleTheme(theme: 'dark' | 'light') {
		localStorage.setItem('theme', theme)
		switch (theme) {
			case 'light':
				document.documentElement.classList.remove('scheme-dark')
				document.documentElement.classList.add('scheme-light')
				break

			case 'dark':
			default:
				document.documentElement.classList.remove('scheme-light')
				document.documentElement.classList.add('scheme-dark')
				break
		}
	}

	function toggleDark() {
		toggleTheme('dark')
	}

	function toggleLight() {
		toggleTheme('light')
	}
</script>

<TopBar {profile} {user} {onLogout} {toggleDark} {toggleLight} />
{@render children()}
