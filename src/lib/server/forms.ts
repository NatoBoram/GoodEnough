import { logger } from '$lib/server/logger.js'

export function getFormString(form: FormData, name: string): string {
	const value = form.get(name)
	if (typeof value === 'string') return value

	logger.warn({ name, value }, 'Invalid form string')
	return ''
}

export function getFormStrings(form: FormData, name: string): string[] {
	const value = form.getAll(name)
	if (value.every(v => typeof v === 'string')) return value

	logger.warn({ name, value }, 'Invalid form strings')
	return []
}

export function getFormNumber(form: FormData, name: string): number | undefined {
	const value = form.get(name)
	if (value === '') return undefined

	if (typeof value === 'string') {
		const number = Number(value)
		if (!isNaN(number)) return number
	}

	logger.warn({ name, value }, 'Invalid form number')
	return undefined
}

export function getFormBoolean(form: FormData, name: string): boolean {
	return form.has(name)
}

export function getFormDate(form: FormData, name: string): string | undefined {
	const value = form.get(name)
	if (!value || typeof value !== 'string') return undefined

	const date = new Date(value)
	if (!isNaN(date.getTime())) return value.trim()

	logger.warn({ name, value }, 'Invalid form date')
	return undefined
}
