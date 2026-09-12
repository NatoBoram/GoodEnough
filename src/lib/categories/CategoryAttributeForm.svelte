<script lang="ts">
	import { resolve } from '$app/paths'
	import CategoryAttributeCheckbox from '$lib/categories/CategoryAttributeCheckbox.svelte'
	import { m } from '$lib/paraglide/messages.js'
	import type { Attribute, User } from '$lib/server/db/kysely-codegen.js'
	import type { Selectable } from 'kysely'
	import type { HTMLFormAttributes } from 'svelte/elements'

	interface Props {
		readonly onsubmit?: HTMLFormAttributes['onsubmit']
		readonly assigned: Pick<Selectable<Attribute>, 'id' | 'name' | 'summary' | 'type'>[]
		readonly unassigned: Pick<Selectable<Attribute>, 'id' | 'name' | 'summary' | 'type'>[]
		readonly error: string | undefined
		readonly profile: Pick<Selectable<User>, 'id' | 'username'>
	}

	const { onsubmit, assigned, unassigned, error, profile }: Props = $props()
</script>

{#if assigned.length || unassigned.length}
	<form
		action="?/attributes"
		class="flex flex-col"
		method="POST"
		onsubmit={event => {
			if (!onsubmit) return
			event.preventDefault()
			onsubmit(event)
		}}
	>
		<!-- Assigned -->
		{#each assigned as attribute (attribute.id)}
			<CategoryAttributeCheckbox {attribute} assigned={true} />
		{/each}

		<!-- Unassigned -->
		{#each unassigned as attribute (attribute.id)}
			<CategoryAttributeCheckbox {attribute} assigned={false} />
		{/each}

		{#if error}
			<p class="mt-2 text-sm text-error">{error}</p>
		{/if}

		<button type="submit" class="mt-2 cursor-pointer self-end rounded bg-success px-2 py-1">
			{m.categories_edit_submit()}
		</button>
	</form>
{:else}
	<p class="mx-auto max-w-xl text-dim italic">
		{m.category_attribute_none_1()}
		<a
			class="text-primary"
			href={resolve('/(app)/[username]/attributes/new', { username: profile.username })}
		>
			{m.category_attribute_none_2()}
		</a>{m.category_attribute_none_3()}
	</p>
{/if}
