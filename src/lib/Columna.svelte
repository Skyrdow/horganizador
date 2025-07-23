<script lang="ts">
	import { days, options, toolbar, toolIndex } from './state.svelte';

	let { titulo, horas, day_index }: { titulo: string; horas: Hora[]; day_index: number } = $props();
</script>

<div class="grid grid-rows-12">
	<span class="bg-gray-100 text-center">{titulo}</span>
	{#each horas as modulo, col_index}
		<button
			class={`${$days[day_index].horas[col_index].color} ${$options.text_size} ${$options.row_height} w-full`}
			onclick={() => {
				$days[day_index].horas[col_index].color = $toolbar[$toolIndex].color;

				// borrar
				if ($toolIndex != 0) {
					$days[day_index].horas[col_index].contenido = $toolbar[$toolIndex].nombre;
				} else {
					$days[day_index].horas[col_index].contenido = '-';
				}
			}}>{modulo.contenido}</button
		>
		{#if col_index % 3 == 2}
			<span class="h-8 w-full bg-amber-200"></span>
		{/if}
	{/each}
</div>
