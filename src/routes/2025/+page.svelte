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
	let ioaiTeamVisible: boolean[] = [];
	let iaioTeamVisible: boolean[] = [];
	let galleryVisible = false;

	let currentGalleryIndex = 0;
	let galleryImages = [
		`${base}/img/haio2025/showcase/20250803_104200.jpg`,
		`${base}/img/haio2025/showcase/IMG_6293.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6303.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6359.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6361.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6366.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6367.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6368.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6369.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6371.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6372.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6373.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6374.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6375.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6376.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6399.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6400.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6466.JPG`,
		`${base}/img/haio2025/showcase/IMG_6467.JPG`,
		`${base}/img/haio2025/showcase/IMG_6468.JPG`,
		`${base}/img/haio2025/showcase/IMG_6469.JPG`,
		`${base}/img/haio2025/showcase/IMG_6471.JPG`,
		`${base}/img/haio2025/showcase/IMG_6472.JPG`,
		`${base}/img/haio2025/showcase/IMG_6473.JPG`,
		`${base}/img/haio2025/showcase/IMG_6474.JPG`,
		`${base}/img/haio2025/showcase/IMG_6475.JPG`,
		`${base}/img/haio2025/showcase/IMG_6476.JPG`,
		`${base}/img/haio2025/showcase/IMG_6477.JPG`,
		`${base}/img/haio2025/showcase/IMG_6478.JPG`,
		`${base}/img/haio2025/showcase/IMG_6479.JPG`,
		`${base}/img/haio2025/showcase/IMG_6480.JPG`,
		`${base}/img/haio2025/showcase/IMG_6481.JPG`,
		`${base}/img/haio2025/showcase/IMG_6482.JPG`,
		`${base}/img/haio2025/showcase/IMG_6483.JPG`,
		`${base}/img/haio2025/showcase/IMG_6484.JPG`,
		`${base}/img/haio2025/showcase/IMG_6485.JPG`,
		`${base}/img/haio2025/showcase/IMG_6486.JPG`,
		`${base}/img/haio2025/showcase/IMG_6487.JPG`,
		`${base}/img/haio2025/showcase/IMG_6488.JPG`,
		`${base}/img/haio2025/showcase/IMG_6489.JPG`,
		`${base}/img/haio2025/showcase/IMG_6490.JPG`,
		`${base}/img/haio2025/showcase/IMG_6491.JPG`,
		`${base}/img/haio2025/showcase/IMG_6492.JPG`,
		`${base}/img/haio2025/showcase/IMG_6493.JPG`,
		`${base}/img/haio2025/showcase/IMG_6494.JPG`,
		`${base}/img/haio2025/showcase/IMG_6495.JPG`,
		`${base}/img/haio2025/showcase/IMG_6496.JPG`,
		`${base}/img/haio2025/showcase/IMG_6497.JPG`,
		`${base}/img/haio2025/showcase/IMG_6498.JPG`,
		`${base}/img/haio2025/showcase/IMG_6499.JPG`,
		`${base}/img/haio2025/showcase/IMG_6500.JPG`,
		`${base}/img/haio2025/showcase/IMG_6504.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6505.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6516.JPG`,
		`${base}/img/haio2025/showcase/IMG_6517.JPG`,
		`${base}/img/haio2025/showcase/IMG_6518.JPG`,
		`${base}/img/haio2025/showcase/IMG_6519.JPG`,
		`${base}/img/haio2025/showcase/IMG_6542.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6569.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6572.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6574.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6575.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6576.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6578.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6579.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6581.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6583.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6584.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6586.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6587.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6588.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6589.JPG`,
		`${base}/img/haio2025/showcase/IMG_6593.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6594.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6612.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6613.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6614.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6616.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6632.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6633.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6638.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6644.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6646.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6650.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6652.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6654.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6656.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6667.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6668.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6679.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6685.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6686.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6694.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6704.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6707.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6708.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6713.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6715.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6718.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6729.JPG`,
		`${base}/img/haio2025/showcase/IMG_6730.JPG`,
		`${base}/img/haio2025/showcase/IMG_6731.JPG`,
		`${base}/img/haio2025/showcase/IMG_6732.JPG`,
		`${base}/img/haio2025/showcase/IMG_6733.JPG`,
		`${base}/img/haio2025/showcase/IMG_6734.JPG`,
		`${base}/img/haio2025/showcase/IMG_6735.JPG`,
		`${base}/img/haio2025/showcase/IMG_6736.JPG`,
		`${base}/img/haio2025/showcase/IMG_6737.JPG`,
		`${base}/img/haio2025/showcase/IMG_6738.JPG`,
		`${base}/img/haio2025/showcase/IMG_6739.JPG`,
		`${base}/img/haio2025/showcase/IMG_6741.jpeg`,
		`${base}/img/haio2025/showcase/IMG_6748.jpeg`,
		`${base}/img/haio2025/showcase/Team-Hungary-scaled.jpg`,
		`${base}/img/haio2025/showcase/fe63dd3d61e892c577bce0b5c7e7ce39.jpeg`
	];

	let onlineResults: any[] = [];
	let orszagosResults: any[] = [];

	let onlineExercise = {
		title: 'Egyetemi Felvételi',
		description: 'Készíts egy gépi tanulási modellt, amely a tavalyi felvételi adatok alapján képes előre jelezni, melyik jelentkező felvételt nyerne az egyetemre.',
		platform: 'Kaggle',
		tags: ['Machine Learning', 'Classification', 'ROC-AUC'],
		sponsor: `${base}/img/haio2025/kaggle.png`,
		link: 'https://www.kaggle.com/competitions/magyar-mi-diakolimpia-online-valogato-2025'
	};

	let orszagosExercises = [
		{
			id: 1,
			title: 'Elméleti Kérdések',
			description: 'A kérdéssor tartalmaz kifejtős és feleletválasztós kérdéseket is klasszikus MI-vel kapcsolatban.',
			platform: 'PDF',
			tags: ['Deep Learning', 'RL', 'CV', 'NLP', 'ML', 'Optimization'],
			sponsor: `${base}/img/haio2025/quiz.png`,
			link: `${base}/img/haio2025/1.pdf`
		},
		{
			id: 2,
			title: 'Katakomba Kaland',
			description: 'Készíts egy megerősítéses és mély megerősítéses tanulási modellt, amely megtanulja a hősnő optimális útvonalát a katakombában, elkerülve a veszélyeket és jutalmak segítségével gyűjtve tapasztalatokat.',
			platform: 'Google Colab',
			tags: ['RL', 'TD', 'Monte Carlo', 'Gymnasium'],
			sponsor: `${base}/img/haio2025/RL.png`,
			link: 'https://colab.research.google.com/drive/1jWA2eQDkKK03aUfUqjqsuAefnlseiUO7?usp=sharing'
		},
		{
			id: 3,
			title: 'Petike és a Paraméteres Paletta',
			description: 'Készíts egy modellt, amely a látens térben található pontok alapján generál változatos és kreatív rajzokat Petike stílusában.',
			platform: 'Google Colab',
			tags: ['CV', 'Autoencoder', 'Generative Modeling'],
			sponsor: `${base}/img/haio2025/CV.png`,
			link: 'https://colab.research.google.com/drive/1xvyiAtX23kOS4V0wS_8ziOo3TR28k9Dk?usp=sharing'
		},
		{
			id: 4,
			title: 'Epikus Emojik',
			description: 'Készíts és finomhangolj egy nyelvi modellt, amely angol filmcímek alapján képes megfelelő emoji-sorozatokat generálni.',
			platform: 'Google Colab',
			tags: ['NLP', 'Transformers', 'Text Generation'],
			sponsor: `${base}/img/haio2025/NLP.png`,
			link: 'https://colab.research.google.com/drive/1pPc65oIJzi8UXLQcTgV54QtpYAHgIIuV?usp=sharing'
		},
		{
			id: 5,
			title: 'Klasszifikáló Klón',
			description: 'Készíts egy nem neurális háló alapú gépi tanulási modellt, amely a betanított neurális háló kimenetét próbálja minél pontosabban megközelíteni a teszt adathalmazon.',
			platform: 'Google Colab',
			tags: ['ML', 'Decision Trees', 'Ensemble Methods'],
			sponsor: `${base}/img/haio2025/ML.png`,
			link: 'https://colab.research.google.com/drive/14GscObYmH9I_mm2ZsJthxpY1ImAkmXel?usp=sharing'
		}
	];

	orszagosCardsVisible = new Array(orszagosExercises.length).fill(false);

	// Team selection data for 2025
	let IOAITeam = [
		{ name: 'Ungár Vince', school: 'Békásmegyeri Veres Péter Gimnázium', image: `${base}/img/students/IOAI UV.jpg` },
		{ name: 'Lehotai Gergely', school: 'Pécsi Janus Pannonius Gimnázium', image: `${base}/img/students/IOAI LG.jpeg` },
		{ name: 'Demjén Eszter', school: ',"Silvania" Főgimnázium Zilah', image: `${base}/img/students/IOAI DE.jpg` },
		{ name: 'Labancz Benedek', school: 'Kecskeméti Bolyai János Gimnázium', image: `${base}/img/students/IAIO LB.jpg` },
		{ name: 'Magó Máté László', school: 'Premontrei Szent Norbert Gimnázium', image: `${base}/img/students/IOAI MML.png` },
		{ name: 'Nagy Dávid Leonárd', school: 'ELTE Apáczai Csere János Gyakorló Gimnázium és Kollégium', image: `${base}/img/students/IOAI NDL.jpg` },
		{ name: 'Fleischman Illés Dániel', school: 'Baár-Madas Református Gimnázium', image: `${base}/img/students/IOAI FI.png` },
		{ name: 'Reicher Martin', school: 'Budapest School', image: `${base}/img/students/IOAI RM.jpg` }
	];

	let IAIOTeam = [
		{ name: 'Ungár Vince', school: 'Békásmegyeri Veres Péter Gimnázium', image: `${base}/img/students/IOAI UV.jpg` },
		{ name: 'Szilágyi Balázs', school: 'Békásmegyeri Veres Péter Gimnázium', image: `${base}/img/students/IAIO SZB.jpg` },
		{ name: 'Lehotai Gergely', school: 'Pécsi Janus Pannonius Gimnázium', image: `${base}/img/students/IOAI LG.jpeg` },
		{ name: 'Grassely Bence', school: 'Békásmegyeri Veres Péter Gimnázium', image: `${base}/img/students/IAIO GB.jpg` }
	];

	ioaiTeamVisible = new Array(IOAITeam.length).fill(false);
	iaioTeamVisible = new Array(IAIOTeam.length).fill(false);

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
			const onlineResponse = await fetch('/data/online-results-2025.csv');
			const onlineText = await onlineResponse.text();
			onlineResults = parseCSV(onlineText);

			const orszagosResponse = await fetch('/data/orszagos-results-2025.csv');
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
						ioaiTeamVisible[index] = true;
						ioaiTeamVisible = [...ioaiTeamVisible];
					} else if (dataAnimate?.startsWith('iaio-member-')) {
						const index = parseInt(dataAnimate.split('-')[2]);
						iaioTeamVisible[index] = true;
						iaioTeamVisible = [...iaioTeamVisible];
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
	<title>2025 | HAIO</title>
	<meta name="description" content="A 2025-ös Hungarian AI Olympiad verseny eredményei, feladatai és képei." />
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
					2025
				</span>
			</div>
			<h1 class="text-5xl md:text-6xl font-bold text-dark-blue mb-4">HAIO 2025</h1>
			<p class="text-desert-700 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
				A 2025-ös év versenyeinek eredményei és feladatai
			</p>
		</div>

		<!-- ONLINE ELŐVÁLOGATÓ -->
		<div class="mb-24">
			<div
				class="text-center mb-16 transition-all duration-700"
				class:opacity-0={!onlineSectionVisible}
				class:translate-y-8={!onlineSectionVisible}
				class:opacity-100={onlineSectionVisible}
				class:translate-y-0={onlineSectionVisible}
				data-animate="online-section"
			>
				<h2 class="text-3xl md:text-4xl font-bold text-dark-blue mb-4">Online Előválogató</h2>
				<p class="text-desert-700 text-base max-w-3xl mx-auto leading-relaxed">
					Az online előválogató során a résztvevők Kaggle platformon mérték össze tudásukat egy gépi tanulási feladatban. 
					Azok, akik nagyobb ROC-AUC értéket értek el, mint a baseline, továbbjutottak az országos döntőbe.
				</p>
			</div>

			<!-- Single Horizontal Exercise Card -->
			<div
				class="bg-white rounded-xl shadow-lg overflow-hidden border border-desert-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 mb-12"
				class:opacity-0={!onlineCardVisible}
				class:translate-y-12={!onlineCardVisible}
				class:opacity-100={onlineCardVisible}
				class:translate-y-0={onlineCardVisible}
				data-animate="online-card"
			>
				<div class="flex flex-col md:flex-row">
					<!-- Left side - Sponsor Logo -->
					<div class="relative md:w-64 h-48 md:h-auto overflow-hidden flex-shrink-0">
						<img src={onlineExercise.sponsor} class="absolute inset-0 w-full h-full object-cover opacity-20" alt={onlineExercise.title} />
						<div class="absolute top-4 right-4 z-10">
							<img src={`${base}/img/webicons/Kaggle.png`} alt="Kaggle" class="w-10 h-10 object-contain" />
						</div>
					</div>

					<!-- Right side - Content -->
					<div class="flex-1 p-6 relative overflow-hidden">
						<div class="absolute inset-0 opacity-10">
							<NeuralNetwork nodeCount={15} position="full" />
						</div>
						<div class="relative z-10">
							<div class="flex items-center gap-2 mb-3">
								<span class="px-3 py-1 bg-gradient-to-r from-warm-blue/20 to-dark-blue/20 text-dark-blue text-xs font-bold rounded-lg">
									{onlineExercise.platform}
								</span>
							</div>
							<h3 class="text-xl font-bold text-dark-blue mb-3">{onlineExercise.title}</h3>
							<p class="text-desert-700 mb-4 leading-relaxed text-sm">{onlineExercise.description}</p>
							<div class="flex flex-wrap gap-1.5 mb-4">
								{#each onlineExercise.tags as tag}
									<span class="px-2.5 py-0.5 bg-gradient-to-r from-warm-blue/10 to-dark-blue/10 text-dark-blue text-xs font-semibold rounded-full border border-warm-blue/20">
										{tag}
									</span>
								{/each}
							</div>
							<a
								href={onlineExercise.link}
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
			</div>

			<!-- Statistics Section for Online -->
			<div>
				<!-- Top 3 Podium -->
				<div
					class="mb-12 transition-all duration-700"
					class:opacity-0={!onlineResultsVisible}
					class:translate-y-12={!onlineResultsVisible}
					class:opacity-100={onlineResultsVisible}
					class:translate-y-0={onlineResultsVisible}
					data-animate="online-results"
				>
					<h3 class="text-2xl font-bold text-dark-blue mb-8 text-center">Dobogósok</h3>
					<div class="flex items-end justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
						<!-- 2nd Place -->
						{#if onlineResults.length > 1}
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
											<p class="text-2xl font-bold text-gray-700">{onlineResults[1]['ROC-AUC']}</p>
											<p class="text-xs text-gray-600 mt-1">ROC-AUC</p>
										</div>
									</div>
								</div>
							</div>
						{/if}

						<!-- 1st Place (Tallest) -->
						{#if onlineResults.length > 0}
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
											<p class="text-3xl font-bold text-white">{onlineResults[0]['ROC-AUC']}</p>
											<p class="text-xs text-white mt-1">ROC-AUC</p>
										</div>
									</div>
								</div>
							</div>
						{/if}

						<!-- 3rd Place -->
						{#if onlineResults.length > 2}
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
											<p class="text-2xl font-bold text-orange-700">{onlineResults[2]['ROC-AUC']}</p>
											<p class="text-xs text-orange-700 mt-1">ROC-AUC</p>
										</div>
									</div>
								</div>
							</div>
						{/if}
					</div>
				</div>

				<!-- View Full Results Button -->
				<div class="text-center mt-12 transition-all duration-700"
					class:opacity-0={!onlineResultsVisible}
					class:translate-y-12={!onlineResultsVisible}
					class:opacity-100={onlineResultsVisible}
					class:translate-y-0={onlineResultsVisible}
					style="transition-delay: 400ms;"
				>
					<a
						href="{base}/2025/online-results"
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

		<!-- Divider -->
		<div class="my-20" data-animate="divider-1">
			<Divider showCopyright={true} animated={true} visible={divider1Visible} />
		</div>

		<!-- ORSZÁGOS DÖNTŐ -->
		<div class="mb-24">
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
					A verseny öt területen zajlott: elmélet, számítógépes látás (CV, kódolás), megerősítéses tanulás (RL, kódolás), gépi tanulás (ML, kódolás) és természetes nyelvfeldolgozás (NLP, kódolás).
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

			<!-- Statistics Section for Országos -->
			<div>
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
					<div class="flex items-end justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
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
					
					<!-- All Categories in one row -->
					<div class="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6 max-w-6xl mx-auto">
						{#each [
							{key: 'Első Forduló', label: 'Elmélet', icon: 'trophy'},
							{key: 'ML', label: 'ML', icon: 'brain'},
							{key: 'CV', label: 'CV', icon: 'eye'},
							{key: 'RL', label: 'RL', icon: 'refresh'},
							{key: 'NLP', label: 'NLP', icon: 'chat'}
						] as category}
							<div class="bg-white rounded-lg p-5 shadow-md border-2 border-dark-blue/20 hover:border-dark-blue hover:shadow-xl transition-all duration-300">
								<div class="flex items-center gap-3 mb-3">
									<div class="w-10 h-10 bg-dark-blue rounded-lg flex items-center justify-center flex-shrink-0">
										{#if category.icon === 'trophy'}
											<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
											</svg>
										{:else if category.icon === 'brain'}
											<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
											</svg>
										{:else if category.icon === 'eye'}
											<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
											</svg>
										{:else if category.icon === 'refresh'}
											<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
											</svg>
										{:else}
											<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
											</svg>
										{/if}
									</div>
									<div class="flex-1 min-w-0">
										<h4 class="font-bold text-dark-blue text-xs truncate">{category.label}</h4>
										<p class="text-xs text-gray-500">Kategória</p>
									</div>
								</div>
								<div class="flex items-baseline justify-between bg-dark-blue/5 rounded-lg px-3 py-2">
									<span class="text-2xl font-bold text-dark-blue">{getBestInCategory(category.key)}</span>
									<span class="text-xs text-gray-600 font-medium">max. pont</span>
								</div>
							</div>
						{/each}
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
						href="{base}/2025/results"
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
							class:opacity-0={!ioaiTeamVisible[index]}
							class:translate-y-8={!ioaiTeamVisible[index]}
							class:opacity-100={ioaiTeamVisible[index]}
							class:translate-y-0={ioaiTeamVisible[index]}
							data-animate="ioai-member-{index}"
							style="transition-delay: {index * 100}ms;"
						>
							<div class="p-4 flex flex-col items-center">
								<div class="relative mb-3">
									{#if member.image}
										<img src={member.image} alt={member.name} class="w-20 h-20 rounded-full object-cover shadow-lg ring-4 ring-desert-100" />
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
							class:opacity-0={!iaioTeamVisible[index]}
							class:translate-y-8={!iaioTeamVisible[index]}
							class:opacity-100={iaioTeamVisible[index]}
							class:translate-y-0={iaioTeamVisible[index]}
							data-animate="iaio-member-{index}"
							style="transition-delay: {index * 100}ms;"
						>
							<div class="p-4 flex flex-col items-center">
								<div class="relative mb-3">
									{#if member.image}
										<img src={member.image} alt={member.name} class="w-20 h-20 rounded-full object-cover shadow-lg ring-4 ring-desert-100" />
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
					<img src={galleryImages[currentGalleryIndex]} alt="HAIO 2025 Gallery" class="h-full w-auto object-contain" />

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
	</div>
</section>
