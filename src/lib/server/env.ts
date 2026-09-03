import { envEnum, envInt, envString, envUrl, loadEnv, maybeSecretString } from '@natoboram/load_env'
import { asyncResult } from '../result.ts'

const loaded = await asyncResult(loadEnv({ override: true }), 'loading environment variables')
if (!loaded.ok) {
	throw new Error('Failed to load environment variables', { cause: loaded.error })
}

export const BETTER_AUTH_SECRET: string =
	(await maybeSecretString('BETTER_AUTH_SECRET_FILE')) || envString('BETTER_AUTH_SECRET')
export const BETTER_AUTH_URL: URL = envUrl('BETTER_AUTH_URL', new URL('http://localhost:5173'))

export const POSTGRES_DB: string = envString('POSTGRES_DB', 'goodenough')
export const POSTGRES_HOST: string = envString('POSTGRES_HOST', 'localhost')
export const POSTGRES_PASSWORD: string =
	(await maybeSecretString('POSTGRES_PASSWORD_FILE')) || envString('POSTGRES_PASSWORD')
export const POSTGRES_PORT: number = envInt('POSTGRES_PORT', 5432)
export const POSTGRES_USER: string = envString('POSTGRES_USER', 'goodenough')

export const ADMIN_EMAIL: string = envString('ADMIN_EMAIL')
export const ADMIN_PASSWORD: string =
	(await maybeSecretString('ADMIN_PASSWORD_FILE')) || envString('ADMIN_PASSWORD')

export const NodeEnv = {
	ci: 'ci',
	development: 'development',
	production: 'production',
	test: 'test',
} as const
export type NodeEnv = (typeof NodeEnv)[keyof typeof NodeEnv]
export const NODE_ENV: NodeEnv = envEnum(
	'NODE_ENV',
	['ci', 'development', 'production', 'test'],
	'development',
)
