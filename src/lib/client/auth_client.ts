import type { AdminClientPlugin, UsernameClientPlugin } from '$lib/types/better_auth.js'
import type { BetterAuthClientOptions } from 'better-auth/client'
import { adminClient, usernameClient } from 'better-auth/client/plugins'
import type { SvelteAuthClient } from 'better-auth/svelte'
import { createAuthClient } from 'better-auth/svelte'

const authOptions: BetterAuthClientOptions & {
	readonly plugins: readonly [AdminClientPlugin, UsernameClientPlugin]
} = {
	plugins: [adminClient(), usernameClient()],
} as const satisfies BetterAuthClientOptions

export const authClient: SvelteAuthClient<typeof authOptions> = createAuthClient(authOptions)
