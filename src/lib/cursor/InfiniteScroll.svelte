<script lang="ts" generics="T extends SortableSelection">
	import type { Page } from '$lib/cursor/page.js'
	import { Spinner } from '@natoboram/heroicons.svelte'
	import { tick, untrack, type Snippet } from 'svelte'
	import type { ClassValue } from 'svelte/elements'
	import type { SortableSelection } from './sort.js'

	const {
		class: className,
		initialPage,
		loadNext,
		row,
	}: {
		readonly class?: ClassValue
		readonly initialPage: Promise<Page<T>>
		readonly loadNext: (lastRow: T) => Promise<Page<T>>
		readonly row: Snippet<[T]>
	} = $props()

	const pages = $state([untrack(() => initialPage)])
	let observer: IntersectionObserver | undefined
	let sentinel: HTMLDivElement

	function observe(node: HTMLDivElement) {
		observer = new IntersectionObserver((entries, o) => void callback(entries, o))
		observer.observe(node)

		return () => {
			observer?.disconnect()
			observer = undefined
		}
	}

	async function callback(
		entries: IntersectionObserverEntry[],
		o: IntersectionObserver,
	): Promise<void> {
		if (observer !== o) return
		if (!entries.some(entry => entry.isIntersecting)) return

		o.disconnect()

		const lastPage = await pages.at(-1)

		const lastRow = lastPage?.data.at(-1)
		if (!lastPage || lastPage.data.length !== lastPage.limit || !lastRow) return

		const nextPage = loadNext(lastRow)
		pages.push(nextPage)

		await nextPage
		await tick()

		if (observer === o) o.observe(sentinel)
	}
</script>

<div class="flex flex-col gap-2 {className}">
	{#each pages as page (page)}
		{#await page}
			<Spinner class="size-6" />
		{:then page}
			{#each page.data as value (value.id)}
				{@render row(value)}
			{/each}
		{/await}
	{/each}

	<div bind:this={sentinel} {@attach observe} aria-hidden="true"></div>
</div>
