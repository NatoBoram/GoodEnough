<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import AttributeNew from './AttributeNew.svelte'

	const { Story } = defineMeta({
		title: 'Attributes/AttributeNew',
		component: AttributeNew,
		tags: ['autodocs'],
		argTypes: {},
		args: {},
	})
</script>

<Story name="Default" args={{}} />

<Story name="Error" args={{ error: 'This is an error message.' }} />
