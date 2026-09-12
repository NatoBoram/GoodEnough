<script lang="ts">
	import type { LayoutProps } from './$types.ts'

	let { children }: LayoutProps = $props()
</script>

<div class="container mx-auto">{@render children()}</div>
