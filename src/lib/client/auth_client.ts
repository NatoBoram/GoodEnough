import type { AdminClientPlugin, UsernameClientPlugin } from '$lib/types/better_auth.js'
import { createAuthClient, type AuthClient, type BetterAuthClientOptions } from 'better-auth/client'
import { adminClient, usernameClient } from 'better-auth/client/plugins'

const authOptions: BetterAuthClientOptions & {
	readonly plugins: readonly [AdminClientPlugin, UsernameClientPlugin]
} = {
	plugins: [adminClient(), usernameClient()],
} as const satisfies BetterAuthClientOptions

export const authClient: AuthClient<typeof authOptions> = createAuthClient(authOptions)
