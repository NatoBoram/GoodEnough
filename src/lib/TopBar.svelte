<script lang="ts">
	import { enhance } from '$app/forms'
	import { resolve } from '$app/paths'
	import {
		ArrowRightEndOnRectangle,
		ArrowRightStartOnRectangle,
		BookOpen,
	} from '@natoboram/heroicons.svelte/24/solid'
	import type { Selectable } from 'kysely'
	import { m } from './paraglide/messages.js'
	import type { User } from './server/db/kysely-codegen.ts'

	interface Props {
		readonly profile: Selectable<User> | undefined
		readonly user: Selectable<User> | undefined
	}

	const { profile, user }: Props = $props()
</script>

<nav class="flex flex-row items-center justify-between gap-4 p-4">
	<div class="flex flex-row items-center gap-4">
		<BookOpen class="size-6" />
		{profile?.name || m.app_name()}
	</div>

	<div class="flex flex-row items-center gap-4">
		{#if user}
			<form method="post" action={resolve('/logout')} use:enhance>
				<button type="submit" title={m.auth_log_out()}>
					<ArrowRightStartOnRectangle class="size-6" />
				</button>
			</form>
		{/if}

		{#if !user}
			<a href={resolve('/login')} title={m.auth_log_in()}>
				<ArrowRightEndOnRectangle class="size-6" />
			</a>
		{/if}
	</div>
</nav>
