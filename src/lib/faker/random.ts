export function randomFrom<T>(values: T[]): T {
	const value = values[Math.floor(Math.random() * values.length)]
	if (!value) throw new Error('Empty array')
	return value
}

export function randomPercent(value: number): boolean {
	return Math.random() < value / 100
}
