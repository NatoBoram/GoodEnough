<script lang="ts">
	import type { PageProps } from './$types.ts'

	let { data }: PageProps = $props()
</script>

{#each data.categories as category (category.id)}
	<div>
		<h2>{category.name}</h2>
	</div>
{/each}
