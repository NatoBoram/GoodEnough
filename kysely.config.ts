import { loadEnv } from '@natoboram/load_env'
import { PostgresDialect } from 'kysely'
import type { DefineConfigInput } from 'kysely-ctl'
import { defineConfig } from 'kysely-ctl'
import { Pool } from 'pg'

await loadEnv({ override: true })

const pool = new Pool({ connectionString: process.env['DATABASE_URL'] })
const dialect = new PostgresDialect({ pool })

const config: DefineConfigInput = defineConfig({
	dialect,
	migrations: { migrationFolder: 'src/lib/server/db/migrations' },
	seeds: { seedFolder: 'src/lib/server/db/seeds' },
})

export default config
