export type Result<T, E extends Error = Error> =
	{ readonly ok: false; readonly error: E } | { readonly ok: true; readonly value: T }

export async function asyncResult<T>(promise: Promise<T>, message: string): Promise<Result<T>> {
	return promise
		.then((value): Result<T> => ({ ok: true, value }))
		.catch((error: unknown): Result<T> => {
			const err = error instanceof Error ? error : new Error(message, { cause: error })
			return { ok: false, error: err }
		})
}

export function syncResult<T>(f: () => T, message: string): Result<T> {
	try {
		return { ok: true, value: f() }
	} catch (error: unknown) {
		const err = error instanceof Error ? error : new Error(message, { cause: error })
		return { ok: false, error: err }
	}
}
