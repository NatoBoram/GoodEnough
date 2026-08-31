import { getRequestEvent } from '$app/server'
import { kyselyAdapter } from '@better-auth/kysely-adapter'
import type { Auth, BetterAuthOptions } from 'better-auth'
import { betterAuth } from 'better-auth/minimal'
import { sveltekitCookies } from 'better-auth/svelte-kit'
import { db } from './db/db.ts'
import { BETTER_AUTH_SECRET, BETTER_AUTH_URL } from './env.ts'

const options: BetterAuthOptions = {
	baseURL: BETTER_AUTH_URL.toString(),
	secret: BETTER_AUTH_SECRET,
	database: kyselyAdapter(db, { type: 'postgres', transaction: true }),
	emailAndPassword: { enabled: true },
	plugins: [sveltekitCookies(getRequestEvent)],
}

export const auth: Auth = betterAuth(options)
