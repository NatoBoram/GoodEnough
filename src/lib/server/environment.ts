import { asyncResult } from '$lib/result.js'

async function isBuilding() {
	const environment = await asyncResult(import('$app/environment'), 'importing $app/environment')
	if (!environment.ok) return true
	return environment.value.building
}

/**
 * SvelteKit analyses your app during the `build` step by running it. During this process,
 * `building` is `true`. This also applies during prerendering.
 */
export const building: boolean = await isBuilding()
