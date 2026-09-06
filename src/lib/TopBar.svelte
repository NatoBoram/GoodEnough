<script lang="ts">
	import { resolve } from '$app/paths'
	import type { ResolvedPathname } from '$app/types'
	import { Spinner } from '@natoboram/heroicons.svelte'
	import { Folder, Square2Stack, Swatch } from '@natoboram/heroicons.svelte/16/solid'
	import {
		ArrowRightEndOnRectangle,
		ArrowRightStartOnRectangle,
		BookOpen,
		Moon,
		Sun,
	} from '@natoboram/heroicons.svelte/24/solid'
	import type { Selectable } from 'kysely'
	import type { ClassValue } from 'svelte/elements'
	import { m } from './paraglide/messages.js'
	import type { User } from './server/db/kysely-codegen.ts'
	import type { Theme } from './theme.ts'

	export type TopBarUser = Pick<Selectable<User>, 'id' | 'name' | 'username'>

	interface Props {
		readonly onLogout: () => void
		readonly pathname: ResolvedPathname
		readonly profile: TopBarUser | undefined
		readonly theme: Theme | null
		readonly toggleDark: () => void
		readonly toggleLight: () => void
		readonly user: TopBarUser | undefined

		readonly class?: ClassValue | null | undefined
	}

	const {
		class: className,
		onLogout,
		pathname,
		profile,
		theme,
		toggleDark,
		toggleLight,
		user,
	}: Props = $props()

	const username = $derived(profile?.username ?? user?.username)
	const name = $derived(profile?.name ?? user?.name)
</script>

<nav class="bg-surface pt-4 text-dim {className}">
	<!-- Top -->
	<div class="flex flex-row items-center justify-between gap-4 px-4 pb-4">
		<!-- Left -->
		<div class="flex flex-row items-center gap-4 font-semibold text-main">
			<a href={resolve('/')} aria-label={m.aria_goto_home()}> <BookOpen class="size-6" /> </a>
			<a href={username ? resolve('/(app)/[username]', { username }) : resolve('/')}>
				{name || m.app_name()}
			</a>
		</div>

		<!-- Right -->
		<div class="flex flex-row items-center gap-4">
			<!-- Theme -->
			{#if theme === 'light'}
				<button onclick={toggleDark} title={m.nav_toggle_dark()}>
					<Sun class="size-6 cursor-pointer" />
				</button>
			{:else if theme === 'dark'}
				<button onclick={toggleLight} title={m.nav_toggle_light()}>
					<Moon class="size-6 cursor-pointer" />
				</button>
			{:else}
				<button title={m.nav_toggle_theme()}>
					<Spinner class="size-6" />
				</button>
			{/if}

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
		{@const isCategory = pathname.startsWith(resolve('/(app)/[username]/categories', { username }))}
		{@const isItem = pathname.startsWith(resolve('/(app)/[username]/items', { username }))}
		{@const isAttribute = pathname.startsWith(
			resolve('/(app)/[username]/attributes', { username }),
		)}

		<ul class="flex flex-row items-center gap-2 px-2">
			<li class="border-b-3 border-surface pb-1" class:border-tertiary={isCategory}>
				<a
					href={resolve('/(app)/[username]/categories', { username })}
					class:font-semibold={isCategory}
					class:text-main={isCategory}
					class="flex flex-row items-center gap-2 rounded px-3 py-1 hover:bg-container"
				>
					<Folder class="size-4" />
					{m.nav_categories()}
				</a>
			</li>
			<li class="border-b-3 border-surface pb-1" class:border-tertiary={isItem}>
				<a
					href={resolve('/(app)/[username]/items', { username })}
					class:font-semibold={isItem}
					class:text-main={isItem}
					class="flex flex-row items-center gap-2 rounded px-3 py-1 hover:bg-container"
				>
					<Square2Stack class="size-4" />
					{m.nav_items()}
				</a>
			</li>
			<li class="border-b-3 border-surface pb-1" class:border-tertiary={isAttribute}>
				<a
					href={resolve('/(app)/[username]/attributes', { username })}
					class:font-semibold={isAttribute}
					class:text-main={isAttribute}
					class="flex flex-row items-center gap-2 rounded px-3 py-1 hover:bg-container"
				>
					<Swatch class="size-4" />
					{m.nav_attributes()}
				</a>
			</li>
		</ul>
	{/if}
</nav>
