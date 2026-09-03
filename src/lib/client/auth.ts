import { createAuthClient, type AuthClient, type BetterAuthClientOptions } from 'better-auth/client'
import { adminClient } from 'better-auth/client/plugins'

const authOptions: BetterAuthClientOptions & {
	readonly plugins: [ReturnType<typeof adminClient>]
} = {
	plugins: [adminClient()],
} as const satisfies BetterAuthClientOptions

export const auth: AuthClient<typeof authOptions> = createAuthClient(authOptions)
