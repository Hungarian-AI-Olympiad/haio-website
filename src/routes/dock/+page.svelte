<script lang="ts">
	import { base } from '$app/paths';
	import NeuralNetwork from '$lib/components/NeuralNetwork.svelte';
</script>

<svelte:head>
	<title>DOCK - Digital Online Competence Kernel | HAIO</title>
	<meta name="description" content="DOCK - Digital Online Competence Kernel versenyplatform a HAIO online előválogató fordulóihoz." />
</svelte:head>

<!-- Hero Section -->
<section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-desert-100">
	<!-- Neural Network Background -->
	<div class="absolute inset-0 opacity-30">
		<NeuralNetwork nodeCount={12} position="full" />
	</div>

	<!-- Content -->
	<div class="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">
		<!-- DOCK Logo -->
		<div class="mb-12 flex justify-center">
			<img 
				src={`${base}/img/dock/dockt_1.png`} 
				alt="DOCK Logo" 
				class="h-48 w-48 md:h-64 md:w-64 object-contain drop-shadow-2xl animate-float"
			/>
		</div>

		<!-- Title -->
		<p class="text-2xl md:text-3xl text-dark-blue mb-4 font-semibold tracking-wide">
			Digital Online Competence Kernel
		</p>
		<p class="text-lg md:text-xl text-desert-700 mb-12 font-light">
			Digitális Online Kompetencia Kernel
		</p>

		<!-- Description Card -->
		<div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 border border-desert-200 max-w-3xl mx-auto">
			<div class="prose prose-lg max-w-none">
				<p class="text-lg md:text-xl text-dark-blue leading-relaxed mb-6">
					A <strong>DOCK</strong> egy versenyplatform, amely a HAIO online előválogató fordulóihoz készült.
				</p>
				<p class="text-lg md:text-xl text-dark-blue leading-relaxed mb-6">
					A platform lehetővé teszi a résztvevők számára, hogy különböző mesterséges intelligencia kihívásokban mérjék össze tudásukat, 
					valós idejű eredménylistákkal és automatikus kiértékeléssel.
				</p>
				<div class="mt-8 p-6 bg-warm-blue/10 rounded-lg border-l-4 border-warm-blue">
					<p class="text-base md:text-lg text-desert-800 font-medium m-0">
						🚧 A platform jelenleg aktív fejlesztés alatt áll.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	@keyframes float {
		0%, 100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-20px);
		}
	}

	.animate-float {
		animation: float 3s ease-in-out infinite;
	}

	.prose {
		color: inherit;
	}

	.prose strong {
		color: inherit;
		font-weight: 600;
	}
</style>
