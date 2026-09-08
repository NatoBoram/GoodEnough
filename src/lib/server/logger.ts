import type { Logger } from 'pino'
import { pino } from 'pino'
import pretty from 'pino-pretty'

export const logger: Logger = pino(
	{ level: 'trace', useOnlyCustomLevels: false },
	pretty({ singleLine: true }),
)
