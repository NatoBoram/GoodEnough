import type { User } from '$lib/server/db/kysely-codegen.ts'
import type { Session } from 'better-auth'
import type { Selectable } from 'kysely'

/**
 * See https://svelte.dev/docs/kit/types#app.d.ts for information about these interfaces
 */
declare global {
	namespace App {
		interface Locals {
			user?: Selectable<User>
			session?: Session
		}

		// interface Error {}
		interface PageData {
			/** Currently logged-in user, available under `src/routes/+layout.server.ts`. */
			readonly user?: Selectable<User> | undefined
			/** The user being viewed, available under `src/routes/(app)/[username]/+layout.server.ts`. */
			readonly profile?: Selectable<User>
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {}
