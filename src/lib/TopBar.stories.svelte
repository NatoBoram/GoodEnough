<script module lang="ts">
	import { resolve } from '$app/paths'
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import { fn } from 'storybook/test'
	import type { TopBarUser } from './TopBar.svelte'
	import TopBar from './TopBar.svelte'
	import { toTheme } from './theme.ts'

	const user = {
		id: 'ddacff1e-2f6b-45de-868d-ab060fc7053a',
		name: 'User',
		username: 'user',
	} as const satisfies TopBarUser

	const profile = {
		id: 'f7b1ebc9-1726-48e1-a946-77fddbd6c20e',
		name: 'Profile',
		username: 'profile',
	} as const satisfies TopBarUser

	const { Story } = defineMeta({
		title: 'Layout/TopBar',
		component: TopBar,
		tags: ['autodocs'],
		argTypes: {},
		args: {
			onLogout: fn(),
			theme: toTheme(localStorage.getItem('theme')),
			toggleDark: fn(),
			toggleLight: fn(),
		},
	})
</script>

<Story name="Default" args={{}} />

<Story
	name="With user"
	args={{
		pathname: resolve('/(app)/[username]/categories', { username: user.username }),
		user,
	}}
/>

<Story
	name="With profile"
	args={{
		pathname: resolve('/(app)/[username]/items', { username: profile.username }),
		profile,
	}}
/>

<Story
	name="With user profile"
	args={{
		pathname: resolve('/(app)/[username]/attributes', { username: profile.username }),
		profile,
		user,
	}}
/>
