import { getRequestEvent } from '$app/server'
import type { Auth, BetterAuthOptions } from 'better-auth'
import { betterAuth } from 'better-auth'
import { sveltekitCookies } from 'better-auth/svelte-kit'
import pkg from '../../../package.json' with { type: 'json' }
import { pool } from './db/db.ts'
import { BETTER_AUTH_SECRET, BETTER_AUTH_URL } from './env.ts'

const options: BetterAuthOptions = {
	appName: pkg.name,
	baseURL: BETTER_AUTH_URL.toString(),
	database: pool,
	emailAndPassword: { enabled: true },
	plugins: [sveltekitCookies(getRequestEvent)],
	secret: BETTER_AUTH_SECRET,

	advanced: { database: { generateId: 'uuid', joins: true }, skipTrailingSlashes: true },

	account: {
		encryptOAuthTokens: true,
		fields: {
			accessToken: 'access_token',
			accessTokenExpiresAt: 'access_token_expires_at',
			accountId: 'account_id',
			createdAt: 'created_at',
			idToken: 'id_token',
			providerId: 'provider_id',
			refreshToken: 'refresh_token',
			refreshTokenExpiresAt: 'refresh_token_expires_at',
			updatedAt: 'updated_at',
			userId: 'user_id',
		},
		modelName: 'accounts',
	},
	session: {
		fields: {
			createdAt: 'created_at',
			expiresAt: 'expires_at',
			ipAddress: 'ip_address',
			updatedAt: 'updated_at',
			userAgent: 'user_agent',
			userId: 'user_id',
		},
		modelName: 'sessions',
	},
	user: {
		fields: { createdAt: 'created_at', emailVerified: 'email_verified', updatedAt: 'updated_at' },
		modelName: 'users',
	},
	verification: {
		fields: { createdAt: 'created_at', expiresAt: 'expires_at', updatedAt: 'updated_at' },
		modelName: 'verifications',
		storeIdentifier: { default: 'hashed' },
	},
}

export const auth: Auth = betterAuth(options)
export default auth
