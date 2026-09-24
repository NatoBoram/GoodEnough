<script lang="ts">
	import { resolve } from '$app/paths'
	import type { Category, User } from '$lib/server/db/schema.js'
	import type { Selectable } from 'kysely'

	interface Props {
		readonly category: Pick<Selectable<Category>, 'id' | 'name' | 'slug' | 'summary'>
		readonly profile: Pick<Selectable<User>, 'id' | 'username'>
	}

	const { category, profile }: Props = $props()
</script>

<div class="rounded bg-surface p-4">
	<a
		href={resolve('/(app)/[username]/categories/[slug]', {
			slug: category.slug,
			username: profile.username,
		})}
	>
		<h2 class="font-semibold">{category.name}</h2>
	</a>
	<p class="prose text-main">{category.summary}</p>
</div>
