import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';
import { supabase } from './supabase';
import type { Dia } from './types.d';

// --- Stores ---
// Store no persistente (por UX)
export const toolIndex = writable(0);

// Stores para el horario (ahora sincronizados con Supabase)
export const days = writable<Dia[]>([]);
export const tipoHoras = writable('usach');
export const scheduleId = writable<string | null>(null);

// Los stores de configuración y toolbar pueden seguir siendo locales o se pueden mover a Supabase si se desea compartir la configuración.
// Por ahora, los mantendré como stores simples sin persistencia local para simplificar la refactorización inicial.
export const toolbar = writable([
	{ color: 'bg-white hover:bg-gray-100', nombre: 'Borrar' },
	{ color: 'bg-red-400', nombre: 'Hora 1' },
	{ color: 'bg-blue-400', nombre: 'Hora 2' },
	{ color: 'bg-yellow-400', nombre: 'Hora 3' },
	{ color: 'bg-green-400', nombre: 'Hora 4' },
	{ color: 'bg-purple-400', nombre: 'Hora 5' },
	{ color: 'bg-cyan-400', nombre: 'Hora 6' },
	{ color: 'bg-orange-400', nombre: 'Hora 7' }
]);

export const options = writable({
	text_size: 'text-md',
	row_height: 'h-[48px]'
});

// --- Funciones de Supabase ---

let realtimeChannel: any | null = null;

/**
 * Inicializa el horario, carga los datos y establece la suscripción en tiempo real.
 * @param id El ID del horario a cargar.
 */
export async function initSchedule(id: string) {
	if (!browser || !supabase) return;

	// 1. Detener la suscripción anterior si existe
	if (realtimeChannel) {
		await supabase.removeChannel(realtimeChannel);
		realtimeChannel = null;
	}

	scheduleId.set(id);

	// 2. Cargar datos iniciales
	const { data, error } = await supabase.from('schedules').select('data').eq('id', id).single();

	if (error && error.code !== 'PGRST116') {
		// PGRST116 is 'no rows found'
		console.error('Error fetching schedule:', error);
		return;
	}

	if (data) {
		days.set(data.data as Dia[]);
	} else {
		// Si no se encuentra, inicializa con un array vacío (o el valor por defecto que uses)
		days.set([]);
	}

	// 3. Establecer suscripción en tiempo real
	realtimeChannel = supabase
		.channel(`schedule:${id}`)
		.on(
			'postgres_changes',
			{ event: 'UPDATE', schema: 'public', table: 'schedules', filter: `id=eq.${id}` },
			(payload) => {
				console.log('Realtime update received:', payload);
				const updatedData = payload.new.data as Dia[];
				days.set(updatedData);
			}
		)
		.subscribe();
}

/**
 * Envía una actualización del horario a Supabase.
 * @param newDays El nuevo array de días.
 */
export async function updateSchedule(newDays: Dia[]) {
	if (!supabase) {
		console.error('Supabase client not initialized. Cannot update schedule.');
		return;
	}

	const id = get(scheduleId);
	if (!id) {
		console.error('Cannot update schedule: ID is null.');
		return;
	}

	// Actualiza el store local inmediatamente para una mejor UX (optimistic update)
	days.set(newDays);

	// Envía la actualización a Supabase
	const { error } = await supabase.from('schedules').update({ data: newDays }).eq('id', id);

	if (error) {
		console.error('Error updating schedule:', error);
		// En un caso real, aquí se revertiría el cambio local si la actualización falla.
	}
}

/**
 * Crea un nuevo horario en Supabase y devuelve su ID.
 */
export async function createNewSchedule(initialDays: Dia[]): Promise<string | null> {
	if (!supabase) {
		console.error(
			'Supabase client not initialized. Cannot create new schedule. Check VITE_PUBLIC_ variables in .env'
		);
		return null;
	}

	const { data, error } = await supabase
		.from('schedules')
		.insert([{ data: initialDays }])
		.select('id')
		.single();

	if (error) {
		console.error('Error creating new schedule:', error);
		return null;
	}

	return data.id;
}
