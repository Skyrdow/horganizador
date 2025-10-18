<script lang="ts">
	import { onMount } from 'svelte';
	import { createNewSchedule } from '$lib/state.svelte';
	import { modulos_usach } from '$lib/index';
	import { goto } from '$app/navigation';
	import type { Dia, Hora } from '$lib/types.d';

	let loading = true;

	// Lógica para generar el horario por defecto
	let horas_modulo: Hora[] = modulos_usach.map((modulo) => {
		return { contenido: modulo, color: 'bg-white' };
	});
	let cantidad_horas = horas_modulo.length;

	function horasVacias(cantidad: number): Hora[] {
		return Array(cantidad)
			.fill(null)
			.map(() => ({
				contenido: '-',
				color: 'bg-white hover:bg-gray-100'
			}));
	}

	function getDefaultDays(): Dia[] {
		return [
			{ nombre: 'Lunes', horas: horasVacias(cantidad_horas) },
			{ nombre: 'Martes', horas: horasVacias(cantidad_horas) },
			{ nombre: 'Miercoles', horas: horasVacias(cantidad_horas) },
			{ nombre: 'Jueves', horas: horasVacias(cantidad_horas) },
			{ nombre: 'Viernes', horas: horasVacias(cantidad_horas) },
			{ nombre: 'Sábado', horas: horasVacias(cantidad_horas) }
		];
	}

	onMount(async () => {
		const initialDays = getDefaultDays();
		const newId = await createNewSchedule(initialDays);

		if (newId) {
			await goto(`/schedule/${newId}`);
		} else {
			loading = false;
		}
	});
</script>

<div class="p-8 text-center">
	{#if loading}
		<h1 class="text-2xl font-bold">Creando nuevo horario colaborativo...</h1>
		<p>Por favor, espera un momento.</p>
	{:else}
		<h1 class="text-2xl font-bold text-red-500">Error al crear el horario.</h1>
		<p>
			Asegúrate de que tus variables de entorno de Supabase estén configuradas y la tabla
			'schedules' exista.
		</p>
	{/if}
</div>
