<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import NeuralNetwork from '$lib/components/NeuralNetwork.svelte';
	import Divider from '$lib/components/Divider.svelte';

	interface Notebook {
		title: string;
		category: string;
		colabLink: string;
		preview: string;
		type: 'colab' | 'youtube' | 'drive';
		difficulty: 'kezdő' | 'középhaladó' | 'haladó';
	}

	interface RoadmapStation {
		id: string;
		title: string;
		playlistUrl: string;
		description: string;
		thumbnailVideoId: string;
		difficulty: 'kezdő' | 'középhaladó' | 'haladó';
	}

	const roadmapStations: RoadmapStation[] = [
		{
			id: 'bevezeto',
			title: 'Bevezető a Gépi Tanulásba',
			playlistUrl: 'https://youtube.com/playlist?list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU&si=yifICg9s-88ACRcN',
			description: 'Bevezetés a gépi tanulásba (Stanford).',
			thumbnailVideoId: 'jGwO_UgTS7I', // CS221 - First video from the playlist
			difficulty: 'kezdő'
		},
		{
			id: 'klasszikus',
			title: 'Bevezető a Mélytanulásba',
			playlistUrl: 'https://www.youtube.com/playlist?list=PLoROMvodv4rOABXSygHTsbvUz4G_YQhOb',
			description: 'Bevezetés a mélytanulás alapjaiba és technikáiba (Stanford).',
			thumbnailVideoId: 'PySo_6S4ZAg', // CS230 - First video from the playlist
			difficulty: 'középhaladó'
		},
		{
			id: 'latas',
			title: 'Bevezető a Gépi Látásba',
			playlistUrl: 'https://www.youtube.com/playlist?list=PL5-TkQAfAZFbzxjBHtzdVCWE0Zbhomg7r',
			description: 'Computer Vision és képfeldolgozás (Stanford).',
			thumbnailVideoId: 'vT1JzLTH4G4', // CS231n - First video from the playlist
			difficulty: 'haladó'
		},
		{
			id: 'nlp',
			title: 'Bevezető a Nyelvfeldolgozásba',
			playlistUrl: 'https://www.youtube.com/playlist?list=PLoROMvodv4rMFqRtEuo6SGjY4XbRIVRd4',
			description: 'Természetes nyelvfeldolgozás és szöveganalízis (Stanford).',
			thumbnailVideoId: 'rmVRLeJRkl4', // CS224N - First video from the playlist
			difficulty: 'haladó'
		}
		
	];

	const notebooks: Notebook[] = [
		{
			title: '1. Alkalom: MÓLÓ és HAIO bemutatása',
			category: 'Online Szakkör Felvételek',
			colabLink: 'https://youtu.be/gYJDqr03l4E',
			preview: 'Bevezetés a Mesterséges Intelligencia alapjaiba.',
			type: 'youtube',
			difficulty: 'kezdő'
		},
		{
			title: 'Google Colab Notebook bevezető',
			category: 'Programozási Háttér',
			colabLink: 'https://colab.research.google.com/drive/1z7iYIT576djhJgzDssG51WO1TCLovEL2?usp=sharing',
			preview: 'Google Colab alapok és használat.',
			type: 'colab',
			difficulty: 'kezdő'
		},
		{
			title: 'Python Telepítés',
			category: 'Programozási Háttér',
			colabLink: 'https://youtu.be/azhw7rTw_e0',
			preview: 'Python telepítése és környezet beállítása.',
			type: 'youtube',
			difficulty: 'kezdő'
		},
		{
			title: 'Python Alapok',
			category: 'Programozási Háttér',
			colabLink: 'https://youtu.be/plWVZk1uqCs',
			preview: 'Python alapok és szintaxis.',
			type: 'youtube',
			difficulty: 'kezdő'
		},

		{
			title: 'Strukturált, strukturálatlan adat',
			category: 'Adatok és Előkészítés',
			colabLink: 'https://colab.research.google.com/drive/1KWFI1CZE2u9Fl8eXPu8_2rbSF6DWQnnJ?usp=sharing',
			preview: 'Adatok típusai és előkészítési technikák.',
			type: 'colab',
			difficulty: 'kezdő'
		},
		{
			title: 'Adatvizualizáció (matplotlib, adatok ábrázolása feature-ök szerint)',
			category: 'Adatok és Előkészítés',
			colabLink: 'https://colab.research.google.com/drive/1EoZ3O-4OhMDj9nvKNLea4OV9Yk9KL7yK?usp=sharing',
			preview: 'Adatok vizualizálása matplotlib segítségével.',
			type: 'colab',
			difficulty: 'kezdő'
		},

		{
			title: 'Neuronok, Hebb-i tanulás és a SOM',
			category: 'Bevezetés a Mélytanulásba',
			colabLink: 'https://youtu.be/P5ix22jwuU0',
			preview: 'Neuronok, Hebb-i tanulás és a SOM.',
			type: 'youtube',
			difficulty: 'kezdő'
		},
		{
			title: 'Hopfield Hálók',
			category: 'Bevezetés a Mélytanulásba',
			colabLink: 'https://youtu.be/3I39Ctb2zs8',
			preview: 'Hopfield hálók és dinamikai modellek.',
			type: 'youtube',
			difficulty: 'kezdő'
		},
		{
			title: 'Tanulási Módszerek',
			category: 'Bevezetés a Mélytanulásba',
			colabLink: 'https://youtu.be/F0DUeJws5RI',
			preview: 'Tanulási módszerek és algoritmusok.',
			type: 'youtube',
			difficulty: 'kezdő'
		},
		{
			title: 'Tanítás',
			category: 'Bevezetés a Mélytanulásba',
			colabLink: 'https://youtu.be/f1KdzbnPmE4',
			preview: 'Tanítási módszerek és technikák.',
			type: 'youtube',
			difficulty: 'kezdő'
		},
		{
			title: 'Regularizációs Módszerek',
			category: 'Bevezetés a Mélytanulásba',
			colabLink: 'https://youtu.be/fGx06CK-a9c',
			preview: 'Regularizációs módszerek és technikák.',
			type: 'youtube',
			difficulty: 'középhaladó'
		},
		{
			title: 'Képfeldolgozás, Konvolúció',
			category: 'Bevezetés a Mélytanulásba',
			colabLink: 'https://youtu.be/71wtW6-zNH8',
			preview: 'Képfeldolgozás és konvolúciós neurális hálók.',
			type: 'youtube',
			difficulty: 'középhaladó'
		},
		{
			title: 'Képfeldolgozás, Konvolúció',
			category: 'Bevezetés a Mélytanulásba',
			colabLink: 'https://youtu.be/71wtW6-zNH8',
			preview: 'Képfeldolgozás és konvolúciós neurális hálók.',
			type: 'youtube',
			difficulty: 'középhaladó'
		},
		{
			title: 'Szekvencia Feldolgozás',
			category: 'Bevezetés a Mélytanulásba',
			colabLink: 'https://youtu.be/LMRNiqtgGyk',
			preview: 'Szekvenciák feldolgozása rekurrens neurális hálókkal.',
			type: 'youtube',
			difficulty: 'középhaladó'
		},
		{
			title: 'Gépi Fordítás',
			category: 'Bevezetés a Mélytanulásba',
			colabLink: 'https://youtu.be/MkC8ULKDxN8',
			preview: 'Gépi fordítás és alkalmazásai.',
			type: 'youtube',
			difficulty: 'középhaladó'
		},
		{
			title: 'Transformer Architektúra',
			category: 'Bevezetés a Mélytanulásba',
			colabLink: 'https://youtu.be/fWjFqJXyoJU',
			preview: 'Transformer architektúrák és alkalmazásaik.',
			type: 'youtube',
			difficulty: 'középhaladó'
		},
		{
			title: 'Előadás Anyagok - Bevezetés a Mélytanulásba',
			category: 'Bevezetés a Mélytanulásba',
			colabLink: 'https://drive.google.com/drive/folders/1hP41xKiltifEp9CvhiKhSRS7j0kTNlQg?usp=sharing',
			preview: 'Előadás anyagok és források.',
			type: 'drive',
			difficulty: 'középhaladó'
		},


		{
			title: 'Bevezető Fogalmak',
			category: 'Bevezetés a Mélytanulásba',
			colabLink: 'https://colab.research.google.com/drive/1iadQGV-lrEDyHQ44nVJ1TgVldYi9bI30?usp=sharing',
			preview: 'Gépi tanulás fogalma és feladatai.',
			type: 'colab',
			difficulty: 'kezdő'
		},
		{
			title: 'Neuronok',
			category: 'Bevezetés a Mélytanulásba',
			colabLink: 'https://colab.research.google.com/drive/1b2pzMOueeXi5aMK2XFibyts2qmc1o55J?usp=sharing',
			preview: 'Neuronok és Hebb-i tanulás.',
			type: 'colab',
			difficulty: 'kezdő'
		},
		{
			title: 'Hopfield Hálók',
			category: 'Bevezetés a Mélytanulásba',
			colabLink: 'https://colab.research.google.com/drive/1s0mT6-uCtorasKVJgtNSPWzTiZWHwX2R?usp=sharing',
			preview: 'Hopfield hálók és dinamikai modellek.',
			type: 'colab',
			difficulty: 'kezdő'
		},
		{
			title: 'Tanulási Módszerek',
			category: 'Bevezetés a Mélytanulásba',
			colabLink: 'https://colab.research.google.com/drive/1EQcLlCbp5_uUlkK-K46BrSwcbnpfwM8B?usp=sharing',
			preview: 'Tanulási módszerek és algoritmusok.',
			type: 'colab',
			difficulty: 'kezdő'
		},
		{
			title: 'Tanítási Nehézségek',
			category: 'Bevezetés a Mélytanulásba',
			colabLink: 'https://colab.research.google.com/drive/1yrhjb8a9F0gJ32TPv_aKC1al0hxXvzKU?usp=sharing',
			preview: 'Tanítási nehézségek és megoldások.',
			type: 'colab',
			difficulty: 'középhaladó'
		},
		{
			title: 'Regularizáció',
			category: 'Bevezetés a Mélytanulásba',
			colabLink: 'https://colab.research.google.com/drive/1QXU37h5-P77qmX2Zk_BkDlh1iT3Zo7B6?usp=sharing',
			preview: 'Regularizációs technikák és alkalmazásuk.',
			type: 'colab',
			difficulty: 'középhaladó'
		},
		{
			title: 'Konvolúciós Neurális Hálók',
			category: 'Bevezetés a Mélytanulásba',
			colabLink: 'https://colab.research.google.com/drive/1mkcNEcISjCiHNnj4I4cbTVVFFi6dEcvh?usp=sharing',
			preview: 'Konvolúciós neurális hálók és alkalmazásuk.',
			type: 'colab',
			difficulty: 'középhaladó'
		},
		{
			title: 'Szekvenciák Feldolgozása',
			category: 'Bevezetés a Mélytanulásba',
			colabLink: 'https://colab.research.google.com/drive/1tYFkWr07RaClObEl0pic-a3uVPkkBrFV?usp=sharing',
			preview: 'Szekvenciák feldolgozása rekurrens neurális hálókkal.',
			type: 'colab',
			difficulty: 'középhaladó'
		},
		{
			title: 'Gradiens Eltűnés és Robbanás',
			category: 'Bevezetés a Mélytanulásba',
			colabLink: 'https://colab.research.google.com/drive/1czZBZpmdxMEOfSTJOK5mU8T9m8NfhhDa?usp=sharing',
			preview: 'Gradiens eltűnés és robbanás problémák.',
			type: 'colab',
			difficulty: 'középhaladó'
		},
		{
			title: 'Neurális Fordítás',
			category: 'Bevezetés a Mélytanulásba',
			colabLink: 'https://colab.research.google.com/drive/14VAFiFcPKHV6s7spvouv5KvD0uIp9wQy?usp=sharing',
			preview: 'Neurális fordítás és alkalmazásai.',
			type: 'colab',
			difficulty: 'középhaladó'
		},
		{
			title: 'Transzformerek',
			category: 'Bevezetés a Mélytanulásba',
			colabLink: 'https://colab.research.google.com/drive/1M1GKZentcA1K-5zq5GSppEnxasgGvC0D?usp=sharing',
			preview: 'Transzformerek, pointer hálók és alkalmazásaik.',
			type: 'colab',
			difficulty: 'középhaladó'
		},
	];

	let groupedNotebooks: { [key: string]: Notebook[] } = {};
	let previewNotebook: Notebook | null = null;
	let showPreview = false;
	let expandedCategories: Set<string> = new Set();
	let expandedSubCategories: Set<string> = new Set(); // For Videók/Feladatsor

	$: {
		groupedNotebooks = notebooks.reduce((acc, notebook) => {
			if (!acc[notebook.category]) {
				acc[notebook.category] = [];
			}
			acc[notebook.category].push(notebook);
			return acc;
		}, {} as { [key: string]: Notebook[] });
	}

	function toggleCategory(category: string, scrollToTop = false) {
		const wasExpanded = expandedCategories.has(category);
		
		if (wasExpanded) {
			expandedCategories.delete(category);
			// Only scroll back if the category header is out of view
			if (scrollToTop) {
				setTimeout(() => {
					const element = document.getElementById(`category-${category.replace(/\s+/g, '-')}`);
					if (element) {
						const rect = element.getBoundingClientRect();
						const isOutOfView = rect.top < 0 || rect.bottom > window.innerHeight;
						
						if (isOutOfView) {
							element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
						}
					}
				}, 50);
			}
		} else {
			expandedCategories.add(category);
		}
		expandedCategories = expandedCategories;
	}

	function toggleSubCategory(subCategoryKey: string) {
		if (expandedSubCategories.has(subCategoryKey)) {
			expandedSubCategories.delete(subCategoryKey);
		} else {
			expandedSubCategories.add(subCategoryKey);
		}
		expandedSubCategories = expandedSubCategories;
	}

	function getCategoryStats(category: string) {
		const items = groupedNotebooks[category] || [];
		const colab = items.filter(n => n.type === 'colab').length;
		const videos = items.filter(n => n.type === 'youtube').length;
		const drive = items.filter(n => n.type === 'drive').length;
		return { total: items.length, colab, videos, drive, exercises: colab + drive };
	}

	function openPreview(notebook: Notebook) {
		previewNotebook = notebook;
		showPreview = true;
	}

	function closePreview() {
		showPreview = false;
		previewNotebook = null;
	}

	function getYoutubeEmbedUrl(url: string): string {
		try {
			const urlObj = new URL(url);
			// Handle different YouTube URL formats
			if (urlObj.hostname.includes('youtube.com')) {
				const videoId = urlObj.searchParams.get('v');
				if (videoId) {
					return `https://www.youtube.com/embed/${videoId}`;
				}
			} else if (urlObj.hostname.includes('youtu.be')) {
				const videoId = urlObj.pathname.slice(1);
				return `https://www.youtube.com/embed/${videoId}`;
			}
		} catch (e) {
			// Error parsing URL - return original
		}
		return url;
	}

	function getDifficultyColor(difficulty: string) {
		switch(difficulty) {
			case 'kezdő': return 'bg-gradient-to-r from-green-700 to-green-800';
			case 'középhaladó': return 'bg-gradient-to-r from-amber-700 to-amber-800';
			case 'haladó': return 'bg-gradient-to-r from-purple-700 to-purple-800';
			default: return 'bg-gradient-to-r from-gray-700 to-gray-800';
		}
	}

	function reportBug(notebook: Notebook) {
        const subject = `Hiba: ${notebook.title}`;
        const message = `Kedves Szervezők,\n\nEgy hibát találtam a(z) "${notebook.title}" című ${notebook.type === 'colab' ? 'notebook-ban' : 'videóban'}.\n\nA hiba leírása:\n`;
        
        // Create URLSearchParams for query string
        const searchParams = new URLSearchParams();
        searchParams.set('subject', subject);
        searchParams.set('message', message);
        
        // REPLACE window.location.href with goto()
        goto(`${base}/contact?${searchParams.toString()}`);
    }

	function getPreviewUrl(notebook: Notebook) {
		if (notebook.type === 'youtube') {
			// Extract video ID from YouTube URL
			const url = new URL(notebook.colabLink);
			const videoId = url.searchParams.get('v') || url.pathname.split('/').pop();
			return `https://www.youtube.com/embed/${videoId}`;
		} else if (notebook.type === 'drive') {
			// For Google Drive, embed the folder view
			const driveId = notebook.colabLink.split('/folders/')[1].split('?')[0];
			return `https://drive.google.com/embeddedfolderview?id=${driveId}#grid`;
		} else {
			// For Colab, open in new tab instead of iframe (Colab blocks iframes)
			window.open(notebook.colabLink, '_blank');
			return null;
		}
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
	<title>MÓLÓ Program | HAIO</title>
</svelte:head>

<!-- Hero Section -->
<section class="bg-desert-100 relative overflow-hidden pt-32 pb-8 py-16">
	<!-- Neural Network Background (constrained to avoid stretching) -->
	<div class="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
		<!-- Constrain the visual area so the canvas doesn't stretch vertically
			 and reduce node count/opacity for a subtler background. -->
		<div class="w-full max-w-7xl h-56 md:h-72 lg:h-80 overflow-hidden">
			<NeuralNetwork nodeCount={18} position="top" />
		</div>
	</div>
	<div class="container mx-auto px-6 relative z-10 max-w-7xl">
		<!-- Page Title -->
		<div class="text-center mb-12 fade-in-section">
			<h1 class="text-5xl md:text-6xl font-bold text-dark-blue mb-6">
				MÓLÓ Program
			</h1>
			<p class="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
				A Magyar MI Olimpia hivatalos felkészítő programja - ingyenes, mindenki számára elérhető
			</p>
			
			<!-- Registration CTA -->
			<a 
				href="https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=SLszAZD3YEWmTaxGpHL7vIltOKsbGD1HtZWjpnYwaJ5URENSU0lPWVBCRlBWUEdHMVhNWUdNQ1RaTy4u"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-warm-blue to-dark-blue text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
				</svg>
				Regisztráció a Felkészítőre
			</a>
		</div>

		<!-- Three Main Components -->
		<div class="grid md:grid-cols-3 gap-8 mb-0 fade-in-section">
			<!-- Card 1: Interaktív Feladatsor -->
			<div class="relative bg-gradient-to-br from-white via-white to-desert-50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 border-2 border-transparent hover:border-warm-blue group overflow-hidden flex flex-col">
				<!-- Animated background gradient on hover -->
				<div class="absolute inset-0 bg-gradient-to-br from-dark-blue/5 via-transparent to-warm-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
				
				<!-- Decorative corner accent -->
				<div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-dark-blue/10 to-transparent rounded-bl-full transform translate-x-12 -translate-y-12 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500"></div>
				
				<div class="relative z-10 flex flex-col flex-1">
					<div class="w-20 h-20 bg-gradient-to-br from-dark-blue to-warm-blue rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
						<svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
						</svg>
					</div>
					<h3 class="text-2xl font-bold text-dark-blue mb-4 group-hover:text-warm-blue transition-colors duration-300">Interaktív Tananyagok</h3>
					<p class="text-gray-600 leading-relaxed mb-6 flex-1">
						Gyakorlati tananyagok Google Colab notebookokban és YouTube-videókban, azonnal futtatható kóddal. Valódi problémák megoldásán keresztül sajátíthatod el a gépi tanulás alapjait és haladó módszereit. Minden notebook részletes magyarázatokat és lépésről lépésre követhető megoldási útmutatókat tartalmaz.
					</p>
					<a 
						href="#notebooks"
						class="inline-flex items-center gap-2 px-6 py-3 bg-dark-blue text-white rounded-full font-semibold text-sm transition-all duration-300 hover:bg-warm-blue hover:shadow-2xl hover:scale-105 group/btn mt-auto"
					>
						<span>Ugrás a részletekhez</span>
						<svg class="w-4 h-4 transform group-hover/btn:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
						</svg>
					</a>
				</div>
			</div>

			<!-- Card 2: Aszinkron Online Roadmap -->
			<div class="relative bg-gradient-to-br from-white via-white to-desert-50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 border-2 border-transparent hover:border-warm-blue group overflow-hidden flex flex-col">
				<!-- Animated background gradient on hover -->
				<div class="absolute inset-0 bg-gradient-to-br from-warm-blue/5 via-transparent to-dark-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
				
				<!-- Decorative corner accent -->
				<div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-warm-blue/10 to-transparent rounded-bl-full transform translate-x-12 -translate-y-12 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500"></div>
				
				<div class="relative z-10 flex flex-col flex-1">
					<div class="w-20 h-20 bg-gradient-to-br from-warm-blue to-dark-blue rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
						<svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
						</svg>
					</div>
					<h3 class="text-2xl font-bold text-dark-blue mb-4 group-hover:text-warm-blue transition-colors duration-300">Aszinkron Online Roadmap (Angol)</h3>
					<p class="text-gray-600 leading-relaxed mb-6 flex-1">
						Gondosan összeállított videó tananyagok, amelyek lépésről lépésre vezetnek végig a mesterséges intelligencia világán. Saját tempódban tanulhatsz, bármikor, bárhonnan. A bevezető anyagoktól a haladó NLP technikákig minden megtalálható. A tananyagok elsajátításához angol nyelvtudás szükséges.
					</p>
					<a 
						href="#roadmap"
						class="inline-flex items-center gap-2 px-6 py-3 bg-dark-blue text-white rounded-full font-semibold text-sm transition-all duration-300 hover:bg-warm-blue hover:shadow-2xl hover:scale-105 group/btn mt-auto"
					>
						<span>Ugrás a részletekhez</span>
						<svg class="w-4 h-4 transform group-hover/btn:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
						</svg>
					</a>
				</div>
			</div>

			<!-- Card 3: Szinkron Felkészítés -->
			<div class="relative bg-gradient-to-br from-white via-white to-desert-50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 border-2 border-transparent hover:border-warm-blue group overflow-hidden flex flex-col">
				<!-- Animated background gradient on hover -->
				<div class="absolute inset-0 bg-gradient-to-br from-warm-blue/5 via-transparent to-dark-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
				
				<!-- Decorative corner accent -->
				<div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-warm-blue/10 to-transparent rounded-bl-full transform translate-x-12 -translate-y-12 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500"></div>
				
				<div class="relative z-10 flex flex-col flex-1">
					<div class="w-20 h-20 bg-gradient-to-br from-warm-blue to-dark-blue rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
						<svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
						</svg>
					</div>
					<h3 class="text-2xl font-bold text-dark-blue mb-4 group-hover:text-warm-blue transition-colors duration-300">Szinkron Felkészítés</h3>
					<p class="text-gray-600 leading-relaxed mb-6 flex-1">
						Élő online alkalmak szakértő mentorokkal, ahol kérdéseket tehetsz fel, közösen oldotok meg feladatokat és mélyebb betekintést nyerhetsz a témákba. Rendszeres meetupok és workshopok a közösség számára.
					</p>
					<a 
						href="#szinkron"
						class="inline-flex items-center gap-2 px-6 py-3 bg-dark-blue text-white rounded-full font-semibold text-sm transition-all duration-300 hover:bg-warm-blue hover:shadow-2xl hover:scale-105 group/btn mt-auto"
					>
						<span>Ugrás a részletekhez</span>
						<svg class="w-4 h-4 transform group-hover/btn:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
						</svg>
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="bg-desert-100 relative">
	<Divider showCopyright={true} />
</section>

<!-- Interaktív Gyakorló Feladatsorok Section -->
<section id="notebooks" class="bg-desert-100 relative py-16">
	<!-- Neural Network Background - Fixed Height -->
	<div class="absolute top-0 left-0 right-0 h-[800px] opacity-20 pointer-events-none">
		<NeuralNetwork nodeCount={25} position="full" />
	</div>
	
	<div class="container mx-auto px-6 relative z-10 max-w-6xl">
		<div class="text-center mb-16 fade-in-section">
			<h2 class="text-4xl md:text-5xl font-bold text-dark-blue mb-6">Interaktív Gyakorló Tananyagok</h2>
			<p class="text-xl text-gray-600 mb-4">Gyakorlati notebook-ok és videók kategóriák szerint</p>
		</div>

		<!-- Accordion Categories -->
		<div class="space-y-4 fade-in-section">
			{#each Object.entries(groupedNotebooks) as [category, categoryNotebooks], categoryIndex}
				{@const stats = getCategoryStats(category)}
				{@const isExpanded = expandedCategories.has(category)}
				
				<div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-desert-200">
					<!-- Category Header - Clickable -->
					<button
						id="category-{category.replace(/\s+/g, '-')}"
						on:click={() => toggleCategory(category)}
						class="w-full px-8 py-6 flex items-center justify-between hover:bg-desert-50 transition-colors duration-200 group"
					>
						<div class="flex items-center gap-4 flex-1">
							<!-- Category Number Badge -->
							<div class="w-12 h-12 rounded-xl bg-gradient-to-br from-warm-blue to-dark-blue text-white flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-200">
								{categoryIndex + 1}
							</div>
							
							<!-- Category Info -->
							<div class="text-left flex-1">
								<h3 class="text-xl md:text-2xl font-bold text-dark-blue group-hover:text-warm-blue transition-colors duration-200">
									{category}
								</h3>
								<div class="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 text-xs sm:text-sm text-gray-600">
									<span class="flex items-center gap-1">
										<svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
										</svg>
										<span class="hidden sm:inline">{stats.total} elem</span>
										<span class="sm:hidden">{stats.total}</span>
									</span>
									{#if stats.colab > 0}
										<span class="flex items-center gap-1">
											<img src={`${base}/img/webicons/colab.png`} alt="Colab" class="h-3 w-auto sm:h-4" />
											{stats.colab}
										</span>
									{/if}
									{#if stats.videos > 0}
										<span class="flex items-center gap-1 text-red-600">
											<svg class="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
												<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
											</svg>
											{stats.videos}
										</span>
									{/if}
									{#if stats.drive > 0}
										<span class="flex items-center gap-1 text-green-600">
											<img src={`${base}/img/webicons/google-drive.png`} alt="Drive" class="h-3 w-auto sm:h-4" />
											{stats.drive}
										</span>
									{/if}
								</div>
							</div>
						</div>

						<!-- Expand/Collapse Icon -->
						<div class="ml-4">
							<svg 
								class="w-6 h-6 text-dark-blue transform transition-transform duration-300 {isExpanded ? 'rotate-180' : ''}"
								fill="none" 
								stroke="currentColor" 
								viewBox="0 0 24 24"
							>
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
							</svg>
						</div>
					</button>

					<!-- Category Content - Expandable with Sub-Categories -->
					{#if isExpanded}
						{@const videos = categoryNotebooks.filter(n => n.type === 'youtube')}
						{@const exercises = categoryNotebooks.filter(n => n.type === 'colab' || n.type === 'drive')}
						
						<div class="border-t-2 border-desert-200 bg-gradient-to-b from-white to-desert-50/30 p-4 space-y-3">
							
							<!-- Videók Sub-Category -->
							{#if videos.length > 0}
								{@const videosKey = `${category}-videos`}
								{@const isVideosExpanded = expandedSubCategories.has(videosKey)}
								
								<div class="bg-white rounded-xl border-2 border-desert-100 overflow-hidden">
									<button
										on:click={() => toggleSubCategory(videosKey)}
										class="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between hover:bg-desert-50 transition-colors duration-200 group"
									>
										<div class="flex items-center gap-2 sm:gap-3">
											<svg class="w-4 h-4 sm:w-5 sm:h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
												<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
											</svg>
											<span class="text-sm sm:text-base font-bold text-dark-blue group-hover:text-warm-blue transition-colors">Videók</span>
											<span class="text-xs sm:text-sm text-gray-500">({videos.length})</span>
										</div>
										<svg 
											class="w-5 h-5 text-dark-blue transform transition-transform duration-300 {isVideosExpanded ? 'rotate-180' : ''}"
											fill="none" 
											stroke="currentColor" 
											viewBox="0 0 24 24"
										>
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
										</svg>
									</button>

									{#if isVideosExpanded}
										<div class="border-t-2 border-desert-100 p-4 space-y-2 bg-gray-50/50">
											{#each videos as notebook, index}
												<div class="bg-white rounded-lg shadow hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-warm-blue group">
													<div class="p-4 flex items-center gap-3">
														<div class="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-warm-blue/20 to-dark-blue/20 text-dark-blue flex items-center justify-center font-bold text-xs">
															{index + 1}
														</div>
														<div class="flex-shrink-0 w-6 h-6">
															<svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
																<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
															</svg>
														</div>
														<div class="flex-1 min-w-0">
															<h4 class="font-semibold text-dark-blue group-hover:text-warm-blue transition-colors text-sm sm:text-base">
																{notebook.title}
															</h4>
															<p class="text-xs sm:text-sm text-gray-600 mt-0.5 line-clamp-2">
																{notebook.preview}
															</p>
														</div>
														<div class="flex-shrink-0 flex sm:flex-row flex-col items-center gap-2">
															<span class="{getDifficultyColor(notebook.difficulty)} text-white px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
																<span class="sm:hidden">{notebook.difficulty === 'kezdő' ? '1' : notebook.difficulty === 'közép' || notebook.difficulty === 'középhaladó' ? '2' : '3'}</span>
																<span class="hidden sm:inline">{notebook.difficulty}</span>
															</span>
															<div class="flex items-center gap-1.5">
																<button
																	on:click={() => openPreview(notebook)}
																	class="hidden sm:flex p-2 rounded-lg bg-desert-100 hover:bg-warm-blue text-dark-blue hover:text-white transition-all duration-200"
																	title="Előnézet"
																>
																	<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
																		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
																	</svg>
																</button>
																<a
																	href={notebook.colabLink}
																	target="_blank"
																	rel="noopener noreferrer"
																	class="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 flex items-center justify-center"
																	title="Megnyitás"
																>
																	<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
																	</svg>
																</a>
															</div>
														</div>
													</div>
												</div>
											{/each}
										</div>
									{/if}
								</div>
							{/if}

							<!-- Feladatsor Sub-Category -->
							{#if exercises.length > 0}
								{@const exercisesKey = `${category}-exercises`}
								{@const isExercisesExpanded = expandedSubCategories.has(exercisesKey)}
								
								<div class="bg-white rounded-xl border-2 border-desert-100 overflow-hidden">
									<button
										on:click={() => toggleSubCategory(exercisesKey)}
										class="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between hover:bg-desert-50 transition-colors duration-200 group"
									>
										<div class="flex items-center gap-2 sm:gap-3">
											<img src={`${base}/img/webicons/colab.png`} alt="Colab" class="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
											<span class="text-sm sm:text-base font-bold text-dark-blue group-hover:text-warm-blue transition-colors">Feladatsor</span>
											<span class="text-xs sm:text-sm text-gray-500">({exercises.length})</span>
										</div>
										<svg 
											class="w-5 h-5 text-dark-blue transform transition-transform duration-300 {isExercisesExpanded ? 'rotate-180' : ''}"
											fill="none" 
											stroke="currentColor" 
											viewBox="0 0 24 24"
										>
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
										</svg>
									</button>

									{#if isExercisesExpanded}
										<div class="border-t-2 border-desert-100 p-4 space-y-2 bg-gray-50/50">
											{#each exercises as notebook, index}
												<div class="bg-white rounded-lg shadow hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-warm-blue group">
													<div class="p-4 flex items-center gap-3">
														<div class="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-warm-blue/20 to-dark-blue/20 text-dark-blue flex items-center justify-center font-bold text-xs">
															{index + 1}
														</div>
														<div class="flex-shrink-0 w-6 h-6 flex items-center justify-center">
															{#if notebook.type === 'colab'}
																<img src={`${base}/img/webicons/colab.png`} alt="Colab" class="w-6 h-6 object-contain" />
															{:else}
																<img src={`${base}/img/webicons/google-drive.png`} alt="Drive" class="w-6 h-6 object-contain" />
															{/if}
														</div>
														<div class="flex-1 min-w-0">
															<h4 class="font-semibold text-dark-blue group-hover:text-warm-blue transition-colors text-sm sm:text-base">
																{notebook.title}
															</h4>
															<p class="text-xs sm:text-sm text-gray-600 mt-0.5 line-clamp-2">
																{notebook.preview}
															</p>
														</div>
														<div class="flex-shrink-0 flex sm:flex-row flex-col items-center gap-2">
															<span class="{getDifficultyColor(notebook.difficulty)} text-white px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
																<span class="sm:hidden">{notebook.difficulty === 'kezdő' ? '1' : notebook.difficulty === 'közép' || notebook.difficulty === 'középhaladó' ? '2' : '3'}</span>
																<span class="hidden sm:inline">{notebook.difficulty}</span>
															</span>
															<div class="flex items-center gap-1.5">
																<button
																	on:click={() => openPreview(notebook)}
																	class="hidden sm:flex p-2 rounded-lg bg-desert-100 hover:bg-warm-blue text-dark-blue hover:text-white transition-all duration-200"
																	title="Előnézet"
																>
																	<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
																		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
																	</svg>
																</button>
																<a
																	href={notebook.colabLink}
																	target="_blank"
																	rel="noopener noreferrer"
																	class="p-2 {notebook.type === 'colab' ? 'bg-[#F9AB00] hover:bg-[#E69500]' : 'bg-[#0F9D58] hover:bg-[#0D8A4E]'} text-white rounded-lg transition-all duration-200 flex items-center justify-center"
																	title="Megnyitás"
																>
																	<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
																	</svg>
																</a>
															</div>
														</div>
													</div>
												</div>
											{/each}
										</div>
									{/if}
								</div>
							{/if}
						</div>
					{/if}
				</div>
			{/each}
		</div>

		<!-- Quick Stats Summary -->
		<div class="mt-12 bg-white rounded-2xl shadow-lg p-8 border-2 border-desert-200 fade-in-section">
			<h3 class="text-xl font-bold text-dark-blue mb-4 text-center">Összes Tananyag</h3>
			<div class="grid grid-cols-2 md:grid-cols-4 gap-6">
				<div class="text-center">
					<div class="text-3xl font-bold text-dark-blue mb-2">{Object.keys(groupedNotebooks).length}</div>
					<div class="text-sm text-gray-600">Kategória</div>
				</div>
				<div class="text-center">
					<div class="text-3xl font-bold text-[#F9AB00] mb-2">{notebooks.filter(n => n.type === 'colab').length}</div>
					<div class="text-sm text-gray-600">Notebook</div>
				</div>
				<div class="text-center">
					<div class="text-3xl font-bold text-red-600 mb-2">{notebooks.filter(n => n.type === 'youtube').length}</div>
					<div class="text-sm text-gray-600">Videó</div>
				</div>
				<div class="text-center">
					<div class="text-3xl font-bold text-[#0F9D58] mb-2">{notebooks.filter(n => n.type === 'drive').length}</div>
					<div class="text-sm text-gray-600">Adathalmaz</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Preview Modal -->
{#if showPreview && previewNotebook}
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
					{#if previewNotebook.type === 'colab'}
						<img src={`${base}/img/webicons/colab.png`} alt="Colab" class="h-8 w-auto" />
					{:else if previewNotebook.type === 'drive'}
						<img src={`${base}/img/webicons/google-drive.png`} alt="Google Drive" class="h-8 w-auto" />
					{:else}
						<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
							<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
						</svg>
					{/if}
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
			<div class="h-[calc(90vh-120px)] bg-gray-100">
				{#if previewNotebook.type === 'youtube'}
					<!-- YouTube Embed -->
					<iframe
						src={getYoutubeEmbedUrl(previewNotebook.colabLink)}
						class="w-full h-full border-0"
						title="{previewNotebook.title} előnézet"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowfullscreen
					></iframe>
				{:else if previewNotebook.type === 'drive'}
					<!-- Google Drive - show info and open button (avoid embedding which may be blocked) -->
					<div class="h-[calc(90vh-120px)] bg-gray-100 flex flex-col items-center justify-center p-12 text-center">
						<img src={`${base}/img/webicons/google-drive.png`} alt="Google Drive" class="h-24 w-auto mb-6 opacity-80" />
						<h4 class="text-2xl font-bold text-dark-blue mb-4">Google Drive Adathalmaz</h4>
						<p class="text-gray-600 mb-6 max-w-md">
							Az adathalmazok a Google Drive-on találhatók. Kattints a gombra alább a mappa megnyitásához.
						</p>
						<a
							href={previewNotebook.colabLink}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-3 px-8 py-4 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
							style="background-color: #0F9D58;"
							on:mouseenter={(e) => e.currentTarget.style.backgroundColor = '#0D8A4E'}
							on:mouseleave={(e) => e.currentTarget.style.backgroundColor = '#0F9D58'}
						>
							<img src={`${base}/img/webicons/google-drive.png`} alt="Google Drive" class="w-6 h-6" />
							<span>Megnyitás</span>
						</a>
					</div>
				{:else}
					<!-- Colab Preview - Info + Open Button -->
					<div class="h-full flex flex-col items-center justify-center p-12 text-center">
						<img src={`${base}/img/webicons/colab.png`} alt="Colab" class="h-24 w-auto mb-6 opacity-80" />
						<h4 class="text-2xl font-bold text-dark-blue mb-4">Google Colab Notebook</h4>
						<p class="text-gray-600 mb-6 max-w-md">
							A Google Colab notebookok nem jeleníthetők meg előnézetben biztonsági okokból. 
							Kattints a gombra alább a notebook megnyitásához új lapon.
						</p>
						<a
							href={previewNotebook.colabLink}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-3 px-8 py-4 bg-[#F9AB00] hover:bg-[#E69500] text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
						>
							<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
								<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
								<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
								<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
								<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
							</svg>
							Notebook Megnyitása
						</a>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

<section class="bg-desert-100 relative">
	<Divider showCopyright={true} />
</section>

<!-- Ütemterv/Roadmap Section -->
<section id="roadmap" class="bg-desert-100 relative overflow-hidden py-16">
	<!-- Neural Network Background (constrained to avoid stretching) -->
	<div class="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
		<div class="w-full max-w-7xl h-56 md:h-72 lg:h-80 overflow-hidden">
			<NeuralNetwork nodeCount={18} position="top" />
		</div>
	</div>
	
	<div class="container mx-auto px-6 relative z-10 max-w-7xl">
		<div class="text-center mb-16 fade-in-section">
			<h2 class="text-4xl md:text-5xl font-bold text-dark-blue mb-6">Aszinkron Online Roadmap</h2>
			<p class="text-xl text-gray-600">Válassz témát és kezdj bele a tanulásba!</p>
		</div>

		<!-- Modern Roadmap Grid -->
		<div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
			{#each roadmapStations as station, index}
				<div class="relative fade-in-section group" style="animation-delay: {index * 0.1}s">
					<!-- Card -->
					<div class="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-transparent hover:border-warm-blue h-full">
						<!-- Top Badges Row -->
						<div class="absolute top-6 left-6 right-6 z-20 flex items-center justify-between">
							<!-- Number Badge - Left -->
							<div class="w-14 h-14 bg-gradient-to-br from-warm-blue to-dark-blue rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
								<span class="text-xl font-bold text-white">{index + 1}</span>
							</div>
							
							<!-- Difficulty Badge - Right -->
							<div class="{getDifficultyColor(station.difficulty)} text-white px-3 py-1.5 rounded-full text-xs font-bold drop-shadow-lg shadow-lg">
								{station.difficulty}
							</div>
						</div>

						<!-- Decorative Background Pattern -->
						<div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-warm-blue/5 to-dark-blue/5 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500"></div>
						
						<!-- Content -->
						<div class="relative p-8 pt-24">
							<!-- Title -->
							<h3 class="text-2xl font-bold text-dark-blue mb-3 group-hover:text-warm-blue transition-colors duration-300">
								{station.title}
							</h3>
							
							<!-- Description -->
							<p class="text-gray-600 leading-relaxed mb-6">
								{station.description}
							</p>
							
							<!-- YouTube Playlist Thumbnail -->
							<a
								href={station.playlistUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="block aspect-video rounded-xl overflow-hidden shadow-lg mb-4 ring-2 ring-desert-200 group-hover:ring-warm-blue transition-all duration-500 relative group/thumb"
							>
								<!-- Real YouTube Thumbnail -->
							<img 
								src="https://img.youtube.com/vi/{station.thumbnailVideoId}/maxresdefault.jpg"
								alt="{station.title} thumbnail"
								class="w-full h-full object-cover"
							/>								<!-- Dark overlay on hover -->
								<div class="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/30 transition-colors duration-300"></div>
								
								<!-- Play Button Overlay -->
								<div class="absolute inset-0 flex items-center justify-center">
									<div class="w-24 h-24 bg-white/90 rounded-full flex items-center justify-center transform group-hover/thumb:scale-110 transition-transform duration-300 shadow-2xl">
										<svg class="w-12 h-12 text-red-600 ml-2" fill="currentColor" viewBox="0 0 24 24">
											<path d="M8 5v14l11-7z"/>
										</svg>
									</div>
								</div>
								
								<!-- YouTube Badge -->
								<div class="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 shadow-lg">
									<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
										<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
									</svg>
									Playlist
								</div>
							</a>
							
							<!-- Action Button -->
							<a
								href={station.playlistUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-warm-blue to-dark-blue text-white rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold group/btn"
							>
								<svg class="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
									<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
								</svg>
								<span>Teljes Playlist Megnyitása</span>
							</a>
						</div>

						<!-- Progress Indicator - Bottom Accent -->
						<div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-warm-blue via-dark-blue to-warm-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="bg-desert-100 relative">
	<Divider showCopyright={true} />
</section>

<!-- Szinkron Felkészítők Section -->
<section id="szinkron" class="bg-desert-100 relative overflow-hidden py-20">
	<!-- Neural Network Background (constrained to avoid stretching) -->
	<div class="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
		<div class="w-full max-w-7xl h-56 md:h-72 lg:h-80 overflow-hidden">
			<NeuralNetwork nodeCount={18} position="top" />
		</div>
	</div>
    
	<div class="container mx-auto px-8 sm:px-10 md:px-6 relative z-10 max-w-7xl">
		<div class="text-center mb-16 fade-in-section">
			<h2 class="text-4xl md:text-5xl font-bold text-dark-blue mb-6">Szinkron Felkészítők</h2>
		</div>

		<div class="grid md:grid-cols-2 gap-12 items-start fade-in-section max-w-6xl mx-auto">
			<!-- Text Content with Button -->
			<div class="px-6 md:px-0">
				<div class="space-y-5 mb-8">
					<p class="text-base sm:text-lg text-gray-700 leading-relaxed text-justify">
						A szinkron felkészítő alkalmak mindenki számára nyitottak, és remek lehetőséget biztosítanak arra, hogy élőben találkozz a mentorökkal és a többi résztvevővel.
					</p>
					<p class="text-base sm:text-lg text-gray-700 leading-relaxed text-justify">
						Ezeken az alkalmakon közösen oldjuk meg a feladatokat, megbeszéljük a nehezebb témákat, és válaszolunk a felmerülő kérdésekre. Az események időpontjáról és helyszínéről a hivatalos Discord szerverünkön értesülhetsz elsőként.
					</p>
					<p class="text-base sm:text-lg text-gray-700 leading-relaxed text-justify">
						Ne maradj le - csatlakozz még ma a közösségünkhöz!
					</p>
				</div>
				
				<!-- Discord CTA Button -->
				<div class="flex justify-center">
					<a
						href="https://discord.gg/KKTzNebjGW"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-lg font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
					>
						<svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
							<path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
						</svg>
						<span class="whitespace-nowrap">Csatlakozz a Discord Szerverünkhöz</span>
					</a>
				</div>
			</div>

		<!-- Discord Image (reduced size to avoid overpowering the section) -->
		<div class="relative max-w-xs mx-auto px-6 md:px-0">
			<img src={`${base}/img/webicons/discord.png`} alt="Discord" class="w-full h-auto hover:scale-105 transition-transform duration-300" />
		</div>
		</div>
	</div>
</section>

<style>
	:global(html) {
		scroll-behavior: smooth;
		scroll-padding-top: 80px; /* Account for fixed header */
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
