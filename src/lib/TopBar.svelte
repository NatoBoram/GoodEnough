<script lang="ts">
	import { resolve } from '$app/paths'
	import { page } from '$app/state'
	import {
		ArrowRightEndOnRectangle,
		ArrowRightStartOnRectangle,
		BookOpen,
	} from '@natoboram/heroicons.svelte/24/solid'
	import type { Selectable } from 'kysely'
	import { m } from './paraglide/messages.js'
	import type { User } from './server/db/kysely-codegen.ts'

	export type TopBarUser = Pick<Selectable<User>, 'id' | 'name' | 'username'>

	interface Props {
		readonly profile: TopBarUser | undefined
		readonly user: TopBarUser | undefined
		readonly onLogout?: () => void
	}

	const { profile, user, onLogout }: Props = $props()

	const pathname = $derived(page.url.pathname)
	const username = $derived(profile?.username ?? user?.username)
	const name = $derived(profile?.name ?? user?.name)
</script>

<nav>
	<!-- Icons -->
	<div class="flex flex-row items-center justify-between gap-4 p-4">
		<div class="flex flex-row items-center gap-4">
			<a href={resolve('/')}> <BookOpen class="size-6" /> </a>
			{name || m.app_name()}
		</div>

		<div class="flex flex-row items-center gap-4">
			<!-- Log out -->
			{#if user}
				<button onclick={onLogout} title={m.auth_log_out()}>
					<ArrowRightStartOnRectangle class="size-6 cursor-pointer" />
				</button>
			{/if}

			<!-- Log in -->
			{#if !user}
				<a href={resolve('/login')} title={m.auth_log_in()}>
					<ArrowRightEndOnRectangle class="size-6" />
				</a>
			{/if}
		</div>
	</div>

	<!-- Tabs -->
	{#if username}
		<ul class="flex flex-row items-center gap-4 p-4">
			<li>
				<a
					href={resolve('/(app)/[username]/categories', { username })}
					class:font-semibold={pathname === resolve('/(app)/[username]/categories', { username })}
				>
					{m.nav_categories()}
				</a>
			</li>
			<li>
				<a
					href={resolve('/(app)/[username]/items', { username })}
					class:font-semibold={pathname === resolve('/(app)/[username]/items', { username })}
				>
					{m.nav_items()}
				</a>
			</li>
			<li>
				<a
					href={resolve('/(app)/[username]/attributes', { username })}
					class:font-semibold={pathname === resolve('/(app)/[username]/attributes', { username })}
				>
					{m.nav_attributes()}
				</a>
			</li>
		</ul>
	{/if}
</nav>
