import { getRequestEvent } from '$app/server'
import type { Auth, BetterAuthOptions } from 'better-auth'
import { betterAuth } from 'better-auth'
import type { AdminOptions, UsernameOptions, UsernamePlugin } from 'better-auth/plugins'
import { admin, username } from 'better-auth/plugins'
import { sveltekitCookies } from 'better-auth/svelte-kit'
import pkg from '../../../package.json' with { type: 'json' }
import type { AdminPlugin, Database, SvelteKitCookiesPlugin } from '../types/better_auth.ts'
import { db } from './db/db.ts'
import type { DB } from './db/kysely-codegen.ts'
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

const usernameOptions: UsernameOptions = {
	schema: { user: { fields: { displayUsername: 'display_username' }, modelName: 'users' } },
} as const satisfies UsernameOptions

export const authOptions: BetterAuthOptions & {
	readonly plugins: readonly [AdminPlugin, UsernamePlugin, SvelteKitCookiesPlugin]
	readonly database: Database<DB>
} = {
	appName: pkg.name,
	baseURL: BETTER_AUTH_URL.toString(),
	trustedOrigins: [BETTER_AUTH_URL.origin],
	database: {
		db,
		type: 'postgres',
		casing: 'snake',
		transaction: true,
	},
	plugins: [
		admin(adminOptions),
		username(usernameOptions),
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
