import { BETTER_AUTH_URL } from '../env.ts'

export function usernameToEmail(username: string): string {
	return `${username}@${new URL(BETTER_AUTH_URL).hostname}`
}
