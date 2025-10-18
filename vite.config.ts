import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
	return {
		plugins: [tailwindcss(), sveltekit()],
		// Asegura que Vite cargue las variables de entorno correctamente
		envPrefix: 'VITE_PUBLIC_'
	};
});
