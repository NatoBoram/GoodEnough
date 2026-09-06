import { bench, describe } from 'vitest'

const min = 1 + Math.random()
const value = min + Math.random()
const max = value + Math.random()

describe('clamp', () => {
	bench('Math', () => {
		return void Math.min(Math.max(value, min), max)
	})

	bench('if', () => {
		if (value < min) return void min
		if (value > max) return void max
		return void value
	})

	bench('ternary', () => {
		return void (value < min ? min : value > max ? max : value)
	})
})
