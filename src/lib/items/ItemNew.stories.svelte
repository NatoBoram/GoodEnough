<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ItemNew from './ItemNew.svelte'

	const { Story } = defineMeta({
		title: 'Items/ItemNew',
		component: ItemNew,
		tags: ['autodocs'],
		argTypes: {},
		args: {},
	})
</script>

<Story name="Default" args={{}} />

<Story name="Error" args={{ error: 'This is an error message.' }} />
