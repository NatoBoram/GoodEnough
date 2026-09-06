<script lang="ts">
	interface Props {
		readonly class?: 'scheme-dark' | 'scheme-light-dark' | 'scheme-light'
	}

	const { class: className }: Props = $props()
</script>

<div class={className}>
	<div class="grid w-full grid-cols-12 gap-4 bg-page p-4 font-semibold text-main">
		<div class="self-center"></div>
		<div class="place-self-center">50</div>
		<div class="place-self-center">100</div>
		<div class="place-self-center">200</div>
		<div class="place-self-center">300</div>
		<div class="place-self-center">400</div>
		<div class="place-self-center">500</div>
		<div class="place-self-center">600</div>
		<div class="place-self-center">700</div>
		<div class="place-self-center">800</div>
		<div class="place-self-center">900</div>
		<div class="place-self-center">950</div>

		<div class="self-center">Nord</div>
		<div class="size-16 rounded border border-nord-500 bg-nord-50"></div>
		<div class="size-16 rounded border border-nord-500 bg-nord-100"></div>
		<div class="size-16 rounded border border-nord-500 bg-nord-200"></div>
		<div class="size-16 rounded border border-nord-500 bg-nord-300"></div>
		<div class="size-16 rounded border border-nord-500 bg-nord-400"></div>
		<div class="size-16 rounded border border-nord-500 bg-nord-500"></div>
		<div class="size-16 rounded border border-nord-500 bg-nord-600"></div>
		<div class="size-16 rounded border border-nord-500 bg-nord-700"></div>
		<div class="size-16 rounded border border-nord-500 bg-nord-800"></div>
		<div class="size-16 rounded border border-nord-500 bg-nord-900"></div>
		<div class="size-16 rounded border border-nord-500 bg-nord-950"></div>

		<div class="self-center">Water</div>
		<div class="size-16 rounded border border-nord-500 bg-water-50"></div>
		<div class="size-16 rounded border border-nord-500 bg-water-100"></div>
		<div class="size-16 rounded border border-nord-500 bg-water-200"></div>
		<div class="size-16 rounded border border-nord-500 bg-water-300"></div>
		<div class="size-16 rounded border border-nord-500 bg-water-400"></div>
		<div class="size-16 rounded border border-nord-500 bg-water-500"></div>
		<div class="size-16 rounded border border-nord-500 bg-water-600"></div>
		<div class="size-16 rounded border border-nord-500 bg-water-700"></div>
		<div class="size-16 rounded border border-nord-500 bg-water-800"></div>
		<div class="size-16 rounded border border-nord-500 bg-water-900"></div>
		<div class="size-16 rounded border border-nord-500 bg-water-950"></div>

		<div class="self-center">Ice</div>
		<div class="size-16 rounded border border-nord-500 bg-ice-50"></div>
		<div class="size-16 rounded border border-nord-500 bg-ice-100"></div>
		<div class="size-16 rounded border border-nord-500 bg-ice-200"></div>
		<div class="size-16 rounded border border-nord-500 bg-ice-300"></div>
		<div class="size-16 rounded border border-nord-500 bg-ice-400"></div>
		<div class="size-16 rounded border border-nord-500 bg-ice-500"></div>
		<div class="size-16 rounded border border-nord-500 bg-ice-600"></div>
		<div class="size-16 rounded border border-nord-500 bg-ice-700"></div>
		<div class="size-16 rounded border border-nord-500 bg-ice-800"></div>
		<div class="size-16 rounded border border-nord-500 bg-ice-900"></div>
		<div class="size-16 rounded border border-nord-500 bg-ice-950"></div>

		<div class="self-center">Arctic</div>
		<div class="size-16 rounded border border-nord-500 bg-arctic-50"></div>
		<div class="size-16 rounded border border-nord-500 bg-arctic-100"></div>
		<div class="size-16 rounded border border-nord-500 bg-arctic-200"></div>
		<div class="size-16 rounded border border-nord-500 bg-arctic-300"></div>
		<div class="size-16 rounded border border-nord-500 bg-arctic-400"></div>
		<div class="size-16 rounded border border-nord-500 bg-arctic-500"></div>
		<div class="size-16 rounded border border-nord-500 bg-arctic-600"></div>
		<div class="size-16 rounded border border-nord-500 bg-arctic-700"></div>
		<div class="size-16 rounded border border-nord-500 bg-arctic-800"></div>
		<div class="size-16 rounded border border-nord-500 bg-arctic-900"></div>
		<div class="size-16 rounded border border-nord-500 bg-arctic-950"></div>

		<div class="self-center">Ocean</div>
		<div class="size-16 rounded border border-nord-500 bg-ocean-50"></div>
		<div class="size-16 rounded border border-nord-500 bg-ocean-100"></div>
		<div class="size-16 rounded border border-nord-500 bg-ocean-200"></div>
		<div class="size-16 rounded border border-nord-500 bg-ocean-300"></div>
		<div class="size-16 rounded border border-nord-500 bg-ocean-400"></div>
		<div class="size-16 rounded border border-nord-500 bg-ocean-500"></div>
		<div class="size-16 rounded border border-nord-500 bg-ocean-600"></div>
		<div class="size-16 rounded border border-nord-500 bg-ocean-700"></div>
		<div class="size-16 rounded border border-nord-500 bg-ocean-800"></div>
		<div class="size-16 rounded border border-nord-500 bg-ocean-900"></div>
		<div class="size-16 rounded border border-nord-500 bg-ocean-950"></div>

		<div class="self-center">Aurora Red</div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-red-50"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-red-100"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-red-200"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-red-300"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-red-400"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-red-500"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-red-600"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-red-700"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-red-800"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-red-900"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-red-950"></div>

		<div class="self-center">Aupora Orange</div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-orange-50"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-orange-100"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-orange-200"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-orange-300"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-orange-400"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-orange-500"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-orange-600"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-orange-700"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-orange-800"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-orange-900"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-orange-950"></div>

		<div class="self-center">Aurora Yellow</div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-yellow-50"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-yellow-100"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-yellow-200"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-yellow-300"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-yellow-400"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-yellow-500"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-yellow-600"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-yellow-700"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-yellow-800"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-yellow-900"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-yellow-950"></div>

		<div class="self-center">Aurora Green</div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-green-50"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-green-100"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-green-200"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-green-300"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-green-400"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-green-500"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-green-600"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-green-700"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-green-800"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-green-900"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-green-950"></div>

		<div class="self-center">Aurora Purple</div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-purple-50"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-purple-100"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-purple-200"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-purple-300"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-purple-400"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-purple-500"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-purple-600"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-purple-700"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-purple-800"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-purple-900"></div>
		<div class="size-16 rounded border border-nord-500 bg-aurora-purple-950"></div>
	</div>
</div>
