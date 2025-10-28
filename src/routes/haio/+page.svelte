<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import NeuralNetwork from '$lib/components/NeuralNetwork.svelte';
	import Divider from '$lib/components/Divider.svelte';

	interface Notebook {
		title: string;
		category: string;
		colabLink: string;
		preview: string;
		difficulty: 'kezdő' | 'középhaladó' | 'haladó';
		type?: 'colab' | 'drive' | 'pdf';
	}

	const notebooks: Notebook[] = [
        {
			title: 'Save the Factory: Feature Engineering Challenge',
			category: 'IOAI 2024',
			colabLink: 'https://colab.research.google.com/drive/1wJC20hXcpC_0OyTMAj0SgZda6QRDh7_m?usp=sharing',
			preview: 'Take-Home ML Feladat.',
			difficulty: 'középhaladó',
			type: 'colab'
		},
		{
			title: 'Help BOBAI: Classify an unknown language',
			category: 'IOAI 2024',
			colabLink: 'https://colab.research.google.com/drive/1wHzP-L1ldysdMZzDfbimEjPzb8TyycGN?usp=sharing',
			preview: 'Take-Home NLP Feladat.',
			difficulty: 'középhaladó',
			type: 'colab'
		},
		{
			title: 'Lost in Translation: Retraining an AI on New World Terms',
			category: 'IOAI 2024',
			colabLink: 'https://colab.research.google.com/drive/1VdPkeADPiS1s9XLd7hWxx9pk_z21Y838?usp=sharing',
			preview: 'Take-Home CV Feladat.',
			difficulty: 'középhaladó',
			type: 'colab'
		},
		{
			title: 'The Madarian Cow Mystery',
			category: 'IOAI 2024',
			colabLink: 'https://colab.research.google.com/drive/11ejZgCFPrsSbImZAmXB4FXpu24uE6_lE?usp=sharing',
			preview: 'On-Site CV Feladat.',
			difficulty: 'haladó',
			type: 'colab'
		},
		{
			title: 'Lost in a Hyperspace: ML Regression challenge',
			category: 'IOAI 2024',
			colabLink: 'https://colab.research.google.com/drive/1dbsyFJckWyi4krGbJ8FBuer6-fE5cfH6?usp=sharing',
			preview: 'On-Site ML Feladat.',
			difficulty: 'haladó',
			type: 'colab'
		},
		{
			title: 'Help BOBAI: More classification in an unknown language',
			category: 'IOAI 2024',
			colabLink: 'https://colab.research.google.com/drive/1zyz5Q5F8Rle9Wehi8sTN5Zg2_1NUpcIw?usp=sharing',
			preview: 'On-Site NLP Feladat.',
			difficulty: 'haladó',
			type: 'colab'
		},
		{
			title: 'AI-Generated cover for a song: Love by Maria Ilieva',
			category: 'IOAI 2024',
			colabLink: `${base}/img/haio/Practical.pdf`,
			preview: 'Practical Round.',
			difficulty: 'középhaladó',
			type: 'pdf'
		},
        {
			title: 'IOAI 2024 - Data',
			category: 'IOAI 2024',
			colabLink: 'https://drive.google.com/drive/folders/1gCb6YlQonuthZbgSHtwUHpWVyjZ4MwC2?usp=sharing',
			preview: 'Adathalmazok a 2024-es IOAI versenyhez.',
			difficulty: 'haladó',
			type: 'drive'
		},




        {
			title: 'Chameleon',
			category: 'IOAI 2025',
			colabLink: 'https://colab.research.google.com/drive/1vcQmf6Zv06NGVAU6gloN0glW0fSPG6tf?usp=sharing',
			preview: 'Take-Home NLP Feladat.',
			difficulty: 'középhaladó',
			type: 'colab'
		},
		{
			title: 'Radar',
			category: 'IOAI 2025',
			colabLink: 'https://colab.research.google.com/drive/1qv756qYytbfqFY8Xeub-q-MNYmpzIlzs?usp=sharing',
			preview: 'Take-Home ML Feladat.',
			difficulty: 'középhaladó',
			type: 'colab'
		},
		{
			title: 'Satellite Weather Forecasting',
			category: 'IOAI 2025',
			colabLink: 'https://colab.research.google.com/drive/1ebFGdcpPbsJvojuIfyN8bsMw2OHk9ixM?usp=sharing',
			preview: 'Take-Home CV Feladat.',
			difficulty: 'középhaladó',
			type: 'colab'
		},
		{
			title: 'Antique Painting Authentication',
			category: 'IOAI 2025',
			colabLink: 'https://colab.research.google.com/github/IOAI-official/IOAI-2025/blob/main/Individual-Contest/Antique/Antique.ipynb',
			preview: 'Individual Contest ML Feladat.',
			difficulty: 'haladó',
			type: 'colab'
		},
		{
			title: 'Chicken Counting',
			category: 'IOAI 2025',
			colabLink: 'https://colab.research.google.com/github/IOAI-official/IOAI-2025/blob/main/Individual-Contest/Chicken_Counting/Chicken_Counting.ipynb',
			preview: 'Individual Contest CV Feladat.',
			difficulty: 'haladó',
			type: 'colab'
		},
		{
			title: 'Concepts',
			category: 'IOAI 2025',
			colabLink: 'https://colab.research.google.com/github/IOAI-official/IOAI-2025/blob/main/Individual-Contest/Concepts/Concepts.ipynb',
			preview: 'Individual Contest NLP Feladat.',
			difficulty: 'haladó',
			type: 'colab'
		},
        {
			title: 'Pixel Efficiency',
			category: 'IOAI 2025',
			colabLink: 'https://colab.research.google.com/github/IOAI-official/IOAI-2025/blob/main/Individual-Contest/Pixel/Pixel.ipynb',
			preview: 'Individual Contest CV Feladat.',
			difficulty: 'haladó',
			type: 'colab'
		},
		{
			title: 'Radar',
			category: 'IOAI 2025',
			colabLink: 'https://colab.research.google.com/github/IOAI-official/IOAI-2025/blob/main/Individual-Contest/Radar/Radar.ipynb',
			preview: 'Individual Contest ML Feladat.',
			difficulty: 'haladó',
			type: 'colab'
		},
		{
			title: 'Restroom Icon Matching',
			category: 'IOAI 2025',
			colabLink: 'https://colab.research.google.com/github/IOAI-official/IOAI-2025/blob/main/Individual-Contest/Restroom/Restroom.ipynb',
			preview: 'Individual Contest CV Feladat.',
			difficulty: 'haladó',
			type: 'colab'
		},
        {
			title: 'IOAI 2025 - Data',
			category: 'IOAI 2025',
			colabLink: 'https://drive.google.com/drive/folders/1XS7smTtJRWJatboZlphUA5QtvDSZNxa0?usp=sharing',
			preview: 'Adathalmazok a 2025-ös IOAI versenyhez.',
			difficulty: 'haladó',
			type: 'drive'
		},

        {
			title: 'Tudományos Forduló',
			category: 'IAIO 2024',
			colabLink: `${base}/img/haio/Scientific.pdf`,
			preview: 'Scientific Round.',
			difficulty: 'középhaladó',
			type: 'pdf'
		},
	];

	let groupedNotebooks: { [key: string]: Notebook[] } = {};
	let previewNotebook: Notebook | null = null;
	let showPreview = false;

	$: {
		groupedNotebooks = notebooks.reduce((acc, notebook) => {
			if (!acc[notebook.category]) {
				acc[notebook.category] = [];
			}
			acc[notebook.category].push(notebook);
			return acc;
		}, {} as { [key: string]: Notebook[] });
	}

	function openPreview(notebook: Notebook) {
		previewNotebook = notebook;
		showPreview = true;
	}

	function closePreview() {
		showPreview = false;
		previewNotebook = null;
	}

	function getDifficultyColor(difficulty: string) {
		switch(difficulty) {
			case 'kezdő': return 'bg-gradient-to-r from-green-700 to-green-800';
			case 'középhaladó': return 'bg-gradient-to-r from-amber-700 to-amber-800';
			case 'haladó': return 'bg-gradient-to-r from-purple-700 to-purple-800';
			default: return 'bg-gradient-to-r from-gray-700 to-gray-800';
		}
	}

	function getTypeConfig(type: string = 'colab') {
		switch(type) {
			case 'colab':
				return {
					icon: `${base}/img/webicons/colab.png`,
					color: '#F9AB00',
					hoverColor: '#E69500',
					headerColor: 'bg-[#F9AB00]',
					buttonText: 'Megnyitás',
					name: 'Colab'
				};
			case 'drive':
				return {
					icon: `${base}/img/webicons/google-drive.png`,
					color: '#0F9D58',
					hoverColor: '#0D8A4E',
					headerColor: 'bg-[#0F9D58]',
					buttonText: 'Megnyitás',
					name: 'Google Drive'
				};
			case 'pdf':
				return {
					icon: `${base}/img/webicons/pdf.png`,
					color: '#DC3545',
					hoverColor: '#C82333',
					headerColor: 'bg-[#DC3545]',
					buttonText: 'Megnyitás',
					name: 'PDF'
				};
			default:
				return {
					icon: `${base}/img/webicons/colab.png`,
					color: '#F9AB00',
					hoverColor: '#E69500',
					headerColor: 'bg-[#F9AB00]',
					buttonText: 'Megnyitás',
					name: 'Colab'
				};
		}
	}

	function reportBug(notebook: Notebook) {
		const subject = `Hiba: ${notebook.title}`;
		const message = `Kedves Szervezők,\n\nEgy hibát találtam a(z) "${notebook.title}" című notebook-ban.\n\nA hiba leírása:\n`;
		const encodedSubject = encodeURIComponent(subject);
		const encodedMessage = encodeURIComponent(message);
		window.location.href = `/contact?subject=${encodedSubject}&message=${encodedMessage}`;
	}

	onMount(() => {
		const observerOptions = {
			threshold: 0.1,
			rootMargin: '0px 0px -100px 0px'
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('show');
				}
			});
		}, observerOptions);

		document.querySelectorAll('.fade-in-section').forEach((el) => {
			observer.observe(el);
		});

		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>HAIO Program | HAIO</title>
