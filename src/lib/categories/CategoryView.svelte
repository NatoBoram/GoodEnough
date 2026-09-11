<script lang="ts">
	import { resolve } from '$app/paths'
	import { hasAdmin } from '$lib/auth/authorization.js'
	import { m } from '$lib/paraglide/messages.js'
	import type { Category, User } from '$lib/server/db/kysely-codegen.js'
	import type { Selectable } from 'kysely'

	interface Props {
		readonly category: Pick<
			Selectable<Category>,
			'created_at' | 'id' | 'image' | 'name' | 'slug' | 'summary' | 'updated_at'
		>
		readonly description: string
		readonly format: Intl.DateTimeFormat
		readonly profile: Pick<Selectable<User>, 'id' | 'username'>
		readonly user: Pick<Selectable<User>, 'id' | 'role'> | undefined
	}

	const { category, description, format, profile, user }: Props = $props()
</script>

<div>
	<h1 class="text-lg font-bold">{category.name}</h1>

	<p>{category.summary}</p>

	<p class="prose text-main prose-strong:text-main">{@html description}</p>

	{#if category.created_at.getTime() !== category.updated_at.getTime()}
		<p class="text-sm text-dim italic">
			{m.categories_view_edited({ date: format.format(category.updated_at) })}
		</p>
	{/if}

	{#if user?.id === profile.id || hasAdmin(user?.role)}
		<a
			href={resolve('/(app)/[username]/categories/[slug]/edit', {
				slug: category.slug,
				username: profile.username,
			})}
			class="self-end rounded bg-success px-2 py-1"
		>
			{m.categories_view_edit()}
		</a>
	{/if}
</div>
