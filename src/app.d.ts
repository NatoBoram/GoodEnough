import type { User } from '$lib/server/db/kysely-codegen.ts'
import type { Session } from 'better-auth'
import type { Selectable } from 'kysely'

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			user?: Selectable<User>
			session?: Session
		}

		// interface Error {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {}
