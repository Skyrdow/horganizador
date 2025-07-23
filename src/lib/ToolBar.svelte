<script lang="ts">
	import { toolIndex, toolbar } from '$lib/state.svelte';

	let nombreInput = $state('');
</script>

<div class="flex w-full flex-wrap gap-2 px-4">
	{#each $toolbar as tool, index}
		<button
			class={`line-clamp-2 h-12 flex-1 text-sm leading-3.5 ${tool.color} ${$toolIndex == index ? 'ring-2' : ''}`}
			onclick={() => {
				toolIndex.set(index);
			}}>{$toolbar[index].nombre}</button
		>
	{/each}
</div>

<div class="mx-auto mt-4 inline-flex w-full justify-center gap-2">
	<input type="text" placeholder="Cambia el nombre" bind:value={nombreInput} />
	<button
		onclick={() => {
			$toolbar[$toolIndex].nombre = nombreInput;
		}}
		class={`${$toolIndex != 0 ? $toolbar[$toolIndex].color : 'bg-gray-300'} px-2`}
	>
		Cambiar Nombre</button
	>
</div>
