import { envInt, envString, envUrl, loadEnv, maybeSecretString } from '@natoboram/load_env'

await loadEnv({ override: true })

export const BETTER_AUTH_SECRET: string =
	(await maybeSecretString('BETTER_AUTH_SECRET_FILE')) || envString('BETTER_AUTH_SECRET')
export const BETTER_AUTH_URL: URL = envUrl('BETTER_AUTH_URL', new URL('http://localhost:5173'))

export const POSTGRES_DB: string = envString('POSTGRES_DB', 'goodenough')
export const POSTGRES_HOST: string = envString('POSTGRES_HOST', 'localhost')
export const POSTGRES_PASSWORD: string =
	(await maybeSecretString('POSTGRES_PASSWORD_FILE')) || envString('POSTGRES_PASSWORD')
export const POSTGRES_PORT: number = envInt('POSTGRES_PORT', 5432)
export const POSTGRES_USER: string = envString('POSTGRES_USER', 'goodenough')
