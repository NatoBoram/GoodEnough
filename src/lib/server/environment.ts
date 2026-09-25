const environment = await import('$app/environment').catch(() => ({
	browser: false,
	building: true,
	dev: false,
}))

export const browser: boolean = environment.browser
export const building: boolean = environment.building
export const dev: boolean = environment.dev
