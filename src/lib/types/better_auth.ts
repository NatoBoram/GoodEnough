import type { DBAdapterDebugLogOption } from 'better-auth/adapters'
import type { AdminClientOptions, adminClient, usernameClient } from 'better-auth/client/plugins'
import type { AdminOptions, admin } from 'better-auth/plugins'
import type { sveltekitCookies } from 'better-auth/svelte-kit'
import type { Kysely } from 'kysely'

export interface Database<DB> {
	/**
	 * casing for table names
	 *
	 * @default "camel"
	 */
	readonly casing?: 'camel' | 'snake'

	/**
	 * Kysely instance
	 */
	readonly db: Kysely<DB>

	/**
	 * Enable debug logs for the adapter
	 *
	 * @default false
	 */
	readonly debugLogs?: DBAdapterDebugLogOption

	/**
	 * Whether to execute multiple operations in a transaction.
	 * If the database doesn't support transactions,
	 * set this to `false` and operations will be executed sequentially.
	 *
	 * @default false
	 */
	readonly transaction?: boolean

	/**
	 * Database type between postgres, mysql and sqlite
	 */
	readonly type: KyselyDatabaseType
}

export type AdminClientPlugin<O extends AdminClientOptions = AdminClientOptions> = ReturnType<
	typeof adminClient<O>
>

export type AdminPlugin<O extends AdminOptions = AdminOptions> = ReturnType<typeof admin<O>>

export type KyselyDatabaseType = 'mssql' | 'mysql' | 'postgres' | 'sqlite'

export type SvelteKitCookiesPlugin = ReturnType<typeof sveltekitCookies>

export type UsernameClientPlugin = ReturnType<typeof usernameClient>
