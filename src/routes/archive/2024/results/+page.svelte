<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import NeuralNetwork from '$lib/components/NeuralNetwork.svelte';

	let orszagosResults: any[] = [];
	let headerVisible = false;
	let tableVisible = false;

function goBack(fallback: string) {
	// Prefer going back in history when possible, otherwise navigate to fallback
	try {
		if (history.length > 1) {
			history.back();
		} else {
			window.location.href = fallback;
		}
	} catch (e) {
		window.location.href = fallback;
	}
}

	function parseCSV(text: string) {
		const lines = text.trim().split('\n');
		const headers = lines[0].split(',');
		return lines.slice(1).map((line) => {
			const values = line.split(',');
			const row: any = {};
			headers.forEach((header, index) => {
				row[header.trim()] = values[index]?.trim() || '';
			});
			return row;
		});
	}

	async function loadCSVData() {
		try {
			const orszagosResponse = await fetch(`${base}/data/orszagos-results-2024.csv`);
			const orszagosText = await orszagosResponse.text();
			orszagosResults = parseCSV(orszagosText);
		} catch (error) {
			// Failed to load CSV data
		}
	}

	function getBestInCategory(category: string): number {
		if (orszagosResults.length === 0) return 0;
		return Math.max(...orszagosResults.map(r => parseInt(r[category]) || 0));
	}

	function isBestInCategory(value: string, category: string): boolean {
		const numValue = parseInt(value) || 0;
		return numValue > 0 && numValue === getBestInCategory(category);
	}

	function isTopThree(index: number): boolean {
		return index < 3;
	}

	onMount(() => {
		loadCSVData();

		const observerOptions = {
			root: null,
			rootMargin: '0px',
			threshold: 0.1
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const element = entry.target as HTMLElement;
					const dataAnimate = element.getAttribute('data-animate');

					if (dataAnimate === 'header') {
						headerVisible = true;
					} else if (dataAnimate === 'results-table') {
						tableVisible = true;
					}

					observer.unobserve(entry.target);
				}
			});
		}, observerOptions);

		document.querySelectorAll('[data-animate]').forEach((el) => {
			observer.observe(el);
		});

		return () => {
			observer.disconnect();
		};
	});
</script>

<svelte:head>
	<title>2024 Országos Eredmények - Hungarian AI Olympiad</title>
	<meta name="description" content="A 2024-es Hungarian AI Olympiad országos döntőjének teljes eredménylistája." />
</svelte:head>

