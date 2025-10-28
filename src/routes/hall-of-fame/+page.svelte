<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import NeuralNetwork from '$lib/components/NeuralNetwork.svelte';
	import Divider from '$lib/components/Divider.svelte';

	let headerVisible = false;
	let medalistsVisible = false;
	let goldCardsVisible: boolean[] = [];
	let silverCardsVisible: boolean[] = [];
	let bronzeCardsVisible: boolean[] = [];
	let divider1Visible = false;
	let organizersVisible = false;
	let organizerCardsVisible: boolean[] = [];
	let contributorsVisible = false;
	let contributorCardsVisible: boolean[] = [];

	interface Medal {
		type: 'gold' | 'silver' | 'bronze' | 'honor';
		competition: 'IOAI' | 'IAIO';
		year: number;
	}

	interface Student {
		name: string;
		school: string;
		medals: Medal[];
		goldCount: number;
		silverCount: number;
		bronzeCount: number;
		honorCount: number;
		imgpath: string;
	}

	interface Person {
		name: string;
		affiliation: string;
		image: string;
		linkedin?: string;
	}

	// Sample data - students with medals (sorted by gold > silver > bronze)
	let students: Student[] = [
		{
			name: 'Lehotai Gergely',
			school: 'Pécsi Janus Pannonius Gimnázium',
			medals: [
				{ type: 'silver', competition: 'IOAI', year: 2024 },
				{ type: 'silver', competition: 'IOAI', year: 2025 },
			],
			goldCount: 0,
			silverCount: 2,
			bronzeCount: 0,
			honorCount: 0,
			imgpath: `${base}/img/students/IOAI LG.jpeg`
		},
		{
			name: 'Labancz Benedek',
			school: 'Kecskeméti Bolyai János Gimnázium',
			medals: [
				{ type: 'gold', competition: 'IAIO', year: 2024 },
				{ type: 'bronze', competition: 'IOAI', year: 2025 }
			],
			goldCount: 1,
			silverCount: 0,
			bronzeCount: 1,
			honorCount: 0,
			imgpath: `${base}/img/students/IAIO LB.jpg`
		},
		{
			name: 'Ungár Vince',
			school: 'Békásmegyeri Veres Péter Gimnázium',
			medals: [
				{ type: 'silver', competition: 'IOAI', year: 2024 },
				{ type: 'silver', competition: 'IOAI', year: 2024 },
				{ type: 'bronze', competition: 'IAIO', year: 2024 },
				{ type: 'silver', competition: 'IOAI', year: 2025 }
			],
			goldCount: 0,
			silverCount: 3,
			bronzeCount: 1,
			honorCount: 0,
			imgpath: `${base}/img/students/IOAI UV.jpg`
		},
		{
			name: 'Magó Máté László',
			school: 'Premontrei Szent Norbert Gimnázium',
			medals: [
				{ type: 'bronze', competition: 'IOAI', year: 2025 }
			],
			goldCount: 0,
			silverCount: 0,
			bronzeCount: 1,
			honorCount: 0,
			imgpath: `${base}/img/students/IOAI MML.png`
		},
		{
			name: 'Reicher Martin',
			school: 'Budapest School',
			medals: [
				{ type: 'bronze', competition: 'IOAI', year: 2025 }
			],
			goldCount: 0,
			silverCount: 0,
			bronzeCount: 1,
			honorCount: 0,
			imgpath: `${base}/img/students/IOAI RM.jpg`
		},
		{
			name: 'Nagy Dávid Leonárd',
			school: 'ELTE Apáczai Csere János Gyakorló Gimnázium és Kollégium',
			medals: [
				{ type: 'silver', competition: 'IOAI', year: 2024 },
				{ type: 'bronze', competition: 'IOAI', year: 2025 }
			],
			goldCount: 0,
			silverCount: 1,
			bronzeCount: 1,
			honorCount: 0,
			imgpath: `${base}/img/students/IOAI NDL.jpg`
		},
		{
			name: 'Fleischman Illés Dániel',
			school: 'Baár-Madas Református Gimnázium',
			medals: [
				{ type: 'honor', competition: 'IOAI', year: 2025 }
			],
			goldCount: 0,
			silverCount: 0,
			bronzeCount: 0,
			honorCount: 1,
			imgpath: `${base}/img/students/IOAI FI.png`
		},
		{
			name: 'Christ Miranda Anna',
			school: 'Budapesti Fazekas Mihály Gyakorló Általános Iskola és Gimnázium',
			medals: [
				{ type: 'silver', competition: 'IOAI', year: 2024 },
				{ type: 'silver', competition: 'IAIO', year: 2024 },
			],
			goldCount: 0,
			silverCount: 2,
			bronzeCount: 0,
			honorCount: 0,
			imgpath: `${base}/img/students/IAIO CM.jpeg`
		},
		{
			name: 'Szilágyi Balázs',
			school: 'Békásmegyeri Veres Péter Gimnázium',
			medals: [
				{ type: 'silver', competition: 'IOAI', year: 2024 },
				{ type: 'silver', competition: 'IOAI', year: 2024 },
				{ type: 'silver', competition: 'IAIO', year: 2024 }
			],
			goldCount: 0,
			silverCount: 3,
			bronzeCount: 0,
			honorCount: 0,
			imgpath: `${base}/img/students/IAIO SZB.jpg`
		},
		{
			name: 'Kovács-Bánhalmi Hédi Zita',
			school: 'Kecskeméti Bányai Júlia Gimnázium',
			medals: [
				{ type: 'silver', competition: 'IOAI', year: 2024 },
				{ type: 'silver', competition: 'IOAI', year: 2024 }
			],
			goldCount: 0,
			silverCount: 2,
			bronzeCount: 0,
			honorCount: 0,
			imgpath: `${base}/img/students/IOAI HZ.jpg`
		},
		{
			name: 'Vajda Ádám',
			school: 'ELTE Radnóti Miklós Gyakorló Általános Iskola és Gyakorló Gimnázium',
			medals: [
				{ type: 'silver', competition: 'IOAI', year: 2024 },
				{ type: 'silver', competition: 'IOAI', year: 2024 }
			],
			goldCount: 0,
			silverCount: 2,
			bronzeCount: 0,
			honorCount: 0,
			imgpath: `${base}/img/students/IOAI VA.jpeg`
		},
		{
			name: 'Molnár István Ádám',
			school: 'Földes Ferenc Gimnázium',
			medals: [
				{ type: 'silver', competition: 'IOAI', year: 2024 },
			],
			goldCount: 0,
			silverCount: 1,
			bronzeCount: 0,
			honorCount: 0,
			imgpath: `${base}/img/students/IOAI MIA.JPG`
		}
	];

	// Organizers
	let organizers: Person[] = [
		{
			name: 'Dr. Gulyás László',
			affiliation: 'ELTE Informatikai Kar, MI Tanszék',
			image: `${base}/img/team/GL.jpeg`,
			linkedin: 'https://www.linkedin.com/in/laszlo-gulyas-9735401/'
		},
		{
			name: 'Bagladi Milán Zsolt',
			affiliation: 'ELTE Informatikai Kar, MI Tanszék',
			image: `${base}/img/team/BM.jpg`,
			linkedin: 'https://www.linkedin.com/in/milan-bagladi-169b02345/'
		},
		{
			name: 'Szalay Gergő',
			affiliation: 'ELTE Informatikai Kar, MI Tanszék',
			image: `${base}/img/team/SZG.jpg`,
			linkedin: 'https://linkedin.com'
		},
		{
			name: 'Szabó Barbara',
			affiliation: 'ELTE Informatikai Kar, MI Tanszék',
			image: `${base}/img/team/SZB.jpeg`,
			linkedin: 'https://www.linkedin.com/in/szabo-barbara-5642b4271/'
		},
		{
			name: 'Takács Tamás',
			affiliation: 'ELTE Informatikai Kar, MI Tanszék',
			image: `${base}/img/team/TT.jpg`,
			linkedin: 'https://www.linkedin.com/in/ranuon/'
		},
		{
			name: 'Dr. Németh Ágnes',
			affiliation: 'ELTE Informatikai Kar, NJSZT',
			image: `${base}/img/team/EA.jpg`,
			linkedin: 'https://www.linkedin.com/in/agnes-erdosne-nemeth/'
		},

	];

	// Contributors
	let contributors: Person[] = [
		{
			name: 'Dr. Huszár Ferenc',
			affiliation: 'University of Cambridge',
			image: `${base}/img/team/JH.jpeg`,
			linkedin: 'https://www.linkedin.com/in/fhuszar/'
		},
		{
			name: 'Csibi Zsolt',
			affiliation: 'ELTE Informatikai Kar, MI Tanszék',
			image: `${base}/img/team/ZSCS.png`,
			linkedin: 'https://www.linkedin.com/in/zsolt-csibi/'
		},
		{
			name: 'Molnár Imre',
			affiliation: 'ELTE Informatikai Kar, MI Tanszék',
			image: `${base}/img/team/MI.jpeg`,
			linkedin: 'https://www.linkedin.com/in/imremolnar/'
		},
		{
			name: 'Nikházy László',
			affiliation: 'ELTE Informatikai Kar, AlgoPro',
			image: `${base}/img/team/NL.jpeg`,
			linkedin: 'https://www.linkedin.com/in/l%C3%A1szl%C3%B3-nikh%C3%A1zy-b0560712b/'
		},
		{
			name: 'Sallai Martin',
			affiliation: 'ELTE Informatikai Kar, MI Tanszék',
			image: `${base}/img/team/SM.jpg`,
			linkedin: 'https://www.linkedin.com/in/martin-sallai-951b04259/'
		},
		{
			name: 'Sütő Félix',
			affiliation: 'ELTE Informatikai Kar, MI Tanszék',
			image: '',
			linkedin: 'https://www.linkedin.com/'
		},
		{
			name: 'Gyöngyössy Natabara Máté',
			affiliation: 'ELTE Informatikai Kar, MI Tanszék',
			image: `${base}/img/team/GYN.jpeg`,
			linkedin: 'https://www.linkedin.com/in/natabara-m%C3%A1t%C3%A9-gy%C3%B6ngy%C3%B6ssy-6317b8286/'
		},
		{
			name: 'Barta Zoltán',
			affiliation: 'ELTE Informatikai Kar, MI Tanszék',
			image: `${base}/img/team/BZ.jpeg`,
			linkedin: 'https://www.linkedin.com/in/barta-zolt%C3%A1n-012492214/'
		},
		{
			name: 'Papp-Bálint Gergő',
			affiliation: 'ELTE Informatikai Kar, MI Tanszék',
			image: `${base}/img/team/PGB.jpeg`,
			linkedin: 'https://www.linkedin.com/in/geri-papp/'
		},
		{
			name: 'Nagy Dávid Leonárd',
			affiliation: 'NWMSU, Computer Science and Information Systems',
			image: `${base}/img/students/IOAI NDL.jpg`,
			linkedin: 'https://www.linkedin.com/in/david-leonard-nagy/'
		},
		{
			name: 'Labancz Benedek',
			affiliation: 'University of Edinburgh, AI',
			image: `${base}/img/students/IAIO LB.jpg`,
			linkedin: 'https://www.linkedin.com/in/benedek-labancz/'
		},
		{
			name: 'Németh Kristóf',
			affiliation: 'ELTE Informatikai Kar, Oktatásinformatika Tanszék',
			image: `${base}/img/team/NK.jpg`,
			linkedin: 'https://www.linkedin.com/in/kristof-nemeth/'
		},
	];

	// Separate students by medal type and sort by medal count (descending)
	let goldMedalists = students
		.filter(s => s.goldCount > 0)
		.sort((a, b) => {
			if (b.goldCount !== a.goldCount) return b.goldCount - a.goldCount;
			if (b.silverCount !== a.silverCount) return b.silverCount - a.silverCount;
			return b.bronzeCount - a.bronzeCount;
		});
	
	let silverMedalists = students
		.filter(s => s.goldCount === 0 && s.silverCount > 0)
		.sort((a, b) => {
			if (b.silverCount !== a.silverCount) return b.silverCount - a.silverCount;
			return b.bronzeCount - a.bronzeCount;
		});
	
	let bronzeMedalists = students
		.filter(s => s.goldCount === 0 && s.silverCount === 0 && s.bronzeCount > 0)
		.sort((a, b) => b.bronzeCount - a.bronzeCount);
	
	let honorableMentions = students
		.filter(s => s.goldCount === 0 && s.silverCount === 0 && s.bronzeCount === 0 && s.honorCount > 0)
		.sort((a, b) => b.honorCount - a.honorCount);

	goldCardsVisible = new Array(goldMedalists.length).fill(false);
	silverCardsVisible = new Array(silverMedalists.length).fill(false);
	bronzeCardsVisible = new Array(bronzeMedalists.length).fill(false);
	let honorCardsVisible: boolean[] = new Array(honorableMentions.length).fill(false);
	organizerCardsVisible = new Array(organizers.length).fill(false);
	contributorCardsVisible = new Array(contributors.length).fill(false);

	function getInitials(name: string): string {
		return name.split(' ').map(n => n[0]).join('');
	}

	function getMedalColor(type: 'gold' | 'silver' | 'bronze' | 'honor'): string {
		if (type === 'gold') return 'from-yellow-400 to-yellow-600';
		if (type === 'silver') return 'from-gray-300 to-gray-500';
		if (type === 'bronze') return 'from-orange-400 to-orange-600';
		return 'from-blue-400 to-blue-600'; // honor
	}

	function getMedalIcon(): string {
		return `<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>`;
	}

	function getTotalMedals() {
		let gold = 0, silver = 0, bronze = 0, honor = 0;
		students.forEach(s => {
			gold += s.goldCount;
			silver += s.silverCount;
			bronze += s.bronzeCount;
			honor += s.honorCount;
		});
		return { gold, silver, bronze, honor };
	}

	const totalMedals = getTotalMedals();

	onMount(() => {
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
					} else if (dataAnimate === 'medalists') {
						medalistsVisible = true;
					} else if (dataAnimate?.startsWith('gold-')) {
						const index = parseInt(dataAnimate.split('-')[1]);
						goldCardsVisible[index] = true;
						goldCardsVisible = [...goldCardsVisible];
					} else if (dataAnimate?.startsWith('silver-')) {
						const index = parseInt(dataAnimate.split('-')[1]);
						silverCardsVisible[index] = true;
						silverCardsVisible = [...silverCardsVisible];
					} else if (dataAnimate?.startsWith('bronze-')) {
						const index = parseInt(dataAnimate.split('-')[1]);
						bronzeCardsVisible[index] = true;
						bronzeCardsVisible = [...bronzeCardsVisible];
					} else if (dataAnimate?.startsWith('honor-')) {
						const index = parseInt(dataAnimate.split('-')[1]);
						honorCardsVisible[index] = true;
						honorCardsVisible = [...honorCardsVisible];
					} else if (dataAnimate === 'divider-1') {
						divider1Visible = true;
					} else if (dataAnimate === 'organizers') {
						organizersVisible = true;
					} else if (dataAnimate?.startsWith('organizer-')) {
						const index = parseInt(dataAnimate.split('-')[1]);
						organizerCardsVisible[index] = true;
						organizerCardsVisible = [...organizerCardsVisible];
					} else if (dataAnimate === 'contributors') {
						contributorsVisible = true;
					} else if (dataAnimate?.startsWith('contributor-')) {
						const index = parseInt(dataAnimate.split('-')[1]);
						contributorCardsVisible[index] = true;
						contributorCardsVisible = [...contributorCardsVisible];
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
	<title>Hall of Fame | HAIO</title>
	<meta name="description" content="A Hungarian AI Olympiad dicsőségtáblája - Érmesek, szervezők és közreműködők." />
</svelte:head>

<section class="min-h-screen bg-desert-100 relative overflow-hidden pt-32 pb-20">
	<!-- Background Neural Network - Fixed to viewport -->
	<div class="fixed inset-0 opacity-20 pointer-events-none" style="z-index: 0;">
		<NeuralNetwork nodeCount={25} position="full" />
	</div>

	<div class="container mx-auto px-6 relative z-10 max-w-7xl">
		<!-- Page Header -->
		<div 
			class="text-center mb-20 transition-all duration-700 ease-out"
			class:opacity-0={!headerVisible}
			class:translate-y-8={!headerVisible}
			class:opacity-100={headerVisible}
			class:translate-y-0={headerVisible}
			data-animate="header"
		>
			<div class="inline-block mb-6">
				<div class="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-dark-blue to-warm-blue text-white rounded-full shadow-lg">
					<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
						<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
					</svg>
					<span class="text-xl font-bold">Hall of Fame</span>
				</div>
			</div>
			<h1 class="text-5xl md:text-6xl font-bold text-dark-blue mb-6">Legsikeresebb Versenyzőink</h1>

			<!-- Medal Statistics - Responsive Grid -->
			<div class="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-12 max-w-4xl mx-auto">
				<div class="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-desert-200">
					<div class="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg">
						<svg class="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
							{@html getMedalIcon()}
						</svg>
					</div>
					<div class="text-2xl sm:text-3xl font-bold text-dark-blue mb-1">{totalMedals.gold}</div>
					<div class="text-xs sm:text-sm text-desert-600 font-medium">Arany</div>
				</div>

				<div class="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-desert-200">
					<div class="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center shadow-lg">
						<svg class="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
							{@html getMedalIcon()}
						</svg>
					</div>
					<div class="text-2xl sm:text-3xl font-bold text-dark-blue mb-1">{totalMedals.silver}</div>
					<div class="text-xs sm:text-sm text-desert-600 font-medium">Ezüst</div>
				</div>

				<div class="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-desert-200">
					<div class="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg">
						<svg class="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
							{@html getMedalIcon()}
						</svg>
					</div>
					<div class="text-2xl sm:text-3xl font-bold text-dark-blue mb-1">{totalMedals.bronze}</div>
					<div class="text-xs sm:text-sm text-desert-600 font-medium">Bronze</div>
				</div>

				<div class="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-desert-200">
					<div class="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
						<svg class="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
						</svg>
					</div>
					<div class="text-2xl sm:text-3xl font-bold text-dark-blue mb-1">{totalMedals.honor}</div>
					<div class="text-xs sm:text-sm text-desert-600 font-medium">Dicséret</div>
				</div>
			</div>
		</div>

		<!-- MEDALISTS SECTION -->
		<div class="mb-24">
			<!-- Gold Medalists -->
			{#if goldMedalists.length > 0}
				<div class="mb-16">
					<div 
						class="text-center mb-12 transition-all duration-700"
						class:opacity-0={!medalistsVisible}
						class:translate-y-8={!medalistsVisible}
						class:opacity-100={medalistsVisible}
						class:translate-y-0={medalistsVisible}
						data-animate="medalists"
					>
						<div class="inline-flex items-center gap-3 px-5 py-2.5 bg-white border-2 border-yellow-500 rounded-lg shadow-md mb-4">
							<svg class="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
								{@html getMedalIcon()}
							</svg>
							<span class="text-lg font-bold text-yellow-600">Aranyérmesek</span>
						</div>
					</div>

					<div class="grid gap-6" class:md:grid-cols-2={goldMedalists.length > 1} class:max-w-2xl={goldMedalists.length === 1} class:mx-auto={goldMedalists.length === 1}>
						{#each goldMedalists as student, index}
							<div 
								class="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-yellow-400/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
								class:opacity-0={!goldCardsVisible[index]}
								class:translate-y-12={!goldCardsVisible[index]}
								class:opacity-100={goldCardsVisible[index]}
								class:translate-y-0={goldCardsVisible[index]}
								data-animate="gold-{index}"
								style="transition-delay: {index * 150}ms;"
							>
								<div class="p-6">
									<div class="flex items-start gap-4 mb-4">
										<div class="relative flex-shrink-0">
											{#if student.imgpath}
												<img 
													src={student.imgpath} 
													alt={student.name}
													class="w-20 h-20 rounded-full object-cover shadow-lg ring-4 ring-yellow-400/30"
												/>
											{:else}
												<div class="w-20 h-20 rounded-full bg-gradient-to-br from-warm-blue to-dark-blue flex items-center justify-center shadow-lg ring-4 ring-yellow-400/30">
													<span class="text-2xl font-bold text-white">{getInitials(student.name)}</span>
												</div>
											{/if}
											<div class="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg ring-2 ring-white">
												<svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
													{@html getMedalIcon()}
												</svg>
											</div>
										</div>
										<div class="flex-1 min-w-0">
											<h3 class="text-xl font-bold text-dark-blue mb-1">{student.name}</h3>
											<div class="flex items-start gap-1.5 text-desert-600 text-sm">
												<svg class="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
												</svg>
												<span class="leading-tight">{student.school}</span>
											</div>
										</div>
									</div>

									<!-- Medal Summary -->
									<div class="flex gap-3 mb-4">
										{#if student.goldCount > 0}
											<div class="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-lg border border-yellow-400/30">
												<svg class="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
													{@html getMedalIcon()}
												</svg>
												<span class="text-sm font-bold text-yellow-700">{student.goldCount}</span>
											</div>
										{/if}
										{#if student.silverCount > 0}
											<div class="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-gray-300/20 to-gray-500/20 rounded-lg border border-gray-400/30">
												<svg class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
													{@html getMedalIcon()}
												</svg>
												<span class="text-sm font-bold text-gray-700">{student.silverCount}</span>
											</div>
										{/if}
										{#if student.bronzeCount > 0}
											<div class="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-orange-400/20 to-orange-600/20 rounded-lg border border-orange-400/30">
												<svg class="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
													{@html getMedalIcon()}
												</svg>
												<span class="text-sm font-bold text-orange-700">{student.bronzeCount}</span>
											</div>
										{/if}
									</div>

									<!-- Medal Details -->
									<div class="space-y-2">
										{#each student.medals as medal}
											<div class="flex items-center justify-between px-3 py-2 bg-desert-50 rounded-lg">
												<div class="flex items-center gap-2">
													<div class="w-6 h-6 rounded-full bg-gradient-to-br {getMedalColor(medal.type)} flex items-center justify-center shadow-sm">
														<svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
															{@html getMedalIcon()}
														</svg>
													</div>
													<span class="text-sm font-semibold text-dark-blue">{medal.competition}</span>
												</div>
												<span class="text-sm font-medium text-desert-600">{medal.year}</span>
											</div>
										{/each}
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Silver Medalists -->
			{#if silverMedalists.length > 0}
				<div class="mb-16">
					<div class="text-center mb-12">
						<div class="inline-flex items-center gap-3 px-5 py-2.5 bg-white border-2 border-gray-400 rounded-lg shadow-md mb-4">
							<svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
								{@html getMedalIcon()}
							</svg>
							<span class="text-lg font-bold text-gray-600">Ezüstérmesek</span>
						</div>
					</div>

					<div class="grid gap-6" class:md:grid-cols-2={silverMedalists.length > 1} class:max-w-2xl={silverMedalists.length === 1} class:mx-auto={silverMedalists.length === 1}>
						{#each silverMedalists as student, index}
							<div 
								class="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-gray-400/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
								class:opacity-0={!silverCardsVisible[index]}
								class:translate-y-12={!silverCardsVisible[index]}
								class:opacity-100={silverCardsVisible[index]}
								class:translate-y-0={silverCardsVisible[index]}
								data-animate="silver-{index}"
								style="transition-delay: {index * 150}ms;"
							>
								<div class="p-6">
									<div class="flex items-start gap-4 mb-4">
										<div class="relative flex-shrink-0">
											{#if student.imgpath}
												<img 
													src={student.imgpath} 
													alt={student.name}
													class="w-20 h-20 rounded-full object-cover shadow-lg ring-4 ring-gray-400/30"
												/>
											{:else}
												<div class="w-20 h-20 rounded-full bg-gradient-to-br from-warm-blue to-dark-blue flex items-center justify-center shadow-lg ring-4 ring-gray-400/30">
													<span class="text-2xl font-bold text-white">{getInitials(student.name)}</span>
												</div>
											{/if}
											<div class="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center shadow-lg ring-2 ring-white">
												<svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
													{@html getMedalIcon()}
												</svg>
											</div>
										</div>
										<div class="flex-1 min-w-0">
											<h3 class="text-xl font-bold text-dark-blue mb-1">{student.name}</h3>
											<div class="flex items-start gap-1.5 text-desert-600 text-sm">
												<svg class="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
												</svg>
												<span class="leading-tight">{student.school}</span>
											</div>
										</div>
									</div>

									<!-- Medal Summary -->
									<div class="flex gap-3 mb-4">
										{#if student.silverCount > 0}
											<div class="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-gray-300/20 to-gray-500/20 rounded-lg border border-gray-400/30">
												<svg class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
													{@html getMedalIcon()}
												</svg>
												<span class="text-sm font-bold text-gray-700">{student.silverCount}</span>
											</div>
										{/if}
										{#if student.bronzeCount > 0}
											<div class="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-orange-400/20 to-orange-600/20 rounded-lg border border-orange-400/30">
												<svg class="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
													{@html getMedalIcon()}
												</svg>
												<span class="text-sm font-bold text-orange-700">{student.bronzeCount}</span>
											</div>
										{/if}
									</div>

									<!-- Medal Details -->
									<div class="space-y-2">
										{#each student.medals as medal}
											<div class="flex items-center justify-between px-3 py-2 bg-desert-50 rounded-lg">
												<div class="flex items-center gap-2">
													<div class="w-6 h-6 rounded-full bg-gradient-to-br {getMedalColor(medal.type)} flex items-center justify-center shadow-sm">
														<svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
															{@html getMedalIcon()}
														</svg>
													</div>
													<span class="text-sm font-semibold text-dark-blue">{medal.competition}</span>
												</div>
												<span class="text-sm font-medium text-desert-600">{medal.year}</span>
											</div>
										{/each}
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Bronze Medalists -->
			{#if bronzeMedalists.length > 0}
				<div class="mb-16">
					<div class="text-center mb-12">
						<div class="inline-flex items-center gap-3 px-5 py-2.5 bg-white border-2 border-orange-500 rounded-lg shadow-md mb-4">
							<svg class="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
								{@html getMedalIcon()}
							</svg>
							<span class="text-lg font-bold text-orange-600">Bronzérmesek</span>
						</div>
					</div>

					<div class="grid gap-6" class:md:grid-cols-2={bronzeMedalists.length > 1} class:max-w-2xl={bronzeMedalists.length === 1} class:mx-auto={bronzeMedalists.length === 1}>
						{#each bronzeMedalists as student, index}
							<div 
								class="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-orange-400/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
								class:opacity-0={!bronzeCardsVisible[index]}
								class:translate-y-12={!bronzeCardsVisible[index]}
								class:opacity-100={bronzeCardsVisible[index]}
								class:translate-y-0={bronzeCardsVisible[index]}
								data-animate="bronze-{index}"
								style="transition-delay: {index * 150}ms;"
							>
								<div class="p-6">
									<div class="flex items-start gap-4 mb-4">
										<div class="relative flex-shrink-0">
											{#if student.imgpath}
												<img 
													src={student.imgpath} 
													alt={student.name}
													class="w-20 h-20 rounded-full object-cover shadow-lg ring-4 ring-orange-400/30"
												/>
											{:else}
												<div class="w-20 h-20 rounded-full bg-gradient-to-br from-warm-blue to-dark-blue flex items-center justify-center shadow-lg ring-4 ring-orange-400/30">
													<span class="text-2xl font-bold text-white">{getInitials(student.name)}</span>
												</div>
											{/if}
											<div class="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg ring-2 ring-white">
												<svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
													{@html getMedalIcon()}
												</svg>
											</div>
										</div>
										<div class="flex-1 min-w-0">
											<h3 class="text-xl font-bold text-dark-blue mb-1">{student.name}</h3>
											<div class="flex items-start gap-1.5 text-desert-600 text-sm">
												<svg class="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
												</svg>
												<span class="leading-tight">{student.school}</span>
											</div>
										</div>
									</div>

									<!-- Medal Summary -->
									<div class="flex gap-3 mb-4">
										{#if student.bronzeCount > 0}
											<div class="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-orange-400/20 to-orange-600/20 rounded-lg border border-orange-400/30">
												<svg class="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
													{@html getMedalIcon()}
												</svg>
												<span class="text-sm font-bold text-orange-700">{student.bronzeCount}</span>
											</div>
										{/if}
									</div>

									<!-- Medal Details -->
									<div class="space-y-2">
										{#each student.medals as medal}
											<div class="flex items-center justify-between px-3 py-2 bg-desert-50 rounded-lg">
												<div class="flex items-center gap-2">
													<div class="w-6 h-6 rounded-full bg-gradient-to-br {getMedalColor(medal.type)} flex items-center justify-center shadow-sm">
														<svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
															{@html getMedalIcon()}
														</svg>
													</div>
													<span class="text-sm font-semibold text-dark-blue">{medal.competition}</span>
												</div>
												<span class="text-sm font-medium text-desert-600">{medal.year}</span>
											</div>
										{/each}
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Honorable Mentions -->
			{#if honorableMentions.length > 0}
				<div class="mb-16">
					<div class="text-center mb-12">
						<div class="inline-flex items-center gap-3 px-5 py-2.5 bg-white border-2 border-blue-500 rounded-lg shadow-md mb-4">
							<svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
							</svg>
							<span class="text-lg font-bold text-blue-600">Dicséretek</span>
						</div>
					</div>

					<div class="grid gap-6" class:md:grid-cols-2={honorableMentions.length > 1} class:max-w-2xl={honorableMentions.length === 1} class:mx-auto={honorableMentions.length === 1}>
						{#each honorableMentions as student, index}
							<div 
								class="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-blue-400/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
								class:opacity-0={!honorCardsVisible[index]}
								class:translate-y-12={!honorCardsVisible[index]}
								class:opacity-100={honorCardsVisible[index]}
								class:translate-y-0={honorCardsVisible[index]}
								data-animate="honor-{index}"
								style="transition-delay: {index * 150}ms;"
							>
								<div class="p-6">
									<div class="flex items-start gap-4 mb-4">
										<div class="relative flex-shrink-0">
											{#if student.imgpath}
												<img 
													src={student.imgpath} 
													alt={student.name}
													class="w-20 h-20 rounded-full object-cover shadow-lg ring-4 ring-blue-400/30"
												/>
											{:else}
												<div class="w-20 h-20 rounded-full bg-gradient-to-br from-warm-blue to-dark-blue flex items-center justify-center shadow-lg ring-4 ring-blue-400/30">
													<span class="text-2xl font-bold text-white">{getInitials(student.name)}</span>
												</div>
											{/if}
											<div class="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg ring-2 ring-white">
												<svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
												</svg>
											</div>
										</div>
										<div class="flex-1 min-w-0">
											<h3 class="text-xl font-bold text-dark-blue mb-1">{student.name}</h3>
											<div class="flex items-start gap-1.5 text-desert-600 text-sm">
												<svg class="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
												</svg>
												<span class="leading-tight">{student.school}</span>
											</div>
										</div>
									</div>

									<!-- Medal Summary -->
									<div class="flex gap-3 mb-4">
										{#if student.honorCount > 0}
											<div class="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-400/20 to-blue-600/20 rounded-lg border border-blue-400/30">
												<svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
												</svg>
												<span class="text-sm font-bold text-blue-700">{student.honorCount}</span>
											</div>
										{/if}
									</div>

									<!-- Medal Details -->
									<div class="space-y-2">
										{#each student.medals as medal}
											<div class="flex items-center justify-between px-3 py-2 bg-desert-50 rounded-lg">
												<div class="flex items-center gap-2">
													<div class="w-6 h-6 rounded-full bg-gradient-to-br {getMedalColor(medal.type)} flex items-center justify-center shadow-sm">
														<svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
															<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
														</svg>
													</div>
													<span class="text-sm font-semibold text-dark-blue">{medal.competition}</span>
												</div>
												<span class="text-sm font-medium text-desert-600">{medal.year}</span>
											</div>
										{/each}
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		</div>

		<!-- Divider -->
		<div 
			class="my-20 transition-all duration-700 ease-out"
			class:opacity-0={!divider1Visible}
			class:opacity-100={divider1Visible}
			data-animate="divider-1"
		>
			<Divider showCopyright={true}/>
		</div>

		<!-- ORGANIZERS SECTION -->
		<div class="mb-24">
			<div 
				class="text-center mb-16 transition-all duration-700"
				class:opacity-0={!organizersVisible}
				class:translate-y-8={!organizersVisible}
				class:opacity-100={organizersVisible}
				class:translate-y-0={organizersVisible}
				data-animate="organizers"
			>
				<div class="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-dark-blue to-warm-blue text-white rounded-lg shadow-md mb-4">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
					</svg>
					<span class="text-lg font-bold">Szervezők</span>
				</div>
				<p class="text-desert-700 max-w-2xl mx-auto">
					A verseny megszervezéséért és lebonyolításáért felelős csapat tagjai
				</p>
			</div>

			<div class="flex flex-wrap gap-6 justify-center max-w-6xl mx-auto">
				{#each organizers as organizer, index}
					<div 
						class="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-blue-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 w-full max-w-[240px]"
						class:opacity-0={!organizerCardsVisible[index]}
						class:translate-y-12={!organizerCardsVisible[index]}
						class:opacity-100={organizerCardsVisible[index]}
						class:translate-y-0={organizerCardsVisible[index]}
						data-animate="organizer-{index}"
						style="transition-delay: {index * 100}ms;"
					>
						<div class="aspect-square bg-gradient-to-br from-warm-blue/10 to-dark-blue/10 flex items-center justify-center p-4">
							{#if organizer.image}
								<img 
									src={organizer.image} 
									alt={organizer.name}
									class="w-36 h-36 rounded-full object-cover shadow-lg ring-4 ring-blue-900/30"
								/>
							{:else}
								<div class="w-36 h-36 rounded-full bg-gradient-to-br from-warm-blue to-dark-blue flex items-center justify-center shadow-lg">
									<span class="text-4xl font-bold text-white">{getInitials(organizer.name)}</span>
								</div>
							{/if}
						</div>
						<div class="p-3">
							<h3 class="text-sm font-bold text-dark-blue mb-0.5 text-center leading-tight">{organizer.name}</h3>
							<p class="text-xs text-desert-600 text-center mb-3 leading-snug">{organizer.affiliation}</p>
							{#if organizer.linkedin}
								<a 
									href={organizer.linkedin}
									target="_blank"
									rel="noopener noreferrer"
									class="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-dark-blue to-warm-blue text-white rounded-lg hover:shadow-lg transition-all duration-300 text-xs font-medium"
								>
									<svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
										<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
									</svg>
									<span>LinkedIn</span>
								</a>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- CONTRIBUTORS SECTION -->
		<div class="mb-12">
			<div 
				class="text-center mb-16 transition-all duration-700"
				class:opacity-0={!contributorsVisible}
				class:translate-y-8={!contributorsVisible}
				class:opacity-100={contributorsVisible}
				class:translate-y-0={contributorsVisible}
				data-animate="contributors"
			>
				<div class="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-purple-700 to-purple-900 text-white rounded-lg shadow-md mb-4">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
					</svg>
					<span class="text-lg font-bold">Közreműködők</span>
				</div>
				<p class="text-desert-700 max-w-2xl mx-auto">
					Időszakos hozzájárulóink, akik nélkül ez a program nem jöhetett volna létre
				</p>
			</div>

			<div class="flex flex-wrap gap-6 justify-center max-w-6xl mx-auto">
				{#each contributors as contributor, index}
					<div 
						class="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-purple-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 w-full max-w-[240px]"
						class:opacity-0={!contributorCardsVisible[index]}
						class:translate-y-12={!contributorCardsVisible[index]}
						class:opacity-100={contributorCardsVisible[index]}
						class:translate-y-0={contributorCardsVisible[index]}
						data-animate="contributor-{index}"
						style="transition-delay: {index * 100}ms;"
					>
						<div class="aspect-square bg-gradient-to-br from-warm-blue/10 to-dark-blue/10 flex items-center justify-center p-4">
							{#if contributor.image}
								<img 
									src={contributor.image} 
									alt={contributor.name}
									class="w-36 h-36 rounded-full object-cover shadow-lg ring-4 ring-purple-900/30"
								/>
							{:else}
								<div class="w-36 h-36 rounded-full bg-gradient-to-br from-purple-700 to-purple-900 flex items-center justify-center shadow-lg">
									<span class="text-4xl font-bold text-white">{getInitials(contributor.name)}</span>
								</div>
							{/if}
						</div>
						<div class="p-3">
							<h3 class="text-sm font-bold text-dark-blue mb-0.5 text-center leading-tight">{contributor.name}</h3>
							<p class="text-xs text-desert-600 text-center mb-3 leading-snug">{contributor.affiliation}</p>
							{#if contributor.linkedin}
								<a 
									href={contributor.linkedin}
									target="_blank"
									rel="noopener noreferrer"
									class="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-700 to-purple-900 text-white rounded-lg hover:shadow-lg transition-all duration-300 text-xs font-medium"
								>
									<svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
										<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
									</svg>
									<span>LinkedIn</span>
								</a>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
