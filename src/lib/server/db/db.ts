import { Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'
import {
	POSTGRES_DB,
	POSTGRES_HOST,
	POSTGRES_PASSWORD,
	POSTGRES_PORT,
	POSTGRES_USER,
} from '../env.ts'
import type { DB } from './kysely-codegen.ts'

export const pool: Pool = new Pool({
	database: POSTGRES_DB,
	host: POSTGRES_HOST,
	password: POSTGRES_PASSWORD,
	port: POSTGRES_PORT,
	user: POSTGRES_USER,
})

const dialect = new PostgresDialect({ pool })

/** Database interface is passed to Kysely's constructor, and from now on,
 * Kysely knows your database structure. Dialect is passed to Kysely's
 * constructor, and from now on, Kysely knows how to communicate with your
 * database. */
export const db: Kysely<DB> = new Kysely<DB>({ dialect })
