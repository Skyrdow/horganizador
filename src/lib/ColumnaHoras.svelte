<script lang="ts">
	let { titulo, horas }: { titulo: string; horas: Hora[] } = $props();
</script>

<div class="grid grid-rows-12">
	<span class="bg-gray-100 text-center">{titulo}</span>
	{#each horas as modulo, col_index}
		<span class={`${modulo.color} my-auto h-fit w-full text-center`}>{modulo.contenido}</span>
		{#if col_index % 3 == 2}
			<span class="h-8 w-full bg-amber-200"></span>
		{/if}
	{/each}
</div>
