export type Result<T, E extends Error = Error> =
	{ readonly ok: false; readonly error: E } | { readonly ok: true; readonly value: T }

type Constructor<T> = new (...args: never[]) => T

export async function asyncResult<T, E extends Error = Error>(
	promise: Promise<T>,
	message: string,
	constructor?: Constructor<E>,
): Promise<Result<T, E | Error>> {
	return promise
		.then((value): Result<T, E | Error> => ({ ok: true, value }))
		.catch((error: unknown): Result<T, E | Error> => {
			if (constructor && error instanceof constructor) return { ok: false, error }

			const err = error instanceof Error ? error : new Error(message, { cause: error })
			return { ok: false, error: err }
		})
}

export function syncResult<T, E extends Error = Error>(
	f: () => T,
	message: string,
	constructor?: Constructor<E>,
): Result<T, E | Error> {
	try {
		return { ok: true, value: f() }
	} catch (error: unknown) {
		if (constructor && error instanceof constructor) return { ok: false, error }

		const err = error instanceof Error ? error : new Error(message, { cause: error })
		return { ok: false, error: err }
	}
}
