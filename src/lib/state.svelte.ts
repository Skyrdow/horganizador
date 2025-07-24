import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Función helper para crear stores persistentes
function createPersistentStore<T>(key: string, defaultValue: T) {
	// Cargar valor inicial desde localStorage si existe
	const initial = browser
		? JSON.parse(localStorage.getItem(key) || JSON.stringify(defaultValue))
		: defaultValue;

	const store = writable(initial);

	// guardar en localStorage
	if (browser) {
		store.subscribe((value) => {
			localStorage.setItem(key, JSON.stringify(value));
		});
	}

	return store;
}

// Store no persistente (por UX)
export const toolIndex = writable(0);

// Stores persistentes
export const days = createPersistentStore<Dia[]>('horario-days', []);
export const tipoHoras = createPersistentStore('horario-tipo-horas', 'usach');

export const toolbar = createPersistentStore('horario-toolbar', [
	{ color: 'bg-white hover:bg-gray-100', nombre: 'Borrar' },
	{ color: 'bg-red-400', nombre: 'Hora 1' },
	{ color: 'bg-blue-400', nombre: 'Hora 2' },
	{ color: 'bg-yellow-400', nombre: 'Hora 3' },
	{ color: 'bg-green-400', nombre: 'Hora 4' },
	{ color: 'bg-purple-400', nombre: 'Hora 5' },
	{ color: 'bg-cyan-400', nombre: 'Hora 6' },
	{ color: 'bg-orange-400', nombre: 'Hora 7' }
]);

export const options = createPersistentStore('horario-options', {
	text_size: 'text-md',
	row_height: 'h-[48px]'
});
