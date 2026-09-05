<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import { fn } from 'storybook/test'
	import type { TopBarUser } from './TopBar.svelte'
	import TopBar from './TopBar.svelte'

	const user: TopBarUser = {
		id: 'ddacff1e-2f6b-45de-868d-ab060fc7053a',
		name: 'User',
		username: 'user',
	}

	const profile: TopBarUser = {
		id: 'f7b1ebc9-1726-48e1-a946-77fddbd6c20e',
		name: 'Profile',
		username: 'profile',
	}

	const { Story } = defineMeta({
		title: 'Layout/TopBar',
		component: TopBar,
		tags: ['autodocs'],
		argTypes: {},
		args: {
			onLogout: fn(),
			toggleDark: fn(),
			toggleLight: fn(),
		},
	})
</script>

<Story name="Default" args={{}} />

<Story name="With user" args={{ user }} />

<Story name="With profile" args={{ profile }} />

<Story name="With user profile" args={{ user, profile }} />