<!-- RESULTS PAGE -->
<section class="min-h-screen bg-desert-100 relative overflow-hidden pt-24 pb-12">
	<!-- Neural Network Background -->
	<div class="absolute inset-0 opacity-5">
		<NeuralNetwork nodeCount={30} position="full" />
	</div>

	<div class="container mx-auto px-6 relative z-10">
		<!-- Back Button -->
		<div class="mb-6">
			<a href="{base}/2024#results" on:click|preventDefault={() => goBack(`${base}/2024#results`)} class="inline-flex items-center gap-2 text-warm-blue hover:text-dark-blue transition-colors font-semibold">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
				<span>Vissza a 2024-es évhez</span>
			</a>
		</div>

		<!-- Header -->
		<div 
			class="text-center mb-12 transition-all duration-700"
			class:opacity-0={!headerVisible}
			class:translate-y-8={!headerVisible}
			class:opacity-100={headerVisible}
			class:translate-y-0={headerVisible}
			data-animate="header"
		>
			<div class="inline-block mb-4">
				<span class="px-4 py-2 bg-gradient-to-r from-dark-blue to-warm-blue text-white text-sm font-semibold rounded-full shadow-lg">
					Országos Döntő
				</span>
			</div>
			<h1 class="text-4xl md:text-5xl font-bold text-dark-blue mb-3">
				Teljes Eredménylista 2024
			</h1>
			<p class="text-desert-700 text-base md:text-lg max-w-2xl mx-auto">
				Az országos döntő összes résztvevőjének részletes eredményei
			</p>
		</div>

		<!-- Results Table -->
		<div
			class="bg-white rounded-xl shadow-lg overflow-hidden border border-desert-200 transition-all duration-700"
			class:opacity-0={!tableVisible}
			class:translate-y-12={!tableVisible}
			class:opacity-100={tableVisible}
			class:translate-y-0={tableVisible}
			data-animate="results-table"
		>
			<div class="bg-gradient-to-r from-dark-blue to-warm-blue px-6 py-4">
				<h3 class="text-lg font-bold text-white">Részletes Eredmények</h3>
			</div>
			<div class="overflow-x-auto">
				<table class="w-full">
					<thead class="bg-gradient-to-r from-desert-50 to-desert-100/50 border-b-2 border-desert-300">
						<tr>
							<th class="px-2 py-2 text-center text-xs font-extrabold uppercase tracking-wider text-dark-blue w-16">Helyezés</th>
							<th class="px-2 py-2 text-left text-xs font-extrabold uppercase tracking-wider text-dark-blue">Versenyző ID</th>
							<th class="px-2 py-2 text-center text-xs font-extrabold uppercase tracking-wider text-dark-blue w-14">Elmélet</th>
							<th class="px-2 py-2 text-center text-xs font-extrabold uppercase tracking-wider text-dark-blue w-12">El-1</th>
							<th class="px-2 py-2 text-center text-xs font-extrabold uppercase tracking-wider text-dark-blue w-12">El-2</th>
							<th class="px-2 py-2 text-center text-xs font-extrabold uppercase tracking-wider text-dark-blue w-12">NLP-1</th>
							<th class="px-2 py-2 text-center text-xs font-extrabold uppercase tracking-wider text-dark-blue w-12">NLP-2</th>
							<th class="px-2 py-2 text-center text-xs font-extrabold uppercase tracking-wider text-dark-blue w-12">NLP-3</th>
							<th class="px-2 py-2 text-center text-xs font-extrabold uppercase tracking-wider text-dark-blue w-12">NLP-4</th>
							<th class="px-2 py-2 text-center text-xs font-extrabold uppercase tracking-wider text-dark-blue w-12">CV-1</th>
							<th class="px-2 py-2 text-center text-xs font-extrabold uppercase tracking-wider text-dark-blue w-12">CV-2</th>
							<th class="px-2 py-2 text-center text-xs font-extrabold uppercase tracking-wider text-dark-blue w-12">CV-3</th>
							<th class="px-2 py-2 text-center text-xs font-extrabold uppercase tracking-wider text-dark-blue w-12">CV-4</th>
							<th class="px-2 py-2 text-center text-xs font-extrabold uppercase tracking-wider text-dark-blue w-20">Összpontszám</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-desert-200">
						{#each orszagosResults as result, index}
							<tr class="hover:bg-desert-50/50 transition-colors {index === 0 || index === 1 || index === 2 ? 'bg-desert-50/30' : ''}">
								<td class="px-2 py-2">
									<div class="flex justify-center">
										{#if index === 0}
											<div class="relative w-9 h-9 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center text-xs font-bold text-white shadow-lg ring-2 ring-yellow-300">
												{index + 1}
												<div class="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
													<svg class="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
														<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
													</svg>
												</div>
											</div>
										{:else if index === 1}
											<div class="w-9 h-9 rounded-full bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 flex items-center justify-center text-xs font-bold text-white shadow-lg ring-2 ring-gray-300">
												{index + 1}
											</div>
										{:else if index === 2}
											<div class="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 flex items-center justify-center text-xs font-bold text-white shadow-lg ring-2 ring-orange-300">
												{index + 1}
											</div>
										{:else}
											<div class="w-9 h-9 rounded-full bg-gradient-to-br from-desert-200 to-desert-300 flex items-center justify-center text-xs font-bold text-desert-700">
												{index + 1}
											</div>
										{/if}
									</div>
								</td>
								<td class="px-2 py-2 text-sm font-semibold text-dark-blue">{result['Versenyzői ID']}</td>
								<td class="px-2 py-2">
									<div class="flex justify-center">
										{#if isBestInCategory(result.Elmélet, 'Elmélet')}
											<span class="inline-flex items-center gap-0.5 px-2 py-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold rounded shadow-md">
												<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
												</svg>
												{result.Elmélet}
											</span>
										{:else}
											<span class="text-xs text-desert-700 font-medium">{result.Elmélet || '-'}</span>
										{/if}
									</div>
								</td>
								<td class="px-2 py-2">
									<div class="flex justify-center">
										{#if isBestInCategory(result['El-1'], 'El-1')}
											<span class="inline-flex items-center gap-0.5 px-2 py-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold rounded shadow-md">
												<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
												</svg>
												{result['El-1']}
											</span>
										{:else}
											<span class="text-xs text-desert-700 font-medium">{result['El-1'] || '-'}</span>
										{/if}
									</div>
								</td>
								<td class="px-2 py-2">
									<div class="flex justify-center">
										{#if isBestInCategory(result['El-2'], 'El-2')}
											<span class="inline-flex items-center gap-0.5 px-2 py-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold rounded shadow-md">
												<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
												</svg>
												{result['El-2']}
											</span>
										{:else}
											<span class="text-xs text-desert-700 font-medium">{result['El-2'] || '-'}</span>
										{/if}
									</div>
								</td>
								<td class="px-2 py-2">
									<div class="flex justify-center">
										{#if isBestInCategory(result['NLP-1'], 'NLP-1')}
											<span class="inline-flex items-center gap-0.5 px-2 py-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold rounded shadow-md">
												<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
												</svg>
												{result['NLP-1']}
											</span>
										{:else}
											<span class="text-xs text-desert-700 font-medium">{result['NLP-1'] || '-'}</span>
										{/if}
									</div>
								</td>
								<td class="px-2 py-2">
									<div class="flex justify-center">
										{#if isBestInCategory(result['NLP-2'], 'NLP-2')}
											<span class="inline-flex items-center gap-0.5 px-2 py-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold rounded shadow-md">
												<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
												</svg>
												{result['NLP-2']}
											</span>
										{:else}
											<span class="text-xs text-desert-700 font-medium">{result['NLP-2'] || '-'}</span>
										{/if}
									</div>
								</td>
								<td class="px-2 py-2">
									<div class="flex justify-center">
										{#if isBestInCategory(result['NLP-3'], 'NLP-3')}
											<span class="inline-flex items-center gap-0.5 px-2 py-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold rounded shadow-md">
												<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
												</svg>
												{result['NLP-3']}
											</span>
										{:else}
											<span class="text-xs text-desert-700 font-medium">{result['NLP-3'] || '-'}</span>
										{/if}
									</div>
								</td>
								<td class="px-2 py-2">
									<div class="flex justify-center">
										{#if isBestInCategory(result['NLP-4'], 'NLP-4')}
											<span class="inline-flex items-center gap-0.5 px-2 py-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold rounded shadow-md">
												<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
												</svg>
												{result['NLP-4']}
											</span>
										{:else}
											<span class="text-xs text-desert-700 font-medium">{result['NLP-4'] || '-'}</span>
										{/if}
									</div>
								</td>
								<td class="px-2 py-2">
									<div class="flex justify-center">
										{#if isBestInCategory(result['CV-1'], 'CV-1')}
											<span class="inline-flex items-center gap-0.5 px-2 py-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold rounded shadow-md">
												<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
												</svg>
												{result['CV-1']}
											</span>
										{:else}
											<span class="text-xs text-desert-700 font-medium">{result['CV-1'] || '-'}</span>
										{/if}
									</div>
								</td>
								<td class="px-2 py-2">
									<div class="flex justify-center">
										{#if isBestInCategory(result['CV-2'], 'CV-2')}
											<span class="inline-flex items-center gap-0.5 px-2 py-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold rounded shadow-md">
												<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
												</svg>
												{result['CV-2']}
											</span>
										{:else}
											<span class="text-xs text-desert-700 font-medium">{result['CV-2'] || '-'}</span>
										{/if}
									</div>
								</td>
								<td class="px-2 py-2">
									<div class="flex justify-center">
										{#if isBestInCategory(result['CV-3'], 'CV-3')}
											<span class="inline-flex items-center gap-0.5 px-2 py-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold rounded shadow-md">
												<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
												</svg>
												{result['CV-3']}
											</span>
										{:else}
											<span class="text-xs text-desert-700 font-medium">{result['CV-3'] || '-'}</span>
										{/if}
									</div>
								</td>
								<td class="px-2 py-2">
									<div class="flex justify-center">
										{#if isBestInCategory(result['CV-4'], 'CV-4')}
											<span class="inline-flex items-center gap-0.5 px-2 py-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold rounded shadow-md">
												<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
												</svg>
												{result['CV-4']}
											</span>
										{:else}
											<span class="text-xs text-desert-700 font-medium">{result['CV-4'] || '-'}</span>
										{/if}
									</div>
								</td>
								<td class="px-2 py-2">
									<div class="flex justify-center">
										{#if isTopThree(index)}
											<span class="px-3 py-1.5 bg-gradient-to-r from-warm-blue to-dark-blue text-white text-xs font-bold rounded shadow-lg">
												{result['Összpontszám']}
											</span>
										{:else}
											<span class="px-3 py-1.5 bg-desert-200 text-dark-blue text-xs font-bold rounded">
												{result['Összpontszám']}
											</span>
										{/if}
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>

		<!-- Back button -->
		<div class="mt-12 text-center">
			<a
				href="{base}/2024"
				on:click|preventDefault={() => goBack(`${base}/2024`)}
				class="inline-flex items-center gap-2 px-6 py-3 bg-white text-dark-blue font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-300 border-2 border-desert-200"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
				<span>Vissza</span>
			</a>
		</div>
	</div>
</section>
