<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Nord from './Nord.svelte'

	const { Story } = defineMeta({
		title: 'Colours/Nord',
		component: Nord,
		tags: ['autodocs'],
		argTypes: {},
	})
</script>

<Story name="Default" args={{ class: 'scheme-light-dark' }} tags={['!dev']} />

<Story name="Light" args={{ class: 'scheme-light' }} />

<Story name="Dark" args={{ class: 'scheme-dark' }} />
