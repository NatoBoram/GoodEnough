<script lang="ts">
	import { resolve } from '$app/paths'
	import type { Item, User } from '$lib/server/db/kysely-codegen.js'
	import type { Selectable } from 'kysely'

	interface Props {
		readonly item: Pick<Selectable<Item>, 'id' | 'name' | 'slug' | 'summary'>
		readonly profile: Pick<Selectable<User>, 'id' | 'username'>
	}

	const { item, profile }: Props = $props()
</script>

<div class="rounded bg-surface p-4">
	<a
		href={resolve('/(app)/[username]/items/[slug]', {
			slug: item.slug,
			username: profile.username,
		})}
	>
		<h2 class="font-semibold">{item.name}</h2>
	</a>
	<p class="text-dim">{item.summary}</p>
</div>
