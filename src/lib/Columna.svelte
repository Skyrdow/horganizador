<script lang="ts">
	import { days, options, toolbar, toolIndex, updateSchedule } from './state.svelte';
	import { get } from 'svelte/store';
	import type { Hora } from './types.d'; // Importación de Hora

	let { titulo, horas, day_index }: { titulo: string; horas: Hora[]; day_index: number } = $props();
</script>

<div class="grid grid-rows-12">
	<span class="bg-gray-100 text-center">{titulo}</span>
	{#each horas as modulo, col_index}
		<button
			class={`${$days[day_index].horas[col_index].color} ${$options.text_size} ${$options.row_height} w-full`}
			onclick={() => {
				// 1. Clonar el array de días para asegurar la inmutabilidad y enviar a Supabase
				const currentDays = get(days);
				const newDays = JSON.parse(JSON.stringify(currentDays)); // Clonación profunda

				// 2. Aplicar el cambio al array clonado
				newDays[day_index].horas[col_index].color = $toolbar[$toolIndex].color;

				// borrar
				if ($toolIndex != 0) {
					newDays[day_index].horas[col_index].contenido = $toolbar[$toolIndex].nombre;
				} else {
					newDays[day_index].horas[col_index].contenido = '-';
				}

				// 3. Enviar la actualización a Supabase
				updateSchedule(newDays);
			}}>{modulo.contenido}</button
		>
		{#if col_index % 3 == 2}
			<span class="h-8 w-full bg-amber-200"></span>
		{/if}
	{/each}
</div>
