import { getRequestEvent } from '$app/server'
import type { Auth, BetterAuthOptions } from 'better-auth'
import { betterAuth } from 'better-auth'
import { admin, type AdminOptions } from 'better-auth/plugins'
import { sveltekitCookies } from 'better-auth/svelte-kit'
import type { PostgresPool } from 'kysely'
import pkg from '../../../package.json' with { type: 'json' }
import { pool } from './db/db.ts'
import { BETTER_AUTH_SECRET, BETTER_AUTH_URL } from './env.ts'

const adminOptions: AdminOptions = {
	schema: {
		session: {
			fields: {
				banExpires: 'ban_expires',
				banReason: 'ban_reason',
				impersonatedBy: 'impersonated_by',
			},
			modelName: 'sessions',
		},
		user: {
			fields: {
				banExpires: 'ban_expires',
				banReason: 'ban_reason',
				impersonatedBy: 'impersonated_by',
			},
			modelName: 'users',
		},
	},
} as const satisfies AdminOptions

const authOptions: BetterAuthOptions & {
	readonly database: PostgresPool
	readonly plugins: [
		ReturnType<typeof admin<typeof adminOptions>>,
		ReturnType<typeof sveltekitCookies>,
	]
} = {
	appName: pkg.name,
	baseURL: BETTER_AUTH_URL.toString(),
	database: pool,
	plugins: [
		admin(adminOptions),
		sveltekitCookies(getRequestEvent), // make sure this is the last plugin in the array
	],
	secret: BETTER_AUTH_SECRET,

	emailAndPassword: { enabled: true },
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
} as const satisfies BetterAuthOptions

export const auth: Auth<typeof authOptions> = betterAuth(authOptions)
