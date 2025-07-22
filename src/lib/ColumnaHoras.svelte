<script lang="ts">
		import type { Snippet } from 'svelte';

	let { titulo, horas, children }: { titulo: string; horas: Hora[]; children?: Snippet } = $props();
</script>

<div class="grid grid-rows-12">
	<span class="h-4 text-center">{titulo}</span>
	{#each horas as modulo, col_index}
		{@render children?.()}
		<span class={`${modulo.color} h-8 w-full`} >{modulo.contenido}</span>
		{#if col_index % 3 == 2}
			<span class="h-full w-full bg-amber-200"></span>
		{/if}
	{/each}
</div>
