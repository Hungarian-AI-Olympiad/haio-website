<script lang="ts">
	export let showCopyright = false;
	export let animated = false;
	export let visible = true;
</script>

<div 
	class="relative py-6 transition-all duration-700 ease-out"
	class:opacity-0={animated && !visible}
	class:scale-95={animated && !visible}
	class:opacity-100={animated && visible}
	class:scale-100={animated && visible}
>
	<div class="relative z-10 flex items-center justify-center px-6">
		<div class="flex-1 max-w-lg">
			<div class="h-px bg-gradient-to-r from-transparent via-desert-300 to-desert-400"></div>
		</div>
		<div class="px-6">
			{#if showCopyright}
				<p class="text-desert-600 font-medium whitespace-nowrap text-xs">
					© 2025 Hungarian Artificial Intelligence Olympiad (HAIO). Minden jog fenntartva.
				</p>
			{:else}
				<div class="w-2 h-2 bg-warm-blue rounded-full"></div>
			{/if}
		</div>
		<div class="flex-1 max-w-lg">
			<div class="h-px bg-gradient-to-l from-transparent via-desert-300 to-desert-400"></div>
		</div>
	</div>
</div>
