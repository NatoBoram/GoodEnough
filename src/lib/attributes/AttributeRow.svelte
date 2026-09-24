<script lang="ts">
	import { resolve } from '$app/paths'
	import type { Attribute, User } from '$lib/server/db/schema.js'
	import type { Selectable } from 'kysely'

	interface Props {
		readonly attribute: Pick<Selectable<Attribute>, 'id' | 'name' | 'slug' | 'summary'>
		readonly profile: Pick<Selectable<User>, 'id' | 'username'>
	}

	const { attribute, profile }: Props = $props()
</script>

<div class="rounded bg-surface p-4">
	<a
		href={resolve('/(app)/[username]/attributes/[slug]', {
			slug: attribute.slug,
			username: profile.username,
		})}
	>
		<h2 class="font-semibold">{attribute.name}</h2>
	</a>
	<p class="prose text-main">{attribute.summary}</p>
</div>
