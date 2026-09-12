<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import CategoryNew from './CategoryNew.svelte'

	const { Story } = defineMeta({
		title: 'Categories/CategoryNew',
		component: CategoryNew,
		tags: ['autodocs'],
		argTypes: {},
		args: {},
	})
</script>

<Story name="Default" args={{}} />

<Story name="With error" args={{ error: 'This is an error message.' }} />
