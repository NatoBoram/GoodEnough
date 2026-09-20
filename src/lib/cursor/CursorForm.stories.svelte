<script module lang="ts">
	import { m } from '$lib/paraglide/messages.js'
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import { fn } from 'storybook/test'
	import type { ComponentProps } from 'svelte'
	import CursorForm from './CursorForm.svelte'
	import { OrderByDirection, Sortable } from './sort.js'

	const { Story } = defineMeta({
		title: 'Layout/CursorForm',
		component: CursorForm,
		tags: ['autodocs'],
		argTypes: {},
		args: {
			onchange: fn(),
			placeholder: 'Search by name',
		},
	})
</script>

{#snippet template(args: ComponentProps<typeof CursorForm>)}
	<CursorForm {...args}>
		{#snippet actions()}
			<button class="cursor-pointer rounded bg-success px-3 py-2" type="button">
				{m.items_list_new()}
			</button>
		{/snippet}
	</CursorForm>
{/snippet}

<Story name="Default" {template} args={{}} />

<Story
	name="Controls"
	{template}
	args={{
		direction: OrderByDirection.asc,
		limit: 10,
		sort: Sortable.name,
	}}
/>
