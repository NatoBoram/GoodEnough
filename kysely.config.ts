import { defineConfig } from 'kysely-ctl'
import { db } from './src/lib/server/db/db.ts'

export default defineConfig({
	kysely: db,
	migrations: {
		allowJS: false,
		migrationFolder: 'src/lib/server/db/migrations',
	},
	seeds: {
		allowJS: false,
		seedFolder: 'src/lib/server/db/seeds',
	},
})