</svelte:head>

<!-- Hero Section -->
<section class="min-h-screen bg-desert-100 relative overflow-hidden pt-32 pb-20">
	<!-- Neural Network Background -->
	<div class="absolute inset-0 opacity-20 pointer-events-none">
		<NeuralNetwork nodeCount={25} position="full" />
	</div>
	<div class="container mx-auto px-6 relative z-10 max-w-7xl">
		<!-- Page Title -->
		<div class="text-center mb-20 fade-in-section">
			<h1 class="text-5xl md:text-6xl font-bold text-dark-blue mb-6">
				HAIO Program
			</h1>
			<p class="text-xl text-gray-700 max-w-3xl mx-auto">
				A teljes felkészítési és válogatási folyamat a nemzetközi olimpiákra
			</p>
		</div>

		<!-- Vertical Roadmap -->
		<div class="max-w-4xl mx-auto">
			<!-- MÓLÓ Stage -->
			<div class="relative fade-in-section mb-8">
				<div class="flex items-start gap-6">
					<!-- Timeline Line -->
					<div class="flex flex-col items-center flex-shrink-0">
						<div class="w-16 h-16 bg-gradient-to-br from-warm-blue to-dark-blue rounded-full flex items-center justify-center shadow-xl">
							<span class="text-2xl font-bold text-white">1</span>
						</div>
						<div class="w-1 h-24 bg-gradient-to-b from-warm-blue to-dark-blue"></div>
					</div>
					
					<!-- Content Card -->
					<div class="flex-1 bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-warm-blue">
						<h3 class="text-3xl font-bold text-dark-blue mb-4">MÓLÓ Program</h3>
						<p class="text-gray-600 mb-6 leading-relaxed">
							Ingyenes online felkészítő program mindenkinek. Videó tananyagok, interaktív feladatok és élő szinkron alkalmak szakértő mentorokkal. Alapoktól a haladó technikákig.
						</p>
						<a 
							href="{base}/molo"
							class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-warm-blue to-dark-blue text-white rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
						>
							<span>MÓLÓ Program Részletei</span>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
						</a>
						<div class="mt-6 pt-6 border-t border-gray-200">
							<a 
								href="https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=SLszAZD3YEWmTaxGpHL7vIltOKsbGD1HtZWjpnYwaJ5URENSU0lPWVBCRlBWUEdHMVhNWUdNQ1RaTy4u"
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-2 px-6 py-3 bg-desert-100 hover:bg-desert-200 text-dark-blue rounded-xl font-semibold transition-all duration-300"
							>
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
								</svg>
								Regisztráció
							</a>
						</div>
					</div>
				</div>
			</div>

			<!-- Online Válogató Stage -->
			<div class="relative fade-in-section mb-8">
				<div class="flex items-start gap-6">
					<!-- Timeline Line -->
					<div class="flex flex-col items-center flex-shrink-0">
						<div class="w-16 h-16 bg-gradient-to-br from-warm-blue to-dark-blue rounded-full flex items-center justify-center shadow-xl">
							<span class="text-2xl font-bold text-white">2</span>
						</div>
						<div class="w-1 h-24 bg-gradient-to-b from-warm-blue to-dark-blue"></div>
					</div>
					
					<!-- Content Card -->
					<div class="flex-1 bg-white rounded-2xl shadow-xl p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-warm-blue">
						<h3 class="text-2xl sm:text-3xl font-bold text-dark-blue mb-4">Online Válogató</h3>
						<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
							<div class="flex items-center gap-3 text-gray-600">
								<svg class="w-5 h-5 sm:w-6 sm:h-6 text-warm-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
								</svg>
								<div>
									<div class="text-sm font-semibold text-dark-blue">Időpont</div>
									<div class="text-sm">2026. március</div>
								</div>
							</div>
							<div class="flex items-center gap-3 text-gray-600">
								<svg class="w-5 h-5 sm:w-6 sm:h-6 text-warm-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
								</svg>
								<div>
									<div class="text-sm font-semibold text-dark-blue">Helyszín</div>
									<div class="text-sm">Online</div>
								</div>
							</div>
						</div>
						<div class="flex flex-col sm:flex-row flex-wrap gap-3">
							<button 
								disabled
								class="inline-flex items-center gap-2 px-6 py-3 bg-gray-300 text-gray-500 rounded-xl font-semibold cursor-not-allowed"
							>
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
								</svg>
								Regisztráció (Hamarosan)
							</button>
							<button 
								disabled
								class="inline-flex items-center gap-2 px-6 py-3 bg-gray-300 text-gray-500 rounded-xl font-semibold cursor-not-allowed"
							>
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
								</svg>
								Versenyszabályzat (Hamarosan)
							</button>
						</div>
					</div>
				</div>
			</div>

			<!-- Olimpiai Feladatok Stage -->
			<div class="relative fade-in-section mb-8">
				<div class="flex items-start gap-6">
					<!-- Timeline Line -->
					<div class="flex flex-col items-center flex-shrink-0">
						<div class="w-16 h-16 bg-gradient-to-br from-warm-blue to-dark-blue rounded-full flex items-center justify-center shadow-xl">
							<span class="text-2xl font-bold text-white">3</span>
						</div>
						<div class="w-1 h-24 bg-gradient-to-b from-warm-blue to-dark-blue"></div>
					</div>
					
					<!-- Content Card -->
					<div class="flex-1 bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-warm-blue">
						<h3 class="text-3xl font-bold text-dark-blue mb-4">Olimpiai Feladatok</h3>
						<p class="text-gray-600 leading-relaxed">
							Az online válogató után korábbi évek nemzetközi és regionális olimpiai feladatait oldjuk meg. Ezek a feladatok segítenek felkészülni a magasabb szintű versenyekre, és betekintést nyújtanak a nemzetközi versenyek világába.
						</p>
					</div>
				</div>
			</div>

			<!-- Országos Válogató Stage -->
			<div class="relative fade-in-section mb-8">
				<div class="flex items-start gap-6">
					<!-- Timeline Line -->
					<div class="flex flex-col items-center flex-shrink-0">
						<div class="w-16 h-16 bg-gradient-to-br from-warm-blue to-dark-blue rounded-full flex items-center justify-center shadow-xl">
							<span class="text-2xl font-bold text-white">4</span>
						</div>
						<div class="w-1 h-24 bg-gradient-to-b from-warm-blue to-dark-blue"></div>
					</div>
					
					<!-- Content Card -->
					<div class="flex-1 bg-white rounded-2xl shadow-xl p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-warm-blue">
						<h3 class="text-2xl sm:text-3xl font-bold text-dark-blue mb-4">Országos Válogató</h3>
						<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
							<div class="flex items-center gap-3 text-gray-600">
								<svg class="w-5 h-5 sm:w-6 sm:h-6 text-warm-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
								</svg>
								<div>
									<div class="text-sm font-semibold text-dark-blue">Időpont</div>
									<div class="text-sm">2026. május</div>
								</div>
							</div>
							<div class="flex items-center gap-3 text-gray-600">
								<svg class="w-5 h-5 sm:w-6 sm:h-6 text-warm-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
								</svg>
								<div class="min-w-0">
									<div class="text-sm font-semibold text-dark-blue">Helyszín</div>
									<div class="text-xs sm:text-sm break-words">Budapest, Pázmány Péter stny. 1C, 1117 (ELTE IK)</div>
								</div>
							</div>
						</div>
						<button 
							disabled
							class="inline-flex items-center gap-2 px-6 py-3 bg-gray-300 text-gray-500 rounded-xl font-semibold cursor-not-allowed"
						>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
							</svg>
							Versenyszabályzat (Hamarosan)
						</button>
					</div>
				</div>
			</div>

			<!-- Selection & Branching Stage -->
			<div class="relative fade-in-section mb-8">
				<div class="flex items-start gap-6">
					<!-- Timeline Dot -->
					<div class="flex flex-col items-center flex-shrink-0">
						<div class="w-16 h-16 bg-gradient-to-br from-dark-blue to-warm-blue rounded-full flex items-center justify-center shadow-xl">
							<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</div>
					</div>
					
					<!-- Selection Card -->
					<div class="flex-1 bg-white rounded-2xl shadow-xl p-8 border-2 border-warm-blue hover:shadow-2xl transition-all duration-300">
						<h3 class="text-3xl font-bold text-dark-blue mb-4">Válogatás</h3>
						<p class="text-gray-700 leading-relaxed mb-4">
							A válogató során a legjobban szereplő diákokat választjuk ki a nemzetközi versenyekre: az első 8 helyezett biztosan indulhat az egyik versenyen, további 4 diák pedig a másik versenyre kerülhet. Ez a számítás rugalmas, hiszen előfordulhat, hogy egy diák mindkét versenyre alkalmas, így a pontos létszám a tényleges helyezések és a felkészültség függvénye.
						</p>
					</div>
				</div>
			</div>

			<!-- Branching Indicator -->
			<div class="relative max-w-4xl mx-auto my-16 fade-in-section">
				<div class="flex items-center justify-center gap-8">
					<!-- Left Arrow -->
					<div class="flex-1 flex justify-end">
						<div class="w-32 h-1 bg-gradient-to-r from-transparent via-dark-blue to-dark-blue"></div>
						<div class="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-12 border-l-dark-blue"></div>
					</div>

					<!-- Center Text -->
					<div class="flex-shrink-0 px-8 py-4 bg-gradient-to-r from-dark-blue to-warm-blue rounded-xl shadow-lg">
						<p class="text-2xl font-bold text-white tracking-wide">ÉS / VAGY</p>
					</div>

					<!-- Right Arrow -->
					<div class="flex-1 flex justify-start">
						<div class="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-12 border-r-dark-blue"></div>
						<div class="w-32 h-1 bg-gradient-to-l from-transparent via-dark-blue to-dark-blue"></div>
					</div>
				</div>
			</div>
		</div>

		<!-- International Olympiad Paths -->
		<div class="max-w-7xl mx-auto mt-8">
			<div class="text-center mb-12 fade-in-section">
				<h2 class="text-4xl font-bold text-dark-blue mb-4">Nemzetközi Olimpiák</h2>
				<p class="text-xl text-gray-600">Két párhuzamos útvonal a nemzetközi sikerekhez</p>
			</div>

			<div class="grid md:grid-cols-2 gap-8 fade-in-section">
				<!-- IOAI Path -->
				<div class="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-dark-blue/20 hover:border-dark-blue transition-all duration-300">
					<!-- Header with Image -->
					<div class="relative h-48 overflow-hidden">
						<img 
							src={`${base}/img/ioai/burgas.jpg`} 
							alt="IOAI" 
							class="w-full h-full object-cover"
						/>
						<div class="absolute inset-0 bg-gradient-to-t from-dark-blue/95 to-dark-blue/30"></div>
						<div class="absolute bottom-0 left-0 right-0 p-6">
							<div class="flex flex-col gap-2">
								<img src={`${base}/img/webicons/ioai.png`} alt="IOAI Logo" class="h-12 object-contain object-left" />
								<p class="text-white text-sm font-medium">International Olympiad in AI</p>
							</div>
						</div>
						<!-- Contestant Count Badge -->
						<div class="absolute top-4 right-4 bg-white/95 rounded-full px-4 py-2 shadow-lg">
							<p class="text-dark-blue font-bold text-sm">8 versenyző</p>
						</div>
					</div>

					<!-- Journey Steps -->
					<div class="p-8 space-y-6">
						<!-- Step 1 -->
						<div class="flex items-start gap-4">
							<div class="flex-shrink-0 w-10 h-10 bg-dark-blue rounded-lg flex items-center justify-center text-white font-bold">
								1
							</div>
							<div class="flex-1">
								<h4 class="font-bold text-dark-blue mb-1 text-lg">Take Home Feladatok</h4>
								<p class="text-gray-600">Otthoni előkészítő feladatok az IOAI-ra</p>
							</div>
						</div>

						<!-- Step 2 -->
						<div class="flex items-start gap-4">
							<div class="flex-shrink-0 w-10 h-10 bg-dark-blue rounded-lg flex items-center justify-center">
								<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
								</svg>
							</div>
							<div class="flex-1">
								<h4 class="font-bold text-dark-blue mb-1 text-lg">Nyári Tábor</h4>
								<p class="text-gray-600">Intenzív felkészítés szakértő mentorokkal</p>
							</div>
						</div>

						<!-- Step 3 -->
						<div class="flex items-start gap-4">
							<div class="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-dark-blue to-warm-blue rounded-lg flex items-center justify-center">
								<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							</div>
							<div class="flex-1">
								<h4 class="font-bold text-dark-blue mb-1 text-lg">Nemzetközi Verseny</h4>
								<p class="text-gray-600">Képviseld Magyarországot a világ színpadán</p>
							</div>
						</div>
					</div>
				</div>

				<!-- IAIO Path -->
				<div class="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-dark-blue/20 hover:border-dark-blue transition-all duration-300">
					<!-- Header with Image -->
					<div class="relative h-48 overflow-hidden">
						<img 
							src={`${base}/img/iaio/riyadh.jpg`} 
							alt="IAIO" 
							class="w-full h-full object-cover"
						/>
						<div class="absolute inset-0 bg-gradient-to-t from-dark-blue/95 to-dark-blue/30"></div>
						<div class="absolute bottom-0 left-0 right-0 p-6">
							<div class="flex flex-col gap-2">
								<img src={`${base}/img/webicons/iaio.png`} alt="IAIO Logo" class="h-12 object-contain object-left" />
								<p class="text-white text-sm font-medium">International AI Olympiad</p>
							</div>
						</div>
						<!-- Contestant Count Badge -->
						<div class="absolute top-4 right-4 bg-white/95 rounded-full px-4 py-2 shadow-lg">
							<p class="text-dark-blue font-bold text-sm">4 versenyző</p>
						</div>
					</div>

					<!-- Journey Steps -->
					<div class="p-8 space-y-6">
						<!-- Step 1 -->
						<div class="flex items-start gap-4">
							<div class="flex-shrink-0 w-10 h-10 bg-dark-blue rounded-lg flex items-center justify-center text-white font-bold">
								1
							</div>
							<div class="flex-1">
								<h4 class="font-bold text-dark-blue mb-1 text-lg">Take Home Feladatok</h4>
								<p class="text-gray-600">Otthoni előkészítő feladatok az IAIO-ra</p>
							</div>
						</div>

						<!-- Step 2 -->
						<div class="flex items-start gap-4">
							<div class="flex-shrink-0 w-10 h-10 bg-dark-blue rounded-lg flex items-center justify-center">
								<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
								</svg>
							</div>
							<div class="flex-1">
								<h4 class="font-bold text-dark-blue mb-1 text-lg">Téli Tábor</h4>
								<p class="text-gray-600">Intenzív felkészítés szakértő mentorokkal</p>
							</div>
						</div>

						<!-- Step 3 -->
						<div class="flex items-start gap-4">
							<div class="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-dark-blue to-warm-blue rounded-lg flex items-center justify-center">
								<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							</div>
							<div class="flex-1">
								<h4 class="font-bold text-dark-blue mb-1 text-lg">Nemzetközi Verseny</h4>
								<p class="text-gray-600">Képviseld Magyarországot a világ színpadán</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="bg-desert-100 relative">
	<Divider showCopyright={true} />
