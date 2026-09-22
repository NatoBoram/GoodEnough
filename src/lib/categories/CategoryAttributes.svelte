<script lang="ts">
	import { resolve } from '$app/paths'
	import { m } from '$lib/paraglide/messages.js'
	import type { Attribute, Category, User } from '$lib/server/db/kysely-codegen.js'
	import type { Selectable } from 'kysely'
	import type { SvelteHTMLElements } from 'svelte/elements'
	import CategoryAttribute from './CategoryAttribute.svelte'

	interface Props {
		readonly attributes: Pick<Selectable<Attribute>, 'id' | 'name' | 'summary' | 'type'>[]
		readonly profile: Pick<Selectable<User>, 'id' | 'username'>
		readonly category: Pick<Selectable<Category>, 'id' | 'slug'>
		readonly class?: SvelteHTMLElements['div']['class']
	}
	const { attributes, class: className, profile, category }: Props = $props()
</script>

{#if attributes.length}
	<div class="grid gap-4 sm:grid-cols-2 {className}">
		{#each attributes as attribute (attribute.id)}
			<CategoryAttribute {attribute}></CategoryAttribute>
		{/each}
	</div>
{:else}
	<p class="mx-auto max-w-xl text-dim italic {className}">
		{m.category_attribute_none_1()}
		<a
			class="text-primary"
			href={resolve('/(app)/[username]/categories/[slug]/edit', {
				username: profile.username,
				slug: category.slug,
			})}
		>
			{m.category_attribute_none_2()}
		</a>{m.category_attribute_none_3()}
	</p>
{/if}
