export const Theme = {
	dark: 'dark',
	light: 'light',
} as const
export type Theme = (typeof Theme)[keyof typeof Theme]

export function toTheme(theme: string | null): Theme {
	switch (theme) {
		case Theme.light:
			return Theme.light

		case Theme.dark:
		case null:
		default:
			return Theme.dark
	}
}

export function applyTheme(theme: Theme): void {
	switch (theme) {
		case 'light':
			document.documentElement.classList.remove('scheme-dark')
			document.documentElement.classList.add('scheme-light')
			break

		case 'dark':
			document.documentElement.classList.remove('scheme-light')
			document.documentElement.classList.add('scheme-dark')
			break
	}

	localStorage.setItem('theme', theme)
}