</section>

<!-- Nemzetközi Olimpiai Feladatok Section -->
<section id="notebooks" class="min-h-screen bg-desert-100 relative overflow-hidden py-20">
	<!-- Neural Network Background -->
	<div class="absolute inset-0 opacity-20 pointer-events-none">
		<NeuralNetwork nodeCount={25} position="full" />
	</div>
	
	<div class="container mx-auto px-6 relative z-10 max-w-7xl">
		<div class="text-center mb-16 fade-in-section">
			<h2 class="text-4xl md:text-5xl font-bold text-dark-blue mb-6">Nemzetközi Versenyek Feladatai</h2>
			<p class="text-xl text-gray-600">Gyakorolj korábbi évek feladataival</p>
		</div>

		<!-- Notebook Categories -->
		{#each Object.entries(groupedNotebooks) as [category, categoryNotebooks], categoryIndex}
			<div class="mb-16 fade-in-section">
				<h3 class="text-3xl font-bold text-dark-blue mb-8 text-center">{category}</h3>
				
				<!-- Notebooks Grid -->
				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
					{#each categoryNotebooks as notebook}
						{@const typeConfig = getTypeConfig(notebook.type)}
						<div class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col border-2 border-desert-200 hover:border-warm-blue group overflow-hidden relative">
							<!-- Mini Neural Network Background -->
							<div class="absolute inset-0 opacity-5 pointer-events-none">
								<NeuralNetwork />
							</div>

							<!-- Type Badge - Top Right -->
							<div class="absolute top-5 right-5 z-10">
								<img src={typeConfig.icon} alt={typeConfig.name} class="h-7 w-auto drop-shadow-lg" />
							</div>

							<!-- Difficulty Badge - Top Left -->
							<div class="absolute top-5 left-5 z-10">
								<div class="{getDifficultyColor(notebook.difficulty)} text-white px-3 py-1.5 rounded-full text-xs font-bold drop-shadow-lg shadow-lg">
									{notebook.difficulty}
								</div>
							</div>

							<!-- Card Header -->
							<div class="h-2 {typeConfig.headerColor}"></div>
							
							<!-- Card Content -->
							<div class="p-6 flex-1 flex flex-col pt-12 relative z-10">
								<h4 class="text-lg font-bold text-dark-blue mb-3 group-hover:text-warm-blue transition-colors line-clamp-2">
									{notebook.title}
								</h4>
								<p class="text-sm text-gray-600 mb-4 flex-1 line-clamp-3">
									{notebook.preview}
								</p>
								
								<!-- Preview Button -->
								<button 
									on:click={() => openPreview(notebook)}
									class="w-full mb-3 px-4 py-2 bg-desert-100 hover:bg-desert-200 text-dark-blue rounded-lg transition-colors duration-200 text-sm font-medium flex items-center justify-center gap-2"
								>
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
									</svg>
									Előnézet
								</button>
								
								<!-- Open Link Button -->
								<a
									href={notebook.colabLink}
									target="_blank"
									rel="noopener noreferrer"
									class="w-full px-4 py-2 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm font-semibold flex items-center justify-center gap-2 text-white"
									style="background-color: {typeConfig.color};"
									on:mouseenter={(e) => e.currentTarget.style.backgroundColor = typeConfig.hoverColor}
									on:mouseleave={(e) => e.currentTarget.style.backgroundColor = typeConfig.color}
								>
									{#if notebook.type === 'drive'}
										<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
											<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
											<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
											<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
											<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
										</svg>
									{:else if notebook.type === 'pdf'}
										<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
											<path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z"/>
										</svg>
									{:else}
										<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
											<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
											<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
											<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
											<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
										</svg>
									{/if}
									{typeConfig.buttonText}
								</a>
								
								<!-- Report Bug Button -->
								<button 
									on:click={() => reportBug(notebook)}
									class="w-full mt-2 px-3 py-1.5 text-xs text-gray-500 hover:text-red-600 flex items-center justify-center gap-1 transition-colors"
								>
									<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
									</svg>
									Hibajelentés
								</button>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</section>

<!-- Preview Modal -->
{#if showPreview && previewNotebook}
	{@const typeConfig = getTypeConfig(previewNotebook.type)}
	<div 
		class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
		on:click={closePreview}
		on:keydown={(e) => e.key === 'Escape' && closePreview()}
		role="button"
		tabindex="0"
	>
		<div 
			class="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden relative"
			on:click|stopPropagation
			on:keydown|stopPropagation
			role="dialog"
			tabindex="-1"
		>
			<!-- Modal Header -->
			<div class="bg-gradient-to-r from-warm-blue to-dark-blue text-white p-6 flex items-center justify-between">
				<div class="flex items-center gap-4">
					<img src={typeConfig.icon} alt={typeConfig.name} class="h-8 w-auto" />
					<div>
						<h3 class="text-2xl font-bold">{previewNotebook.title}</h3>
						<p class="text-white/90 text-sm">{previewNotebook.category}</p>
					</div>
				</div>
				<button 
					on:click={closePreview}
					class="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors duration-200"
				>
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<!-- Modal Content -->
			{#if previewNotebook.type === 'pdf'}
				<div class="h-[calc(90vh-120px)] bg-white">
					<iframe 
						src={previewNotebook.colabLink} 
						class="w-full h-full"
						title="PDF Preview"
					/>
				</div>
			{:else}
				<div class="h-[calc(90vh-120px)] bg-gray-100 flex flex-col items-center justify-center p-12 text-center">
					<img src={typeConfig.icon} alt={typeConfig.name} class="h-24 w-auto mb-6 opacity-80" />
					<h4 class="text-2xl font-bold text-dark-blue mb-4">
						{#if previewNotebook.type === 'drive'}
							Google Drive Adathalmaz
						{:else}
							Google Colab Notebook
						{/if}
					</h4>
					<p class="text-gray-600 mb-6 max-w-md">
						{#if previewNotebook.type === 'drive'}
							Az adathalmazok a Google Drive-on találhatók. Kattints a gombra alább a mappa megnyitásához.
						{:else}
							A Google Colab notebookok nem jeleníthetők meg előnézetben biztonsági okokból. 
							Kattints a gombra alább a notebook megnyitásához új lapon.
						{/if}
					</p>
					<a
						href={previewNotebook.colabLink}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-3 px-8 py-4 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
						style="background-color: {typeConfig.color};"
						on:mouseenter={(e) => e.currentTarget.style.backgroundColor = typeConfig.hoverColor}
						on:mouseleave={(e) => e.currentTarget.style.backgroundColor = typeConfig.color}
					>
						{#if previewNotebook.type === 'drive'}
							<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
								<path d="M7.71 3.5L1.15 15h3.85L11.45 4.5H7.71zm2.73 0L3.99 15H8.8l6.39-11.5H10.44zm-5.08 13l-2.8 5h21.25l-2.8-5H5.36z"/>
							</svg>
						{:else}
							<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
								<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
								<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
								<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
								<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
							</svg>
						{/if}
						{typeConfig.buttonText}
					</a>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	:global(html) {
		scroll-behavior: smooth;
		scroll-padding-top: 80px;
	}

	.fade-in-section {
		opacity: 0;
		transform: translateY(30px);
		transition: opacity 0.8s ease-out, transform 0.8s ease-out;
	}

	:global(.fade-in-section.show) {
		opacity: 1;
		transform: translateY(0);
	}

	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
