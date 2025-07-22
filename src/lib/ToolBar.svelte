<script lang="ts">
	import { toolIndex, toolbar } from '$lib/state.svelte';

	let nombreInput = $state('');
</script>

<div class="mx-auto inline-flex w-full justify-center gap-2">
	{#each $toolbar as tool, index}
		<button
			class={`h-8 w-16 ${tool.color} ${$toolIndex == index ? 'ring-2' : ''}`}
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
