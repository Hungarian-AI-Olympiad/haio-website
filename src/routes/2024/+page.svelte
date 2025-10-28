<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import NeuralNetwork from '$lib/components/NeuralNetwork.svelte';
	import Divider from '$lib/components/Divider.svelte';

	let headerVisible = false;
	let onlineSectionVisible = false;
	let onlineCardVisible = false;
	let onlineResultsVisible = false;
	let divider1Visible = false;
	let orszagosSectionVisible = false;
	let orszagosCardsVisible: boolean[] = [];
	let orszagosResultsVisible = false;
	let divider2Visible = false;
	let teamSelectionVisible = false;
	let IOAITeamVisible: boolean[] = [];
	let IAIOTeamVisible: boolean[] = [];
	let galleryVisible = false;

	let currentGalleryIndex = 0;
	let galleryImages = [
		`${base}/img/haio2024/showcase/453831769_463458906565763_4230807706354839934_n.jpg`,
		`${base}/img/haio2024/showcase/455132747_1283543016350524_3506622522125824179_n.jpg`,
		`${base}/img/haio2024/showcase/455216277_811628561163869_7383893219520138790_n.jpg`,
		`${base}/img/haio2024/showcase/455262037_811628664497192_2482414428621541761_n.jpg`,
		`${base}/img/haio2024/showcase/455283783_811640624495996_3646283899318079648_n.jpg`,
		`${base}/img/haio2024/showcase/455316989_811628421163883_524328895339142969_n.jpg`,
		`${base}/img/haio2024/showcase/Copy of DSC_2403.jpg`,
		`${base}/img/haio2024/showcase/Copy of DSC_2407.jpg`,
		`${base}/img/haio2024/showcase/Copy of DSC_2412 (1).jpg`,
		`${base}/img/haio2024/showcase/Copy of DSC_2412.jpg`,
		`${base}/img/haio2024/showcase/Copy of DSC_2416.jpg`,
		`${base}/img/haio2024/showcase/Copy of DSC_2419.jpg`,
		`${base}/img/haio2024/showcase/Copy of DSC_2651.jpg`,
		`${base}/img/haio2024/showcase/Copy of DSC_2654.jpg`,
		`${base}/img/haio2024/showcase/Copy of DSC_2674.jpg`,
		`${base}/img/haio2024/showcase/Copy of DSC_2678.jpg`,
		`${base}/img/haio2024/showcase/Copy of DSC_2776.jpg`,
		`${base}/img/haio2024/showcase/Copy of DSC_2777.jpg`,
		`${base}/img/haio2024/showcase/Copy of DSC_2779.jpg`,
		`${base}/img/haio2024/showcase/Copy of DSC_2865.jpg`,
		`${base}/img/haio2024/showcase/Copy of DSC_2867.jpg`,
		`${base}/img/haio2024/showcase/Copy of DSC_9040 (1).jpg`,
		`${base}/img/haio2024/showcase/Copy of DSC_9040.jpg`,
		`${base}/img/haio2024/showcase/Copy of DSC_9055 (1).jpg`
	];

	let onlineResults: any[] = [];
	let orszagosResults: any[] = [];

	let orszagosExercises = [
		{
			id: 1,
			title: 'Elrejtett Kincs',
			description: 'Segíthets Intelligens Jánosnak megfejteni a padláson talált könyv fényképein látható furcsa karaktereket, hogy kiderüljön, melyik földrajzi koordinátát rejtik.',
			platform: 'Google Colab',
			tags: ['CV', 'OCR'],
			sponsor: `${base}/img/haio2024/CV1.png`,
			link: 'https://colab.research.google.com/drive/11ejZgCFPrsSbImZAmXB4FXpu24uE6_lE?usp=sharing'
		},
		{
			id: 2,
			title: 'Intelligens János gazda',
			description: 'Készíts egy programot, amely a megadott állatképekről felismeri az állatfajokat, majd fajonként összesíti és megjeleníti az egyedek számát.',
			platform: 'Google Colab',
			tags: ['CV', 'Image Classification'],
			sponsor: `${base}/img/haio2024/CV2.png`,
			link: 'https://colab.research.google.com/drive/1XAajdYgYufmz4jYmnSVqYznSkMmrT2mV?usp=sharing'
		},
		{
			id: 3,
			title: 'Transzfer-tanulás',
			description: 'Készíts egy modellt, és vizsgáld, hogy a neurális hálók mennyire képesek a korábban elsajátított tudást új, hasonló feladatokra átvinni.',
			platform: 'Google Colab',
			tags: ['CV', 'Transfer Learning'],
			sponsor: `${base}/img/haio2024/CV3.jpg`,
			link: 'https://colab.research.google.com/drive/1TAzi7khf_NtAG3nesW6Ifo6vo5n_Si-h?usp=sharing'
		},
		{
			id: 4,
			title: 'Zene-klasszifikáció',
			description: 'Készíts egy modellt, és vizsgáld, hogyan lehet a zenék spektrogramjai alapján a hangmintákat műfaj szerint osztályozni.',
			platform: 'Google Colab',
			tags: ['CV', 'Spectrogram Classification'],
			sponsor: `${base}/img/haio2024/CV4.png`,
			link: 'https://colab.research.google.com/drive/1QMJAY0PkjnHxImaEPM9lmjfmgUy7XzL9?usp=sharing'
		},
		{
			id: 5,
			title: 'Spam SMS-ek',
			description: 'Készíts egy modellt, és vizsgáld, mely SMS-ek minősülnek spamnek Intelligens János számára.',
			platform: 'Google Colab',
			tags: ['NLP', 'Text Classification'],
			sponsor: `${base}/img/haio2024/NLP1.png`,
			link: 'https://colab.research.google.com/drive/1islhU2qmOhSfajeC0SgZ5_PGoujURDVj?usp=sharing'
		},
		{
			id: 6,
			title: 'Twitter Hangulatelemzés',
			description: 'Készíts egy programot, amely a Twitter bejegyzések hangulatát elemzi.',
			platform: 'Google Colab',
			tags: ['NLP', 'Sentiment Analysis'],
			sponsor: `${base}/img/haio2024/NLP2.jpg`,
			link: 'https://colab.research.google.com/drive/1MaDW5hI9AM9K2rl1S_CWF9mvUFM_nT5Z?usp=sharing'
		},
		{
			id: 7,
			title: 'Gépi Fordítás',
			description: 'Készíts egy programot, amely segít Intelligens Jánosnak a francia nyelvű kifejezések és nevek fordításában, hogy megértse a feljegyzéseit.',
			platform: 'Google Colab',
			tags: ['NLP', 'Machine Translation'],
			sponsor: `${base}/img/haio2024/NLP3.png`,
			link: 'https://colab.research.google.com/drive/1TAzi7khf_NtAG3nesW6Ifo6vo5n_Si-h?usp=sharing'
		},
		{
			id: 8,
			title: 'Tű a Szénakazalban',
			description: 'Készíts egy feladatot, amelyben a modellnek hosszú, zajos szövegből kell megtalálnia az elrejtett információt, azaz a „tűt a szénakazalban”.',
			platform: 'Google Colab',
			tags: ['NLP', 'Information Retrieval'],
			sponsor: `${base}/img/haio2024/NLP4.jpg`,
			link: 'https://colab.research.google.com/drive/1csrE1xm-SE8z6vBorJTHbFByhUHGQG6h?usp=sharing'
		}
	];

	orszagosCardsVisible = new Array(orszagosExercises.length).fill(false);

	// Team selection data for 2024
	let IOAITeam = [
		{ name: 'Kovács-Bánhalmi Hédi Zita', school: 'Kecskeméti Bányai Júlia Gimnázium', img_path: `${base}/img/students/IOAI HZ.jpg` },
		{ name: 'Ungár Vince', school: 'Békásmegyeri Veres Péter Gimnázium', img_path: `${base}/img/students/IOAI UV.jpg` },
		{ name: 'Szilágyi Balázs', school: 'Békásmegyeri Veres Péter Gimnázium', img_path: `${base}/img/students/IAIO SZB.jpg` },
		{ name: 'Vajda Ádám', school: 'ELTE Radnóti Miklós Gyakorló Általános Iskola és Gyakorló Gimnázium', img_path: `${base}/img/students/IOAI VA.jpeg` },
		{ name: 'Christ Miranda Anna', school: 'Budapesti Fazekas Mihály Gyakorló Általános Iskola és Gimnázium', img_path: `${base}/img/students/IAIO CM.jpeg` },
		{ name: 'Lehotai Gergely', school: 'Pécsi Janus Pannonius Gimnázium', img_path: `${base}/img/students/IOAI LG.jpeg` },
		{ name: 'Molnár István Ádám', school: 'Földes Ferenc Gimnázium', img_path: `${base}/img/students/IOAI MIA.JPG` },
		{ name: 'Nagy Dávid Leonárd', school: 'ELTE Apáczai Csere János Gyakorló Gimnázium és Kollégium', img_path: `${base}/img/students/IOAI NDL.jpg` }
	];

	let IAIOTeam = [
		{ name: 'Labancz Benedek', school: 'Kecskeméti Bolyai János Gimnázium', img_path: `${base}/img/students/IAIO LB.jpg` },
		{ name: 'Christ Miranda Anna', school: 'Budapesti Fazekas Mihály Gyakorló Általános Iskola és Gimnázium', img_path: `${base}/img/students/IAIO CM.jpeg` },
		{ name: 'Szilágyi Balázs', school: 'Békásmegyeri Veres Péter Gimnázium', img_path: `${base}/img/students/IAIO SZB.jpg` },
		{ name: 'Ungár Vince', school: 'Békásmegyeri Veres Péter Gimnázium', img_path: `${base}/img/students/IOAI UV.jpg` }
	];

	IOAITeamVisible = new Array(IOAITeam.length).fill(false);
	IAIOTeamVisible = new Array(IAIOTeam.length).fill(false);

	function nextGalleryImage() {
		currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
	}

	function prevGalleryImage() {
		currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
	}

	function goToGalleryImage(index: number) {
		currentGalleryIndex = index;
	}

	async function loadCSVData() {
		try {
			const orszagosResponse = await fetch(`${base}/data/orszagos-results-2024.csv`);
			const orszagosText = await orszagosResponse.text();
			orszagosResults = parseCSV(orszagosText);
		} catch (error) {
			// Failed to load CSV data - results will remain empty
		}
	}

	function parseCSV(text: string) {
		const lines = text.trim().split('\n');
		const headers = lines[0].split(',');
		return lines.slice(1).map((line) => {
			const values = line.split(',');
			const obj: any = {};
			headers.forEach((header, index) => {
				obj[header.trim()] = values[index]?.trim() || '';
			});
			return obj;
		});
	}

	function isTopThree(index: number): boolean {
		return index === 0 || index === 1 || index === 2;
	}

	function getInitials(name: string): string {
		return name.split(' ').map(n => n[0]).join('');
	}

	function getMedalClass(index: number) {
		if (index === 0) return 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-lg';
		if (index === 1) return 'bg-gradient-to-br from-gray-300 to-gray-500 text-white shadow-lg';
		if (index === 2) return 'bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg';
		return 'bg-gradient-to-br from-desert-100 to-desert-200 text-dark-blue';
	}

	function getBestInCategory(category: string): number {
		if (orszagosResults.length === 0) return 0;
		return Math.max(...orszagosResults.map(r => parseInt(r[category]) || 0));
	}

	function isBestInCategory(value: string, category: string): boolean {
		const numValue = parseInt(value) || 0;
		return numValue > 0 && numValue === getBestInCategory(category);
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
					} else if (dataAnimate === 'online-section') {
						onlineSectionVisible = true;
					} else if (dataAnimate === 'online-card') {
						onlineCardVisible = true;
					} else if (dataAnimate === 'online-results') {
						onlineResultsVisible = true;
					} else if (dataAnimate === 'divider-1') {
						divider1Visible = true;
					} else if (dataAnimate === 'orszagos-section') {
						orszagosSectionVisible = true;
					} else if (dataAnimate?.startsWith('orszagos-card-')) {
						const index = parseInt(dataAnimate.split('-')[2]);
						orszagosCardsVisible[index] = true;
						orszagosCardsVisible = [...orszagosCardsVisible];
					} else if (dataAnimate === 'orszagos-results') {
						orszagosResultsVisible = true;
					} else if (dataAnimate === 'divider-2') {
						divider2Visible = true;
					} else if (dataAnimate === 'team-selection') {
						teamSelectionVisible = true;
					} else if (dataAnimate?.startsWith('ioai-member-')) {
						const index = parseInt(dataAnimate.split('-')[2]);
						IOAITeamVisible[index] = true;
						IOAITeamVisible = [...IOAITeamVisible];
					} else if (dataAnimate?.startsWith('iaio-member-')) {
						const index = parseInt(dataAnimate.split('-')[2]);
						IAIOTeamVisible[index] = true;
						IAIOTeamVisible = [...IAIOTeamVisible];
					} else if (dataAnimate === 'gallery') {
						galleryVisible = true;
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
	<title>2024 | HAIO</title>
	<meta name="description" content="A 2024-ös Hungarian AI Olympiad verseny eredményei, feladatai és képei." />
</svelte:head>

<section class="min-h-screen bg-desert-100 relative overflow-hidden pt-32 pb-20">
	<!-- Background Neural Network - Fixed to viewport -->
	<div class="fixed inset-0 opacity-20 pointer-events-none" style="z-index: 0;">
		<NeuralNetwork nodeCount={25} position="full" />
	</div>

	<div class="container mx-auto px-6 relative z-10 max-w-7xl">
		<!-- Header -->
		<div
			class="text-center mb-20 transition-all duration-700"
			class:opacity-0={!headerVisible}
			class:translate-y-8={!headerVisible}
			class:opacity-100={headerVisible}
			class:translate-y-0={headerVisible}
			data-animate="header"
		>
			<div class="inline-block mb-4">
				<span class="px-6 py-2 bg-gradient-to-r from-dark-blue to-warm-blue text-white text-sm font-bold rounded-full shadow-lg">
					2024
				</span>
			</div>
			<h1 class="text-5xl md:text-6xl font-bold text-dark-blue mb-4">HAIO 2024</h1>
			<p class="text-desert-700 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
				A 2024-ös év versenyeinek eredményei és feladatai
			</p>
		</div>

		<!-- ORSZÁGOS DÖNTŐ -->
		<div class="mb-24" id="results">
			<div
				class="text-center mb-16 transition-all duration-700"
				class:opacity-0={!orszagosSectionVisible}
				class:translate-y-8={!orszagosSectionVisible}
				class:opacity-100={orszagosSectionVisible}
				class:translate-y-0={orszagosSectionVisible}
				data-animate="orszagos-section"
			>
				<h2 class="text-3xl md:text-4xl font-bold text-dark-blue mb-4">Országos Döntő</h2>
				<p class="text-desert-700 text-base max-w-3xl mx-auto leading-relaxed">
					Az országos döntőn magyarországi és erdélyi 9–12. évfolyamos diákok az ELTE Informatikai Karán személyesen mérték össze tudásukat komplex mesterséges intelligencia feladatokban.
					A verseny öt területen zajlott: elmélet, számítógépes látás (CV, kódolás) és természetes nyelvfeldolgozás (NLP, kódolás).
				</p>
			</div>

			<!-- Exercise Cards -->
			<div class="grid md:grid-cols-2 gap-6 mb-12">
				{#each orszagosExercises as exercise, index (exercise.id)}
					<div
						class="bg-white rounded-xl shadow-lg overflow-hidden border border-desert-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
						class:opacity-0={!orszagosCardsVisible[index]}
						class:translate-y-12={!orszagosCardsVisible[index]}
						class:opacity-100={orszagosCardsVisible[index]}
						class:translate-y-0={orszagosCardsVisible[index]}
						class:md:col-span-2={orszagosExercises.length % 2 !== 0 && index === orszagosExercises.length - 1}
						class:md:max-w-xl={orszagosExercises.length % 2 !== 0 && index === orszagosExercises.length - 1}
						class:md:mx-auto={orszagosExercises.length % 2 !== 0 && index === orszagosExercises.length - 1}
						data-animate="orszagos-card-{index}"
						style="transition-delay: {index * 150}ms;"
					>
						<!-- Top section with background image -->
						<div class="relative h-40 overflow-hidden">
							<!-- Background sponsor image with opacity -->
							<img src={exercise.sponsor} alt={exercise.title} class="absolute inset-0 w-full h-full object-cover opacity-20" />
							
							<!-- Colab icon overlay -->
							<div class="absolute top-3 right-3 z-10">
								<img src={`${base}/img/webicons/colab.png`} alt="Google Colab" class="w-10 h-10 object-contain" />
							</div>
						</div>
						
						<!-- Content section -->
						<div class="p-5 relative overflow-hidden">
							<div class="absolute inset-0 opacity-10">
								<NeuralNetwork nodeCount={12} position="full" />
							</div>
							<div class="relative z-10">
								<h3 class="text-lg font-bold text-dark-blue mb-2">{exercise.title}</h3>
								<p class="text-desert-700 mb-3 leading-relaxed text-sm">{exercise.description}</p>
								<div class="flex flex-wrap gap-1.5 mb-3">
									{#each exercise.tags as tag}
										<span class="px-2.5 py-0.5 bg-gradient-to-r from-warm-blue/10 to-dark-blue/10 text-dark-blue text-xs font-semibold rounded-full border border-warm-blue/20">
											{tag}
										</span>
									{/each}
								</div>
								<a
									href={exercise.link}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-dark-blue to-warm-blue text-white rounded-lg text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
								>
									<span>Feladat megtekintése</span>
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
									</svg>
								</a>
							</div>
						</div>
					</div>
				{/each}
			</div>

			<!-- Statistics Section -->
			<div class="mb-12">
				<!-- Top 3 Podium -->
				<div
					class="mb-12 transition-all duration-700"
					class:opacity-0={!orszagosResultsVisible}
					class:translate-y-12={!orszagosResultsVisible}
					class:opacity-100={orszagosResultsVisible}
					class:translate-y-0={orszagosResultsVisible}
					data-animate="orszagos-results"
				>
					<h3 class="text-2xl font-bold text-dark-blue mb-8 text-center">Dobogósok</h3>
					
					<!-- Mobile: Stacked layout -->
					<div class="flex flex-col items-center gap-6 md:hidden max-w-xs mx-auto">
						<!-- 1st Place (Mobile) -->
						{#if orszagosResults.length > 0}
							<div class="w-full">
								<div class="bg-gradient-to-br from-yellow-50 to-amber-100 rounded-xl p-4 border-4 border-yellow-400 shadow-2xl">
									<div class="flex justify-center mb-3">
										<div class="relative w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center text-2xl font-bold text-white shadow-xl ring-4 ring-yellow-300">
											1
											<div class="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
												<svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
												</svg>
											</div>
										</div>
									</div>
									<div class="text-center">
										<p class="text-xs font-semibold text-amber-600 mb-2">Első helyezett</p>
										<div class="inline-block px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-lg shadow-lg">
											<p class="text-xl font-bold text-white">{orszagosResults[0]['Összpontszám']} <span class="text-xs">pont</span></p>
										</div>
									</div>
								</div>
							</div>
						{/if}

						<!-- 2nd Place (Mobile) -->
						{#if orszagosResults.length > 1}
							<div class="w-full">
								<div class="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-4 border-4 border-gray-400 shadow-xl">
									<div class="flex justify-center mb-3">
										<div class="w-14 h-14 rounded-full bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 flex items-center justify-center text-xl font-bold text-white shadow-lg ring-4 ring-gray-300">
											2
										</div>
									</div>
									<div class="text-center">
										<p class="text-xs font-semibold text-gray-600 mb-2">Második helyezett</p>
										<div class="inline-block px-3 py-1.5 bg-gray-300 rounded-lg">
											<p class="text-xl font-bold text-gray-700">{orszagosResults[1]['Összpontszám']} <span class="text-xs">pont</span></p>
										</div>
									</div>
								</div>
							</div>
						{/if}

						<!-- 3rd Place (Mobile) -->
						{#if orszagosResults.length > 2}
							<div class="w-full">
								<div class="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border-4 border-orange-400 shadow-xl">
									<div class="flex justify-center mb-3">
										<div class="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 flex items-center justify-center text-xl font-bold text-white shadow-lg ring-4 ring-orange-300">
											3
										</div>
									</div>
									<div class="text-center">
										<p class="text-xs font-semibold text-orange-600 mb-2">Harmadik helyezett</p>
										<div class="inline-block px-3 py-1.5 bg-orange-300 rounded-lg">
											<p class="text-xl font-bold text-orange-700">{orszagosResults[2]['Összpontszám']} <span class="text-xs">pont</span></p>
										</div>
									</div>
								</div>
							</div>
						{/if}
					</div>

					<!-- Desktop: Podium layout -->
					<div class="hidden md:flex items-end justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
						<!-- 2nd Place -->
						{#if orszagosResults.length > 1}
							<div class="flex-1 max-w-xs">
								<div class="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-6 border-4 border-gray-400 shadow-xl transform hover:scale-105 transition-all duration-300">
									<div class="flex justify-center mb-4">
										<div class="w-20 h-20 rounded-full bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg ring-4 ring-gray-300">
											2
										</div>
									</div>
									<div class="text-center">
										<p class="text-sm font-semibold text-gray-600 mb-3">Második helyezett</p>
										<div class="inline-block px-4 py-2 bg-gray-300 rounded-lg">
											<p class="text-2xl font-bold text-gray-700">{orszagosResults[1]['Összpontszám']} <span class="text-sm">pont</span></p>
										</div>
									</div>
								</div>
							</div>
						{/if}

						<!-- 1st Place (Tallest) -->
						{#if orszagosResults.length > 0}
							<div class="flex-1 max-w-xs">
								<div class="bg-gradient-to-br from-yellow-50 to-amber-100 rounded-xl p-6 border-4 border-yellow-400 shadow-2xl transform hover:scale-105 transition-all duration-300 -mt-8">
									<div class="flex justify-center mb-4">
										<div class="relative w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center text-3xl font-bold text-white shadow-xl ring-4 ring-yellow-300">
											1
											<div class="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
												<svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
												</svg>
											</div>
										</div>
									</div>
									<div class="text-center">
										<p class="text-sm font-semibold text-amber-600 mb-3">Első helyezett</p>
										<div class="inline-block px-4 py-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-lg shadow-lg">
											<p class="text-3xl font-bold text-white">{orszagosResults[0]['Összpontszám']} <span class="text-sm">pont</span></p>
										</div>
									</div>
								</div>
							</div>
						{/if}

						<!-- 3rd Place -->
						{#if orszagosResults.length > 2}
							<div class="flex-1 max-w-xs">
								<div class="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border-4 border-orange-400 shadow-xl transform hover:scale-105 transition-all duration-300">
									<div class="flex justify-center mb-4">
										<div class="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg ring-4 ring-orange-300">
											3
										</div>
									</div>
									<div class="text-center">
										<p class="text-sm font-semibold text-orange-600 mb-3">Harmadik helyezett</p>
										<div class="inline-block px-4 py-2 bg-orange-300 rounded-lg">
											<p class="text-2xl font-bold text-orange-700">{orszagosResults[2]['Összpontszám']} <span class="text-sm">pont</span></p>
										</div>
									</div>
								</div>
							</div>
						{/if}
					</div>
				</div>

				<!-- Exercise Category Winners -->
				<div
					class="transition-all duration-700"
					class:opacity-0={!orszagosResultsVisible}
					class:translate-y-12={!orszagosResultsVisible}
					class:opacity-100={orszagosResultsVisible}
					class:translate-y-0={orszagosResultsVisible}
					style="transition-delay: 200ms;"
				>
					<h3 class="text-2xl font-bold text-dark-blue mb-2 text-center">Kategória Győztesek</h3>
					<p class="text-center text-gray-600 text-sm mb-8">Maximálisan elért pontszámok kategóriánként</p>
					
					<!-- CV Categories (4 cards) -->
					<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 max-w-6xl mx-auto">
						{#each [
							{key: 'CV-1', label: 'Elrejtett kincs'},
							{key: 'CV-2', label: 'Intelligens János gazda'},
							{key: 'CV-3', label: 'Transzfer-tanulás'},
							{key: 'CV-4', label: 'Képgenerálás'}
						] as category}
							<div class="bg-white rounded-lg p-5 shadow-md border-2 border-dark-blue/20 hover:border-dark-blue hover:shadow-xl transition-all duration-300">
								<div class="flex items-center gap-3 mb-3">
									<div class="w-10 h-10 bg-dark-blue rounded-lg flex items-center justify-center flex-shrink-0">
										<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
										</svg>
									</div>
									<div class="flex-1 min-w-0">
										<h4 class="font-bold text-dark-blue text-sm truncate">{category.label}</h4>
										<p class="text-xs text-gray-500">Computer Vision</p>
									</div>
								</div>
								<div class="flex items-baseline justify-between bg-dark-blue/5 rounded-lg px-3 py-2">
									<span class="text-2xl font-bold text-dark-blue">{getBestInCategory(category.key)}</span>
									<span class="text-xs text-gray-600 font-medium">max. pont</span>
								</div>
							</div>
						{/each}
					</div>

					<!-- NLP Categories (4 cards) -->
					<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 max-w-6xl mx-auto">
						{#each [
							{key: 'NLP-1', label: 'Spam SMS-ek'},
							{key: 'NLP-2', label: 'Gépi Fordítás'},
							{key: 'NLP-3', label: 'Hatékony keresés'},
							{key: 'NLP-4', label: 'Szövegírás LLM-mel'}
						] as category}
							<div class="bg-white rounded-lg p-5 shadow-md border-2 border-dark-blue/20 hover:border-dark-blue hover:shadow-xl transition-all duration-300">
								<div class="flex items-center gap-3 mb-3">
									<div class="w-10 h-10 bg-dark-blue rounded-lg flex items-center justify-center flex-shrink-0">
										<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
										</svg>
									</div>
									<div class="flex-1 min-w-0">
										<h4 class="font-bold text-dark-blue text-sm truncate">{category.label}</h4>
										<p class="text-xs text-gray-500">Natural Language Processing</p>
									</div>
								</div>
								<div class="flex items-baseline justify-between bg-dark-blue/5 rounded-lg px-3 py-2">
									<span class="text-2xl font-bold text-dark-blue">{getBestInCategory(category.key)}</span>
									<span class="text-xs text-gray-600 font-medium">max. pont</span>
								</div>
							</div>
						{/each}
					</div>

					<!-- Theory Category (1 card, centered) -->
					<div class="flex justify-center max-w-6xl mx-auto">
						<div class="w-full md:w-1/2 lg:w-1/4">
							<div class="bg-white rounded-lg p-5 shadow-md border-2 border-dark-blue/20 hover:border-dark-blue hover:shadow-xl transition-all duration-300">
								<div class="flex items-center gap-3 mb-3">
									<div class="w-10 h-10 bg-dark-blue rounded-lg flex items-center justify-center flex-shrink-0">
										<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
										</svg>
									</div>
									<div class="flex-1 min-w-0">
										<h4 class="font-bold text-dark-blue text-sm">Elmélet</h4>
										<p class="text-xs text-gray-500">Theory</p>
									</div>
								</div>
								<div class="flex items-baseline justify-between bg-dark-blue/5 rounded-lg px-3 py-2">
									<span class="text-2xl font-bold text-dark-blue">{getBestInCategory('Elmélet')}</span>
									<span class="text-xs text-gray-600 font-medium">max. pont</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- View Full Results Button -->
				<div class="text-center mt-12 transition-all duration-700"
					class:opacity-0={!orszagosResultsVisible}
					class:translate-y-12={!orszagosResultsVisible}
					class:opacity-100={orszagosResultsVisible}
					class:translate-y-0={orszagosResultsVisible}
					style="transition-delay: 400ms;"
				>
					<a
						href="{base}/2024/results"
						class="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-dark-blue to-warm-blue text-white text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300"
					>
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
						</svg>
						<span>Teljes Eredménylista Megtekintése</span>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
						</svg>
					</a>
				</div>
			</div>
		</div>

	<!-- Old Table (kept for reference, will be moved to separate page) -->
		<div style="display: none;">
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

		<!-- Divider -->
	<div class="my-20" data-animate="divider-2">
		<Divider showCopyright={true} animated={true} visible={divider2Visible} />
	</div>

		<!-- TEAM SELECTION -->
		<div class="mb-24">
			<div
				class="text-center mb-16 transition-all duration-700"
				class:opacity-0={!teamSelectionVisible}
				class:translate-y-8={!teamSelectionVisible}
				class:opacity-100={teamSelectionVisible}
				class:translate-y-0={teamSelectionVisible}
				data-animate="team-selection"
			>
				<h2 class="text-3xl md:text-4xl font-bold text-dark-blue mb-4">Kiválasztott Csapatok</h2>
				<p class="text-desert-700 text-base max-w-3xl mx-auto leading-relaxed">
					Az országos döntő legjobb versenyzői közül kerültek ki a nemzetközi versenyeken Magyarországot képviselő csapatok.
				</p>
			</div>

			<!-- IOAI Team -->
			<div class="mb-12">
				<div class="text-center mb-8">
					<div class="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-dark-blue to-warm-blue text-white rounded-lg shadow-md mb-4">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
						</svg>
						<span class="text-lg font-bold">IOAI Csapat (8 fő)</span>
					</div>
					<img src={`${base}/img/webicons/ioai.png`} alt="IOAI Logo" class="h-16 mx-auto object-contain" />
				</div>

				<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
					{#each IOAITeam as member, index}
						<div
							class="bg-white rounded-lg shadow-md overflow-hidden border border-desert-200/60 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
							class:opacity-0={!IOAITeamVisible[index]}
							class:translate-y-8={!IOAITeamVisible[index]}
							class:opacity-100={IOAITeamVisible[index]}
							class:translate-y-0={IOAITeamVisible[index]}
							data-animate="ioai-member-{index}"
							style="transition-delay: {index * 100}ms;"
						>
							<div class="p-4 flex flex-col items-center">
								<div class="relative mb-3">
									{#if member.img_path}
										<img src={member.img_path} alt={member.name} class="w-20 h-20 rounded-full object-cover shadow-lg ring-4 ring-desert-100" />
									{:else}
										<div class="w-20 h-20 rounded-full bg-gradient-to-br from-warm-blue to-dark-blue flex items-center justify-center shadow-lg ring-4 ring-desert-100">
											<span class="text-2xl font-bold text-white">{getInitials(member.name)}</span>
										</div>
									{/if}
									<div class="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-r from-warm-blue to-dark-blue flex items-center justify-center shadow-md ring-2 ring-white">
										<svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
											<path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
										</svg>
									</div>
								</div>
								<h3 class="text-base font-bold text-dark-blue mb-1 text-center">{member.name}</h3>
								<div class="flex items-start gap-1.5 text-desert-600 text-xs">
									<svg class="w-3.5 h-3.5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
									</svg>
									<span class="text-center leading-tight">{member.school}</span>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- IAIO Team -->
			<div class="mb-8">
				<div class="text-center mb-8">
					<div class="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-dark-blue to-warm-blue text-white rounded-lg shadow-md mb-4">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
						</svg>
						<span class="text-lg font-bold">IAIO Csapat (4 fő)</span>
					</div>
					<img src={`${base}/img/webicons/iaio.png`} alt="IAIO Logo" class="h-16 mx-auto object-contain" />
				</div>

				<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
					{#each IAIOTeam as member, index}
						<div
							class="bg-white rounded-lg shadow-md overflow-hidden border border-desert-200/60 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
							class:opacity-0={!IAIOTeamVisible[index]}
							class:translate-y-8={!IAIOTeamVisible[index]}
							class:opacity-100={IAIOTeamVisible[index]}
							class:translate-y-0={IAIOTeamVisible[index]}
							data-animate="iaio-member-{index}"
							style="transition-delay: {index * 100}ms;"
						>
							<div class="p-4 flex flex-col items-center">
								<div class="relative mb-3">
									{#if member.img_path}
										<img src={member.img_path} alt={member.name} class="w-20 h-20 rounded-full object-cover shadow-lg ring-4 ring-desert-100" />
									{:else}
										<div class="w-20 h-20 rounded-full bg-gradient-to-br from-warm-blue to-dark-blue flex items-center justify-center shadow-lg ring-4 ring-desert-100">
											<span class="text-2xl font-bold text-white">{getInitials(member.name)}</span>
										</div>
									{/if}
									<div class="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-r from-warm-blue to-dark-blue flex items-center justify-center shadow-md ring-2 ring-white">
										<svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
											<path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
										</svg>
									</div>
								</div>
								<h3 class="text-base font-bold text-dark-blue mb-1 text-center">{member.name}</h3>
								<div class="flex items-start gap-1.5 text-desert-600 text-xs">
									<svg class="w-3.5 h-3.5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
									</svg>
									<span class="text-center leading-tight">{member.school}</span>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- Divider before gallery -->
		<div
			class="transition-all duration-700"
			class:opacity-0={!divider2Visible}
			class:opacity-100={divider2Visible}
			data-animate="divider2"
		>
			<Divider showCopyright={true} />
		</div>

		<!-- GALLERY -->
		<div class="mb-4 mt-14">
			<div
				class="transition-all duration-700"
				class:opacity-0={!galleryVisible}
				class:translate-y-12={!galleryVisible}
				class:opacity-100={galleryVisible}
				class:translate-y-0={galleryVisible}
				data-animate="gallery"
			>
				<h2 class="text-3xl md:text-4xl font-bold text-dark-blue mb-8 text-center">Galéria</h2>
				
				<div class="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl mb-4 flex items-center justify-center bg-black">
					<img src={galleryImages[currentGalleryIndex]} alt="HAIO 2024 Gallery" class="h-full w-auto object-contain" />

					<button
						on:click={prevGalleryImage}
						aria-label="Előző kép"
						class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110"
					>
						<svg class="w-5 h-5 text-dark-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
						</svg>
					</button>

					<button
						on:click={nextGalleryImage}
						aria-label="Következő kép"
						class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110"
					>
						<svg class="w-5 h-5 text-dark-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
						</svg>
					</button>
				</div>

				<div class="flex gap-2 justify-center overflow-x-auto pb-2">
					{#each galleryImages as image, index}
						<button
							on:click={() => goToGalleryImage(index)}
							class="flex-shrink-0 h-20 rounded-lg overflow-hidden border-3 transition-all duration-300 flex items-center justify-center bg-black"
							class:border-dark-blue={currentGalleryIndex === index}
							class:border-transparent={currentGalleryIndex !== index}
							class:opacity-100={currentGalleryIndex === index}
							class:opacity-50={currentGalleryIndex !== index}
						>
							<img src={image} alt="Thumbnail {index + 1}" class="h-full w-auto object-contain" />
						</button>
					{/each}
				</div>
			</div>
		</div>
</section>
