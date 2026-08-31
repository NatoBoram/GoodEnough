import { defineConfig } from 'kysely-ctl'
import { db } from './src/lib/server/db/db.ts'

export default defineConfig({
	kysely: db,
	migrations: {
		migrationFolder: 'src/lib/server/db/migrations',
	},
})
