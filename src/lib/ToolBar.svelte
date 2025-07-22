<script lang="ts">
	import { toolIndex, toolbar } from '$lib/state.svelte';

	function horaSelect(index: number) {
		toolIndex.set(index);
	}
</script>

<div class="mx-auto inline-flex w-full justify-center gap-2">
	{#each toolbar as tool, index}
		<button
			class={`h-8 w-16 ${tool.color} ${$toolIndex == index ? 'ring-2' : ''}`}
			onclick={() => {
				horaSelect(index);
			}}>{tool.nombre}</button
		>
	{/each}
</div>
