<script lang="ts">
	import { onMount } from 'svelte';
	import Columna from '$lib/Columna.svelte';
	import ColumnaHoras from '$lib/ColumnaHoras.svelte';
	import ToolBar from '$lib/ToolBar.svelte';
	import { modulos_usach } from '$lib/index';
	import { days, options, initSchedule } from '$lib/state.svelte';
	import { page } from '$app/stores';
	import type { Hora } from '$lib/types.d';

	// Obtener el ID del horario de la URL
	const scheduleId = $page.params.id;

	let horas_modulo: Hora[] = modulos_usach.map((modulo) => {
		return { contenido: modulo, color: 'bg-white' };
	});

	onMount(() => {
		// Inicializar la conexión a Supabase con el ID de la URL
		initSchedule(scheduleId);
	});

	// Lógica para el botón de compartir
	let copied = false;

	function copyToClipboard() {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(window.location.href).then(() => {
				copied = true;
				setTimeout(() => (copied = false), 2000);
			});
		} else {
			alert('Tu navegador no soporta la copia automática. Copia la URL manualmente.');
		}
	}
</script>

<div class="text-center">
	<h1 class="inline-block text-2xl font-bold">horganizador (ID: {scheduleId})</h1>
	<button
		class="ml-4 rounded bg-blue-500 px-3 py-1 text-white transition-colors hover:bg-blue-600"
		onclick={copyToClipboard}
	>
		{copied ? '¡Copiado!' : 'Compartir'}
	</button>
</div>
<img src="/god.jpg" alt="dog propeller hat meme" class="mx-auto my-4 size-32" />

<ToolBar />

<!-- Mostrar el horario solo si los datos han sido cargados -->
{#if $days.length > 0}
	<div class="mx-4 my-8 grid grid-cols-7 border bg-white">
		<ColumnaHoras titulo="Módulo" horas={horas_modulo} />
		{#each $days as day, day_index}
			<Columna titulo={day.nombre} horas={day.horas} {day_index}></Columna>
		{/each}
	</div>
{:else}
	<p class="text-center">Cargando horario o el horario no existe...</p>
{/if}

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
