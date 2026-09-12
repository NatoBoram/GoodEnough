import { logger } from '$lib/server/logger.js'

export function getFormString(form: FormData, name: string): string {
	const value = form.get(name)
	if (typeof value === 'string') return value

	logger.warn({ name, value }, 'Invalid form value')
	return ''
}

export function getFormStrings(form: FormData, name: string): string[] {
	const value = form.getAll(name)
	if (value.every(v => typeof v === 'string')) return value

	logger.warn({ name, value }, 'Invalid form values')
	return []
}
