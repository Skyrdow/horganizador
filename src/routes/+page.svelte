<script lang="ts">
	import { onMount } from 'svelte';
	import Columna from '$lib/Columna.svelte';
	import ColumnaHoras from '$lib/ColumnaHoras.svelte';
	import ToolBar from '$lib/ToolBar.svelte';
	import { modulos_usach } from '$lib/index';
	import { days, options } from '$lib/state.svelte';

	let horas_modulo: Hora[] = modulos_usach.map((modulo) => {
		return { contenido: modulo, color: 'bg-white' };
	});
	let cantidad_horas = horas_modulo.length;

	function horasVacias(cantidad: number) {
		return Array(cantidad)
			.fill(null)
			.map(() => ({
				contenido: '-',
				color: 'bg-white hover:bg-gray-100'
			}));
	}

	onMount(() => {
		// Verificar si ya hay días guardados en localStorage
		if ($days.length === 0) {
			days.set([
				{ nombre: 'Lunes', horas: horasVacias(cantidad_horas) },
				{ nombre: 'Martes', horas: horasVacias(cantidad_horas) },
				{ nombre: 'Miercoles', horas: horasVacias(cantidad_horas) },
				{ nombre: 'Jueves', horas: horasVacias(cantidad_horas) },
				{ nombre: 'Viernes', horas: horasVacias(cantidad_horas) },
				{ nombre: 'Sábado', horas: horasVacias(cantidad_horas) }
			]);
		}
	});
</script>

<h1 class="text-center text-2xl font-bold">horganizador</h1>
<img src="/god.jpg" alt="dog propeller hat meme" class="mx-auto my-4 size-32" />

<ToolBar />

<div class="mx-4 my-8 grid grid-cols-7 border bg-white">
	<ColumnaHoras titulo="Módulo" horas={horas_modulo} />
	{#each $days as day, day_index}
		<Columna titulo={day.nombre} horas={day.horas} {day_index}></Columna>
	{/each}
</div>

<div class="mx-4 mb-8 inline-flex items-center gap-4">
	<label for="text_size">Tamaño del texto: </label>
	<select id="text_size" bind:value={$options.text_size}>
		<option value="text-sm">Pequeño</option>
		<option value="text-md">Normal</option>
		<option value="text-xl">Grande</option>
	</select>

	<label for="row_height">Altura de los bloques: </label>
	<select bind:value={$options.row_height}>
		<option value="h-[32px]">Pequeño</option>
		<option value="h-[48px]">Normal</option>
		<option value="h-[64px]">Grande</option>
	</select>
</div>
