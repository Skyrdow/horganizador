import { writable } from 'svelte/store';

export const toolIndex = writable(0);
export const days = writable<Dia[]>([]);
export const tipoHoras = writable('usach');

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
