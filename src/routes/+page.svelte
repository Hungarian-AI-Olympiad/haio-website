<script lang="ts">
    import { onMount } from 'svelte';
    import { base } from '$app/paths';
    import NeuralNetwork from '$lib/components/NeuralNetwork.svelte';
    import Divider from '$lib/components/Divider.svelte';

    let videoLoaded = false;
    let videoElement: HTMLVideoElement;
    let isMuted = true;
    let isPlaying = true;

    // Intersection Observer for lazy loading animations
    let programsSectionVisible = false;
    let programsPillVisible = false;
    let card1Visible = false;
    let card2Visible = false;
    let card3Visible = false;
    let dividerVisible = false;
    let divider2Visible = false;
    let divider3Visible = false;
    let divider4Visible = false;
    let timelineHeaderVisible = false;
    let timelinePillVisible = false;
    let internationalSectionVisible = false;
    let sponsorsSectionVisible = false;

    // International competitions - image carousel state
    let ioaiImages = [`${base}/img/ioai/beijing.jpg`, `${base}/img/ioai/burgas.jpg`, `${base}/img/ioai/abudhabi.jpg`];
    let iaioImages = [`${base}/img/iaio/ljubljana.jpg`, `${base}/img/iaio/riyadh.jpg`]; // Add your images here
    let currentIoaiIndex = 0;
    let currentIaioIndex = 0;

    // Timeline state
    let timelineEvents = [
        {
            date: '2025. november 5.',
            actualDate: new Date('2025-11-05'),
            project: 'MÓLÓ',
            title: 'Első Online Előadás',
            description: 'Új szezon indítása és bevezető az MI diákolimpiák világába.',
            visible: false,
            teams: true
        },
        {
            date: '2025. december 3.',
            actualDate: new Date('2025-12-03'),
            project: 'MÓLÓ',
            title: 'Második Online Előadás',
            description: 'Adatvezérelt programozás (Program vs. Tanuló Modell).',
            visible: false,
            teams: true
        },
        {
            date: '2026. január 7.',
            actualDate: new Date('2026-01-07'),
            project: 'MÓLÓ',
            title: 'Harmadik Online Előadás',
            description: 'Hamarosan',
            visible: false,
            teams: true
        },
        {
            date: '2026. január',
            actualDate: new Date('2026-01-14'),
            project: 'HAIO',
            title: 'Téli Tábor',
            description: 'Felkészítő a 2026-os IAIO versenyre.',
            visible: false,
            teams: false
        },
        {
            date: '2026. január 23-27.',
            actualDate: new Date('2026-01-23'),
            project: 'HAIO',
            title: 'IAIO 2026',
            description: 'Nemzetközi versenyen való részvétel.',
            visible: false,
            teams: false
        },
        {
            date: '2026. március',
            actualDate: new Date('2026-03-20'),
            project: 'HAIO',
            title: 'Online Előválogató',
            description: 'Az első szűrő az országos válogató felé.',
            visible: false,
            teams: false
        },
		{
            date: '2026. május',
            actualDate: new Date('2026-05-20'),
            project: 'HAIO',
            title: 'Országos Válogató',
            description: 'A IAIO és IOAI versenyekre való kijutásért folyó megmérettetés.',
            visible: false,
            teams: false
        },
		{
            date: '2026. július',
            actualDate: new Date('2026-07-20'),
            project: 'HAIO',
            title: 'Nyári Tábor',
            description: 'Felkészítő a 2026-os IOAI versenyre.',
            visible: false,
            teams: false
        },
		{
            date: '2026. augusztus',
            actualDate: new Date('2026-08-20'),
            project: 'HAIO',
            title: 'IOAI 2026',
            description: 'Nemzetközi versenyen való részvétel.',
            visible: false,
            teams: false
        },
    ];
    
    // Function to check if event is in the past
    function isEventPast(eventDate) {
        const now = new Date();
        return eventDate < now;
    }

    onMount(() => {
        videoLoaded = true;
        
        // Set up Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target as HTMLElement;
                    
                    if (target.dataset.animate === 'programs-section') {
                        programsSectionVisible = true;
                    } else if (target.dataset.animate === 'programs-pill') {
                        programsPillVisible = true;
                    } else if (target.dataset.animate === 'card-1') {
                        card1Visible = true;
                    } else if (target.dataset.animate === 'card-2') {
                        card2Visible = true;
                    } else if (target.dataset.animate === 'card-3') {
                        card3Visible = true;
                    } else if (target.dataset.animate === 'divider') {
                        dividerVisible = true;
                    } else if (target.dataset.animate === 'divider-2') {
                        divider2Visible = true;
                    } else if (target.dataset.animate === 'divider-3') {
                        divider3Visible = true;
                    } else if (target.dataset.animate === 'divider-4') {
                        divider4Visible = true;
                    } else if (target.dataset.animate === 'timeline-header') {
                        timelineHeaderVisible = true;
                    } else if (target.dataset.animate === 'timeline-pill') {
                        timelinePillVisible = true;
                    } else if (target.dataset.animate === 'international-section') {
                        internationalSectionVisible = true;
                    } else if (target.dataset.animate === 'sponsors-section') {
                        sponsorsSectionVisible = true;
                    } else if (target.dataset.timelineEvent !== undefined) {
                        // Timeline event lazy loading
                        const eventIndex = parseInt(target.dataset.timelineEvent);
                        timelineEvents[eventIndex].visible = true;
                        timelineEvents = [...timelineEvents]; // Trigger reactivity
                    }
                    
                    observer.unobserve(target);
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        const animatableElements = document.querySelectorAll('[data-animate], [data-timeline-event]');
        animatableElements.forEach(el => observer.observe(el));

        // Image carousel for international competitions
        const ioaiInterval = setInterval(() => {
            currentIoaiIndex = (currentIoaiIndex + 1) % ioaiImages.length;
        }, 5000); // Change every 5 seconds

        const iaioInterval = setInterval(() => {
            currentIaioIndex = (currentIaioIndex + 1) % iaioImages.length;
        }, 5000); // Change every 5 seconds

        return () => {
            observer.disconnect();
            clearInterval(ioaiInterval);
            clearInterval(iaioInterval);
        };
    });

    // Smooth scroll function
    function smoothScroll(e: MouseEvent, targetId: string) {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function toggleMute() {
        if (videoElement) {
            isMuted = !isMuted;
            videoElement.muted = isMuted;
        }
    }

    function togglePlay() {
        if (videoElement) {
            if (isPlaying) {
                videoElement.pause();
            } else {
                videoElement.play();
            }
            isPlaying = !isPlaying;
        }
    }
</script>

<svelte:head>
	<title>Főoldal | HAIO - Hungarian AI Olympiad</title>
	<meta name="description" content="Üdvözlünk a magyar MI olimpiák oldalán! Fedezd fel a MÓLÓ és HAIO programokat." />
</svelte:head>

<!-- HERO SECTION: Full-screen Video with Overlaid Content -->
<section class="h-screen relative overflow-hidden">
	<!-- Full-screen Video Background -->
	<div class="absolute inset-0 bg-black">
		{#if videoLoaded}
			<video
				bind:this={videoElement}
				class="absolute inset-0 w-full h-full object-cover"
				autoplay
				muted
				loop
				playsinline
			>
				<source src={`${base}/video/video.mp4`} type="video/mp4" />
				Your browser does not support the video tag.
			</video>
		{/if}
		
		<!-- Dark overlay for better text readability -->
		<div class="absolute inset-0 bg-black/40"></div>
		
		<!-- Partner Logos - Top Left -->
		<div class="absolute top-20 left-6 flex items-center gap-4 z-20">
			<div class="rounded-lg p-2 sm:p-4 bg-white/90 backdrop-blur-sm transition-all duration-300 hover:bg-white/95">
				<img src={`${base}/img/logo1.png`} alt="Partner Logo 1" class="h-16 sm:h-20 object-contain" />
			</div>
			<div class="rounded-lg p-2 sm:p-4 bg-white/90 backdrop-blur-sm transition-all duration-300 hover:bg-white/95">
				<img src={`${base}/img/logo2.png`} alt="Partner Logo 2" class="h-16 sm:h-20 object-contain" />
			</div>
		</div>
		
		<!-- Video Controls -->
		<div class="absolute bottom-6 right-6 flex gap-2 z-20">
			<button
				on:click={togglePlay}
				class="bg-black/50 backdrop-blur-sm p-3 rounded-lg hover:bg-black/70 transition-all duration-300 text-white"
				aria-label="Toggle Play/Pause"
				title={isPlaying ? 'Pause video' : 'Play video'}
			>
				{#if isPlaying}
					<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
					</svg>
				{:else}
					<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
					</svg>
				{/if}
			</button>
			<button
				on:click={toggleMute}
				class="bg-black/50 backdrop-blur-sm p-3 rounded-lg hover:bg-black/70 transition-all duration-300 text-white"
				aria-label="Toggle Mute"
				title={isMuted ? 'Unmute video' : 'Mute video'}
			>
				{#if isMuted}
					<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clip-rule="evenodd" />
					</svg>
				{:else}
					<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clip-rule="evenodd" />
					</svg>
				{/if}
			</button>
		</div>
	</div>

	<!-- Centered Content -->
	<div class="absolute inset-0 flex items-center justify-center z-10">
		<div class="text-center px-4 sm:px-6 max-w-5xl w-full">
			<p class="text-2xl sm:text-3xl md:text-5xl text-white font-light mb-6 sm:mb-8 animate-fadeInUp leading-relaxed drop-shadow-2xl">
				Üdvözlünk a Mesterséges Intelligencia Diákolimpia Hivatalos Weboldalán
			</p>
			
			<!-- Call-to-action Buttons -->
			<div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 justify-center animate-fadeInUp animation-delay-200 mx-auto">
				<a 
					href="#programs" 
					on:click={(e) => smoothScroll(e, '#programs')}
					class="group px-4 sm:px-10 py-3.5 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-dark-blue transition-all duration-300 text-sm sm:text-base whitespace-nowrap"
				>
					<span class="flex items-center justify-center gap-2.5">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
						</svg>
						Programjaink
					</span>
				</a>
				<a 
					href="https://discord.gg/KKTzNebjGW" 
					target="_blank" 
					rel="noopener noreferrer"
					class="group px-4 sm:px-10 py-3.5 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-[#5865F2] transition-all duration-300 text-sm sm:text-base whitespace-nowrap"
				>
					<span class="flex items-center justify-center gap-2.5">
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
							<path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
						</svg>
						Discord Közösségünk
					</span>
				</a>
			</div>
		</div>
	</div>

	<!-- Scroll indicator - Mouse on desktop, Finger swipe on mobile -->
	<div class="absolute left-1/2 transform -translate-x-1/2 animate-scrollFade z-10" style="bottom: 2rem;">
		<a href="#programs" on:click={(e) => smoothScroll(e, '#programs')} class="block" aria-label="Scroll to programs">
			<!-- Desktop: Mouse scroll indicator -->
			<div class="hidden sm:flex w-6 h-10 border-2 border-white rounded-full justify-center pt-2">
				<div class="w-1 h-3 bg-white rounded-full animate-scrollWheel"></div>
			</div>
			<!-- Mobile: Finger swipe up indicator -->
			<div class="sm:hidden flex flex-col items-center">
				<div class="relative h-16 w-12 flex items-end justify-center">
					<!-- Animated circle (representing finger touch) -->
					<div class="w-8 h-8 bg-white rounded-full absolute bottom-0 animate-swipeUp opacity-80"></div>
					<!-- Swipe direction indicator (arrow) -->
					<div class="absolute -top-2 animate-swipeUpArrow">
						<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
						</svg>
					</div>
				</div>
			</div>
		</a>
	</div>
</section>

<!-- PROGRAMS SECTION WITH DIVIDER - SEAMLESS BACKGROUND -->
<section id="programs" class="min-h-screen bg-desert-100 relative overflow-hidden" data-animate="divider">
    <!-- Neural Network Background -->
    <div class="absolute inset-0 opacity-20">
        <NeuralNetwork nodeCount={25} position="full" />
    </div>
    
    <!-- Divider at top -->
    <Divider showCopyright={true} animated={true} visible={dividerVisible}/>
    
    <!-- Programs content -->
    <div class="container mx-auto px-6 relative z-10 pb-16">
        <div 
            class="text-center mb-12 md:mb-16 mt-16 md:mt-20 transition-all duration-700 ease-out"
            class:opacity-0={!programsSectionVisible}
            class:translate-y-8={!programsSectionVisible}
            class:opacity-100={programsSectionVisible}
            class:translate-y-0={programsSectionVisible}
            data-animate="programs-section"
        >
            <div 
                class="inline-block mb-6 transition-all duration-700"
                class:opacity-0={!programsPillVisible}
                class:scale-90={!programsPillVisible}
                class:opacity-100={programsPillVisible}
                class:scale-100={programsPillVisible}
                data-animate="programs-pill"
            >
                <span class="px-4 py-2 bg-gradient-to-r from-dark-blue to-warm-blue text-white text-sm font-semibold rounded-full shadow-lg">
                    Versenyútvonal
                </span>
            </div>
            <h2 class="text-4xl md:text-6xl font-bold text-dark-blue mb-4">Programjaink</h2>
            <p class="text-desert-700 text-lg md:text-xl max-w-2xl mx-auto">
                Fedezd fel az Mesterséges Intelligencia Diákolimpia útját az első lépésektől a nemzetközi szintig
            </p>
        </div>

        <!-- PROGRESSION PATH -->
        <div class="grid lg:grid-cols-3 gap-6 lg:gap-6 max-w-7xl mx-auto relative mt-4">
            
            <!-- Animated Roadmap Path (Desktop Only) -->
            <div class="hidden lg:block absolute -top-12 left-0 right-0 pointer-events-none z-0">
                <!-- Background glow effect -->
                <div class="absolute top-0 left-[16%] right-[16%] h-1 flex items-center">
                    <div class="w-full h-0.5 bg-gradient-to-r from-desert-600 via-warm-blue to-desert-400 opacity-30 blur-sm"></div>
                </div>
                
                <!-- Main connecting line with SVG -->
                <div class="absolute top-0 left-[16.5%] right-[16.5%] h-1 flex items-center">
                    <svg class="w-full h-1" preserveAspectRatio="none" viewBox="0 0 100 4">
                        <defs>
                            <linearGradient id="roadmapGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" style="stop-color:#4A5F7F;stop-opacity:1" />
                                <stop offset="50%" style="stop-color:#5B7AA0;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#6B8AAF;stop-opacity:1" />
                            </linearGradient>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                                <feMerge>
                                    <feMergeNode in="coloredBlur"/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                        </defs>
                        <!-- Base line -->
                        <rect x="0" y="1.5" width="100" height="1" fill="url(#roadmapGradient)" />
                        <!-- Animated flowing light with glow -->
                        <circle cx="0" cy="2" r="2" fill="white" opacity="0.9" filter="url(#glow)" class="animate-flow-dot" />
                    </svg>
                </div>
                
                <!-- Checkpoint dots with synchronized pulse -->
                <div class="absolute top-0 left-[16.666%] w-3 h-3 -ml-1.5 -mt-1">
                    <div class="absolute inset-0 rounded-full bg-desert-600 shadow-lg border-2 border-white"></div>
                    <div class="absolute inset-0 rounded-full bg-desert-600 checkpoint-pulse-1"></div>
                </div>
                <div class="absolute top-0 left-[50%] w-3 h-3 -ml-1.5 -mt-1">
                    <div class="absolute inset-0 rounded-full bg-warm-blue shadow-lg border-2 border-white"></div>
                    <div class="absolute inset-0 rounded-full bg-warm-blue checkpoint-pulse-2"></div>
                </div>
                <div class="absolute top-0 left-[83.333%] w-3 h-3 -ml-1.5 -mt-1">
                    <div class="absolute inset-0 rounded-full bg-desert-400 shadow-lg border-2 border-white"></div>
                    <div class="absolute inset-0 rounded-full bg-desert-400 checkpoint-pulse-3"></div>
                </div>
            </div>
            
            <!-- STAGE 1: MÓLÓ -->
            <div 
                class="relative z-10 group transition-all duration-700 ease-out"
                class:opacity-0={!card1Visible}
                class:translate-y-12={!card1Visible}
                class:opacity-100={card1Visible}
                class:translate-y-0={card1Visible}
                data-animate="card-1"
                style="transition-delay: 100ms;"
            >
                <div class="bg-off-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-dark-blue group-hover:border-warm-blue transform hover:scale-105 hover:-translate-y-2 h-full flex flex-col">
                    <!-- Neural Network Corner -->
                    <div class="absolute top-0 right-0 w-48 h-48 opacity-40 pointer-events-none z-10">
                        <NeuralNetwork nodeCount={6} position="corner" />
                    </div>
                    
                    <div class="absolute inset-0 bg-gradient-to-br from-desert-600/5 to-warm-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div class="relative p-6 flex-1 flex flex-col">
                        <div class="mb-4">
                            <div class="flex items-center gap-2 mb-3">
                                <div class="inline-block px-4 py-1.5 bg-dark-blue group-hover:bg-warm-blue text-off-white text-sm font-bold rounded-full shadow-md transition-colors duration-500">
                                    🎯 SZAKKÖR
                                </div>
                                <!-- Stage Number Badge -->
                                <div class="relative inline-flex items-center justify-center px-3 py-1.5 bg-dark-blue group-hover:bg-warm-blue text-off-white text-sm font-bold rounded-full shadow-md transition-colors duration-500">
                                    <div class="absolute inset-0 rounded-full bg-dark-blue group-hover:bg-warm-blue badge-pulse-1 transition-colors duration-500"></div>
                                    <span class="relative">1</span>
                                </div>
                            </div>
                            <h3 class="text-3xl md:text-4xl font-bold text-dark-blue mb-2">MÓLÓ</h3>
                            <p class="text-desert-500 font-semibold mb-2 text-sm">Mesterséges Intelligencia Diákolimpia Felkészítő Szakkör</p>
                            <div class="w-20 h-1.5 bg-gradient-to-r from-dark-blue to-desert-600 group-hover:from-warm-blue group-hover:to-dark-blue rounded-full transition-all duration-500"></div>
                        </div>
                        
                        <p class="text-desert-700 text-sm leading-relaxed mb-4">
                            Ingyenes, online felkészítő program, amely segít megismerni a mesterséges intelligencia alapjait és felkészülni a versenyekre.
                        </p>
                        
                        <div class="mb-4">
                            <div class="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-800 rounded-lg font-medium text-sm">
                                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                </svg>
                                Regisztráció elindult!
                            </div>
                        </div>

                        <div class="mt-auto flex flex-col gap-3">
                            <a 
                                href="{base}/molo" 
                                class="group relative inline-flex items-center justify-center px-6 py-3 bg-dark-blue text-off-white font-semibold rounded-lg overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 w-full"
                            >
                                <span class="absolute inset-0 bg-warm-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                <span class="relative flex items-center">
                                    Tovább a programra
                                    <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </a>
                            <a 
                                href="https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=SLszAZD3YEWmTaxGpHL7vIltOKsbGD1HtZWjpnYwaJ5URENSU0lPWVBCRlBWUEdHMVhNWUdNQ1RaTy4u" 
                                target="_blank"
                                rel="noopener noreferrer"
                                class="group relative inline-flex items-center justify-center px-6 py-3 bg-dark-blue text-off-white font-semibold rounded-lg overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 w-full"
                            >
                                <span class="absolute inset-0 bg-warm-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                <span class="relative flex items-center">
                                    <svg class="w-5 h-5 mr-2 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Csatlakozz
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- STAGE 2: HAIO -->
            <div 
                class="relative z-10 group transition-all duration-700 ease-out"
                class:opacity-0={!card2Visible}
                class:translate-y-12={!card2Visible}
                class:opacity-100={card2Visible}
                class:translate-y-0={card2Visible}
                data-animate="card-2"
                style="transition-delay: 200ms;"
            >
                <div class="bg-off-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-dark-blue group-hover:border-warm-blue transform hover:scale-105 hover:-translate-y-2 h-full flex flex-col">
                    <!-- Neural Network Corner -->
                    <div class="absolute top-0 right-0 w-48 h-48 opacity-40 pointer-events-none z-10">
                        <NeuralNetwork nodeCount={6} position="corner" />
                    </div>
                    
                    <div class="absolute inset-0 bg-gradient-to-br from-warm-blue/5 to-dark-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div class="relative p-6 flex-1 flex flex-col">
                        <div class="mb-4">
                            <div class="flex items-center gap-2 mb-3">
                                <div class="inline-block px-4 py-1.5 bg-dark-blue group-hover:bg-warm-blue text-off-white text-sm font-bold rounded-full shadow-md transition-colors duration-500">
                                    🏆 VÁLOGATÓVERSENY
                                </div>
                                <!-- Stage Number Badge -->
                                <div class="relative inline-flex items-center justify-center px-3 py-1.5 bg-dark-blue group-hover:bg-warm-blue text-off-white text-sm font-bold rounded-full shadow-md transition-colors duration-500">
                                    <div class="absolute inset-0 rounded-full bg-dark-blue group-hover:bg-warm-blue badge-pulse-2 transition-colors duration-500"></div>
                                    <span class="relative">2</span>
                                </div>
                            </div>
                            <h3 class="text-3xl md:text-4xl font-bold text-dark-blue mb-2">HAIO</h3>
                            <p class="text-desert-500 font-semibold mb-2 text-sm">Hungarian Artificial Intelligence Olympiad</p>
                            <div class="w-20 h-1.5 bg-gradient-to-r from-dark-blue to-desert-600 group-hover:from-warm-blue group-hover:to-dark-blue rounded-full transition-all duration-500"></div>
                        </div>
                        
                        <p class="text-desert-700 text-sm leading-relaxed mb-4">
                            Válogatóverseny és felkészítés a nemzetközi MI diákolimpiákra. A HAIO keretében készülnek fel a versenyzők az IOAI és IAIO megmérettetésekre.
                        </p>
                        
                        <div class="mb-4">
                            <div class="inline-flex items-center px-3 py-1.5 bg-red-100 text-red-800 rounded-lg font-medium text-sm">
                                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                                </svg>
                                Regisztráció még nem elérhető
                            </div>
                        </div>

                        <div class="mt-auto flex flex-col gap-3">
                            <a 
                                href="{base}/haio" 
                                class="group relative inline-flex items-center justify-center px-6 py-3 bg-dark-blue text-off-white font-semibold rounded-lg overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 w-full"
                            >
                                <span class="absolute inset-0 bg-warm-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                <span class="relative flex items-center">
                                    Tovább a programra
                                    <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </a>
                            <button 
                                disabled
                                class="inline-flex items-center justify-center px-6 py-3 bg-gray-300 text-gray-500 font-semibold rounded-lg cursor-not-allowed opacity-60 w-full"
                            >
                                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Csatlakozz
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- STAGE 3: INTERNATIONAL OLYMPIADS -->
            <div 
                class="relative z-10 group transition-all duration-700 ease-out"
                class:opacity-0={!card3Visible}
                class:translate-y-12={!card3Visible}
                class:opacity-100={card3Visible}
                class:translate-y-0={card3Visible}
                data-animate="card-3"
                style="transition-delay: 300ms;"
            >
                <div class="bg-off-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-dark-blue group-hover:border-warm-blue transform hover:scale-105 hover:-translate-y-2 h-full flex flex-col">
                    <!-- Neural Network Corner -->
                    <div class="absolute top-0 right-0 w-48 h-48 opacity-40 pointer-events-none z-10">
                        <NeuralNetwork nodeCount={6} position="corner" />
                    </div>
                    
                    <div class="absolute inset-0 bg-gradient-to-br from-desert-400/5 to-desert-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div class="relative p-6 flex-1 flex flex-col">
                        <div class="mb-4">
                            <div class="flex items-center gap-2 mb-3">
                                <div class="inline-block px-4 py-1.5 bg-dark-blue group-hover:bg-warm-blue text-white text-sm font-bold rounded-full shadow-md transition-colors duration-500">
                                    🌍 NEMZETKÖZI VERSENYEK
                                </div>
                                <!-- Stage Number Badge with Pulse -->
                                <div class="relative inline-flex items-center justify-center px-3 py-1.5 bg-dark-blue group-hover:bg-warm-blue text-white text-sm font-bold rounded-full shadow-md transition-colors duration-500">
                                    <div class="absolute inset-0 rounded-full bg-dark-blue group-hover:bg-warm-blue badge-pulse-3 transition-colors duration-500"></div>
                                    <span class="relative">3</span>
                                </div>
                            </div>
                            <h3 class="text-3xl md:text-4xl font-bold text-dark-blue mb-2">Nemzetközi Olimpiák</h3>
                            <p class="text-desert-500 font-semibold mb-2 text-sm">IOAI & IAIO</p>
                            <div class="w-20 h-1.5 bg-gradient-to-r from-dark-blue to-desert-600 group-hover:from-warm-blue group-hover:to-dark-blue rounded-full transition-all duration-500"></div>
                        </div>
                        
                        <p class="text-desert-700 text-sm leading-relaxed mb-4">
                            A HAIO legjobb versenyzői képviselik Magyarországot a nemzetközi MI diákolimpiákon.
                        </p>
                        
                        <div class="mb-4 space-y-2 bg-desert-50 rounded-lg p-3">
                            <div>
                                <div class="flex items-center mb-0.5">
                                    <svg class="w-4 h-4 text-desert-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span class="font-semibold text-dark-blue text-sm">IOAI</span>
                                </div>
                                <p class="text-xs text-desert-600 ml-6">International Olympiad in Artificial Intelligence</p>
                            </div>
                            <div>
                                <div class="flex items-center mb-0.5">
                                    <svg class="w-4 h-4 text-desert-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span class="font-semibold text-dark-blue text-sm">IAIO</span>
                                </div>
                                <p class="text-xs text-desert-600 ml-6">International Artificial Intelligence Olympiad</p>
                            </div>
                        </div>

                        <div class="mt-auto flex flex-col gap-3">
                            <a 
                                href="#international" 
                                class="group relative inline-flex items-center justify-center px-6 py-3 bg-dark-blue text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 w-full"
                            >
                                <span class="absolute inset-0 bg-warm-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                <span class="relative flex items-center">
                                    A versenyekről
                                    <svg class="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                    </svg>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- DIVIDER BEFORE TIMELINE -->
<section id="dates" class="relative bg-desert-100" data-animate="divider-2">
	<Divider showCopyright={true} animated={true} visible={divider2Visible} />
</section>

<!-- FONTOS IDŐPONTOK (TIMELINE) SECTION - PROFESSIONAL VERSION -->
<section class="min-h-screen bg-desert-100 relative overflow-hidden py-24">
	<!-- Neural Network Background -->
	<div class="absolute inset-0 opacity-20">
		<NeuralNetwork nodeCount={25} position="full" />
	</div>

	<!-- Section Header -->
	<div 
        class="relative z-10 max-w-7xl mx-auto px-6 mb-4 transition-all duration-700"
        class:opacity-0={!timelineHeaderVisible}
        class:translate-y-8={!timelineHeaderVisible}
        class:opacity-100={timelineHeaderVisible}
        class:translate-y-0={timelineHeaderVisible}
        data-animate="timeline-header"
    >
		<div class="text-center">
			<div 
                class="inline-block mb-6 transition-all duration-700"
                class:opacity-0={!timelinePillVisible}
                class:scale-90={!timelinePillVisible}
                class:opacity-100={timelinePillVisible}
                class:scale-100={timelinePillVisible}
                data-animate="timeline-pill"
            >
                <span class="px-4 py-2 bg-gradient-to-r from-dark-blue to-warm-blue text-white text-sm font-semibold rounded-full shadow-lg">
                    Eseménynaptár
                </span>
            </div>
			<h2 class="text-4xl md:text-6xl font-bold text-dark-blue mb-4">
				Fontos Időpontok
			</h2>
			<p class="text-desert-700 text-lg md:text-xl max-w-2xl mx-auto">
				Kövesse nyomon programjaink legfontosabb mérföldköveit és eseményeit
			</p>
		</div>
	</div>

	<!-- Timeline Container -->
	<div class="relative z-10 max-w-6xl mx-auto px-6 pb-2">
		<!-- Timeline Grid -->
		<div class="space-y-6">
			{#each timelineEvents as event, index}
				{@const isPast = isEventPast(event.actualDate)}
				{@const nextEvent = timelineEvents[index + 1]}
				{@const nextIsPast = nextEvent ? isEventPast(nextEvent.actualDate) : false}
				
				<div 
					class="timeline-event relative transition-all duration-700"
					class:opacity-0={!event.visible}
					class:translate-y-8={!event.visible}
					class:opacity-100={event.visible}
					class:translate-y-0={event.visible}
					data-timeline-event={index}
					style="transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1) {index * 80}ms;"
				>
					<!-- Vertical Line Segment - changes color based on past/future -->
					<div class="absolute left-8 top-0 h-full w-0.5 {isPast ? 'bg-slate-300' : 'bg-gradient-to-b from-dark-blue to-warm-blue'}"></div>
					
					<!-- Connecting line to next event -->
					{#if index < timelineEvents.length - 1}
						<div class="absolute left-8 bottom-0 translate-y-6 h-6 w-0.5 {nextIsPast ? 'bg-slate-300' : 'bg-warm-blue'}"></div>
					{/if}

					<!-- Event Card -->
					<div class="group relative">						
						<!-- Main Card -->
						<div class="relative ml-20 bg-white rounded-2xl shadow-lg border transition-all duration-500 {isPast ? 'border-slate-200 opacity-60' : 'border-slate-200 hover:border-warm-blue hover:shadow-2xl hover:-translate-y-1'}">
							<!-- Status Indicator Dot - Centered on line -->
							<div class="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-[64px] w-8 h-8 rounded-full border-4 bg-white transition-all duration-300 shadow-lg z-20 {isPast ? 'border-slate-300' : 'border-dark-blue group-hover:scale-110 group-hover:border-warm-blue'}">
								{#if isPast}
									<!-- Checkmark for past events -->
									<svg class="w-4 h-4 text-slate-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
									</svg>
								{:else}
									<!-- Pulse for upcoming events -->
									<div class="absolute inset-0 rounded-full bg-warm-blue opacity-0 group-hover:opacity-25 animate-ping"></div>
								{/if}
							</div>

							<!-- Card Content -->
							<div class="p-6 md:p-8">
								<div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
									<!-- Left: Date & Project -->
									<div class="flex items-center gap-4">
										<!-- Date Badge -->
										<div class="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 {isPast ? 'bg-slate-100 text-slate-500' : 'bg-gradient-to-r from-dark-blue/10 to-warm-blue/10 text-dark-blue'}">
											<svg class="w-5 h-5 {isPast ? 'text-slate-400' : 'text-warm-blue'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
											</svg>
											<span class="font-semibold text-sm tracking-wide">{event.date}</span>
										</div>

										<!-- Project Badge -->
										<div class="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider transition-all duration-300 {isPast ? 'bg-slate-200 text-slate-500' : event.project === 'MÓLÓ' ? 'bg-dark-blue text-white' : 'bg-warm-blue text-white'}">
											{event.project}
										</div>
									</div>

									<!-- Right: Status Label -->
									{#if !isPast}
										<div class="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full text-xs font-semibold">
											<div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
											Közelgő
										</div>
									{:else}
										<div class="flex items-center gap-2 text-slate-500 bg-slate-50 px-4 py-1.5 rounded-full text-xs font-semibold">
											<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
											</svg>
											Lezajlott
										</div>
									{/if}
								</div>

								<!-- Event Title -->
								<h3 class="text-2xl md:text-3xl font-bold mb-3 transition-colors duration-300 {isPast ? 'text-slate-500' : 'text-slate-900 group-hover:text-warm-blue'}">
									{event.title}
								</h3>

								<!-- Event Description -->
								{#if event.description}
									<p class="text-base leading-relaxed {isPast ? 'text-slate-400' : 'text-slate-600'}">
										{event.description}
									</p>
								{/if}

								<!-- Teams Link Notice -->
								{#if event.teams}
									<div class="mt-4 flex items-center gap-2 text-xs italic {isPast ? 'text-slate-400' : 'text-slate-500'}">
										<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
											<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
										</svg>
										<span>Az MSTeams Link a Discordon kerül megosztásra</span>
									</div>
								{/if}

								<!-- Decorative Bottom Border -->
								<div class="mt-6 h-1 w-20 rounded-full transition-all duration-300 {isPast ? 'bg-slate-200' : 'bg-gradient-to-r from-dark-blue to-warm-blue group-hover:w-32'}"></div>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- DIVIDER BEFORE INTERNATIONAL SECTION -->
<section id="international" class="relative bg-desert-100" data-animate="divider-3">
	<Divider showCopyright={true} animated={true} visible={divider3Visible} />
</section>

<!-- NEMZETKÖZI VERSENYEK (INTERNATIONAL COMPETITIONS) SECTION -->
<section 
	class="relative overflow-hidden transition-all duration-1000"
	class:opacity-0={!internationalSectionVisible}
	class:opacity-100={internationalSectionVisible}
	data-animate="international-section"
>
	<!-- Section Header - Floating Above -->
	<div class="absolute top-12 sm:top-16 md:top-8 left-0 right-0 z-30 text-center px-6">
		<div class="inline-block mb-2 md:mb-3">
			<span class="px-3 py-1.5 md:px-4 md:py-2 bg-dark-blue/80 backdrop-blur-md text-white text-xs md:text-sm font-semibold rounded-full shadow-lg">
				Világverseny
			</span>
		</div>
		<h2 class="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-1 md:mb-2 drop-shadow-2xl">
			Nemzetközi Versenyek
		</h2>
		<p class="text-white/90 text-sm md:text-base lg:text-lg max-w-2xl mx-auto drop-shadow-lg">
			Képviseld Magyarországot a világ legnagyobb MI diákolimpiáin!
		</p>
	</div>

	<!-- Full Viewport Split Screen -->
	<div class="flex flex-col lg:flex-row min-h-screen">
		
		<!-- IOAI - Left Half (Full Viewport Height) -->
		<div class="relative group flex-1 min-h-[50vh] lg:min-h-screen pt-32 sm:pt-36 md:pt-24 lg:pt-0">
			<!-- Background Image with Zoom Animation -->
			<div class="absolute inset-0 overflow-hidden">
				{#each ioaiImages as image, index}
					<div 
						class="absolute inset-0 transition-all duration-[2000ms] ease-in-out"
						class:opacity-100={currentIoaiIndex === index}
						class:opacity-0={currentIoaiIndex !== index}
						class:scale-100={currentIoaiIndex === index}
						class:scale-110={currentIoaiIndex !== index}
						style="background-image: url('{image}'); background-size: cover; background-position: center;"
					></div>
				{/each}
				<!-- Dark Overlay -->
				<div class="absolute inset-0 bg-gradient-to-br from-dark-blue/70 via-dark-blue/50 to-dark-blue/30"></div>
			</div>

			<!-- Frosted Glass Card - Centered -->
			<div class="relative h-full flex items-center justify-center p-6 md:p-12">
				<div class="backdrop-blur-2xl bg-white/10 rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl max-w-md w-full transform transition-all duration-500 group-hover:scale-[1.02] group-hover:bg-white/15">
					<!-- Competition Badge -->
					<div class="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full mb-4 border border-white/30">
						<div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
						<span class="text-white text-xs font-bold tracking-wider">KÖVETKEZŐ ESEMÉNY</span>
					</div>

					<!-- Logo/Title -->
					<div class="mb-4">
						<h3 class="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
							IOAI
						</h3>
						<p class="text-white/90 text-sm font-medium tracking-wide">
							International Olympiad in Artificial Intelligence
						</p>
					</div>

					<!-- Description -->
					<p class="text-white/80 text-sm md:text-base mb-5 leading-relaxed">
						A International Olympiad in Artificial Intelligence (IOAI) egyéni verseny, amely a mesterséges intelligencia valós, gyakorlati felhasználására és eszközeire fókuszál.
					</p>

					<!-- Location Info with Icon -->
					<div class="flex items-center gap-3 mb-5">
						<div class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
							<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
						</div>
						<div>
							<p class="text-white font-bold text-base">Abu Dhabi, UAE</p>
							<p class="text-white/70 text-sm">2026. augusztus</p>
						</div>
					</div>

					<!-- Action Button -->
					<a href="https://ioai-official.org" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 bg-white text-dark-blue rounded-full font-semibold text-sm transition-all duration-300 hover:bg-warm-blue hover:text-white hover:shadow-2xl hover:scale-105 group/btn">
						<svg class="w-4 h-4 transition-transform duration-300 group-hover/btn:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
						</svg>
						<span>Tudj meg többet</span>
					</a>
				</div>
			</div>
		</div>

		<!-- IAIO - Right Half (Full Viewport Height) -->
		<div class="relative group flex-1 min-h-[50vh] lg:min-h-screen">
			<!-- Background Image with Zoom Animation -->
			<div class="absolute inset-0 overflow-hidden">
				{#each iaioImages as image, index}
					<div 
						class="absolute inset-0 transition-all duration-[2000ms] ease-in-out"
						class:opacity-100={currentIaioIndex === index}
						class:opacity-0={currentIaioIndex !== index}
						class:scale-100={currentIaioIndex === index}
						class:scale-110={currentIaioIndex !== index}
						style="background-image: url('{image}'); background-size: cover; background-position: center;"
					></div>
				{/each}
				<!-- Dark Overlay -->
				<div class="absolute inset-0 bg-gradient-to-bl from-warm-blue/70 via-warm-blue/50 to-warm-blue/30"></div>
			</div>

			<!-- Frosted Glass Card - Centered -->
			<div class="relative h-full flex items-center justify-center p-6 md:p-12">
				<div class="backdrop-blur-2xl bg-white/10 rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl max-w-md w-full transform transition-all duration-500 group-hover:scale-[1.02] group-hover:bg-white/15">
					<!-- Competition Badge -->
					<div class="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full mb-4 border border-white/30">
						<div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
						<span class="text-white text-xs font-bold tracking-wider">KÖVETKEZŐ ESEMÉNY</span>
					</div>

					<!-- Logo/Title -->
					<div class="mb-4">
						<h3 class="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
							IAIO
						</h3>
						<p class="text-white/90 text-sm font-medium tracking-wide">
							International Artificial Intelligence Olympiad
						</p>
					</div>

					<!-- Description -->
					<p class="text-white/80 text-sm md:text-base mb-5 leading-relaxed">
						Az IAIO egy nemzetközi verseny középiskolások számára, amely elméleti és gyakorlati mesterséges intelligencia-kihívásokkal mér kiemelkedő tehetségeket.
					</p>

					<!-- Location Info with Icon -->
					<div class="flex items-center gap-3 mb-5">
						<div class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
							<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
						</div>
						<div>
							<p class="text-white font-bold text-base">Ljubljana, Slovenia</p>
							<p class="text-white/70 text-sm">2026. január</p>
						</div>
					</div>

					<!-- Action Button -->
					<a href="https://www.iaio-official.org/" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 bg-white text-dark-blue rounded-full font-semibold text-sm transition-all duration-300 hover:bg-warm-blue hover:text-white hover:shadow-2xl hover:scale-105 group/btn">
						<svg class="w-4 h-4 transition-transform duration-300 group-hover/btn:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
						</svg>
						<span>Tudj meg többet</span>
					</a>
				</div>
			</div>
		</div>

	</div>
</section>

<!-- DIVIDER BEFORE SPONSORS -->
<section class="relative bg-desert-100" data-animate="divider-4">
	<Divider showCopyright={true} animated={true} visible={divider4Visible} />
</section>

<!-- SPONSORS SECTION -->
<section 
	class="relative py-12 bg-desert-100 transition-all duration-1000 overflow-hidden"
	class:opacity-0={!sponsorsSectionVisible}
	class:opacity-100={sponsorsSectionVisible}
	data-animate="sponsors-section"
>
	<!-- Neural Network Background -->
	<div class="absolute inset-0 opacity-5">
		<NeuralNetwork nodeCount={25} position="full" />
	</div>

	<div class="container mx-auto px-6 relative z-10">
		<!-- Section Header -->
		<div class="text-center mb-6 transition-all duration-700 delay-100"
			class:opacity-0={!sponsorsSectionVisible}
			class:translate-y-8={!sponsorsSectionVisible}
			class:opacity-100={sponsorsSectionVisible}
			class:translate-y-0={sponsorsSectionVisible}
		>
			<h2 class="text-3xl md:text-4xl font-bold text-dark-blue">
				Támogatóink
			</h2>
		</div>

		<!-- Gold Tier -->
		<div class="mb-8 transition-all duration-700 delay-200"
			class:opacity-0={!sponsorsSectionVisible}
			class:translate-y-8={!sponsorsSectionVisible}
			class:opacity-100={sponsorsSectionVisible}
			class:translate-y-0={sponsorsSectionVisible}
		>
			<div class="flex items-center justify-center gap-3 mb-4">
				<div class="h-px w-12 bg-gradient-to-r from-transparent to-yellow-400/50"></div>
				<span class="text-xs font-bold tracking-[0.3em] text-yellow-600 uppercase">Arany</span>
				<div class="h-px w-12 bg-gradient-to-l from-transparent to-yellow-400/50"></div>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
				<a href="https://www.bosch.hu/" target="_blank" rel="noopener noreferrer" class="group relative overflow-hidden bg-white rounded-lg border border-slate-200 transition-all duration-500 hover:border-yellow-400 hover:-translate-y-1 h-24">
					<div class="absolute inset-0 bg-gradient-to-br from-yellow-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
					<div class="relative w-full h-full flex items-center justify-center p-4">
						<img src={`${base}/img/sponsors/BOSCH.png`} alt="Bosch" loading="lazy" class="max-w-full max-h-full object-contain opacity-70 group-hover:opacity-100 transition-all duration-500" style="max-height: 45px;" />
					</div>
				</a>
				<a href="https://www.ericsson.com/hu" target="_blank" rel="noopener noreferrer" class="group relative overflow-hidden bg-white rounded-lg border border-slate-200 transition-all duration-500 hover:border-yellow-400 hover:-translate-y-1 h-24">
					<div class="absolute inset-0 bg-gradient-to-br from-yellow-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
					<div class="relative w-full h-full flex items-center justify-center p-4">
						<img src={`${base}/img/sponsors/ERICSSON.png`} alt="Ericsson" loading="lazy" class="max-w-full max-h-full object-contain opacity-70 group-hover:opacity-100 transition-all duration-500" style="max-height: 70px;" />
					</div>
				</a>
				<a href="https://hungarikumalkusz.hu/" target="_blank" rel="noopener noreferrer" class="group relative overflow-hidden bg-white rounded-lg border border-slate-200 transition-all duration-500 hover:border-yellow-400 hover:-translate-y-1 h-24">
					<div class="absolute inset-0 bg-gradient-to-br from-yellow-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
					<div class="relative w-full h-full flex items-center justify-center p-4">
						<img src={`${base}/img/sponsors/HUNGARIKUMALKUSZ.png`} alt="Hungarikum Alkusz" loading="lazy" class="max-w-full max-h-full object-contain opacity-70 group-hover:opacity-100 transition-all duration-500" style="max-height: 45px;" />
					</div>
				</a>
			</div>
		</div>

		<!-- Silver Tier -->
		<div class="mb-8 transition-all duration-700 delay-300"
			class:opacity-0={!sponsorsSectionVisible}
			class:translate-y-8={!sponsorsSectionVisible}
			class:opacity-100={sponsorsSectionVisible}
			class:translate-y-0={sponsorsSectionVisible}
		>
			<div class="flex items-center justify-center gap-3 mb-4">
				<div class="h-px w-12 bg-gradient-to-r from-transparent to-slate-400/50"></div>
				<span class="text-xs font-bold tracking-[0.3em] text-slate-600 uppercase">Ezüst</span>
				<div class="h-px w-12 bg-gradient-to-l from-transparent to-slate-400/50"></div>
			</div>
			<div class="flex justify-center">
				<a href="https://www.andersen.com/" target="_blank" rel="noopener noreferrer" class="group relative overflow-hidden bg-white rounded-lg border border-slate-200 transition-all duration-500 hover:border-slate-400 hover:-translate-y-1" style="min-width: 300px;">
					<div class="absolute inset-0 bg-gradient-to-br from-slate-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
					<div class="relative p-6 flex items-center justify-center" style="min-height: 80px;">
						<img src={`${base}/img/sponsors/ANDERSEN.png`} alt="Andersen" loading="lazy" class="max-w-full h-auto object-contain opacity-70 group-hover:opacity-100 transition-all duration-500" style="max-height: 40px;" />
					</div>
				</a>
			</div>
		</div>

		<!-- Bronze Tier -->
		<div class="mb-8 transition-all duration-700 delay-400"
			class:opacity-0={!sponsorsSectionVisible}
			class:translate-y-8={!sponsorsSectionVisible}
			class:opacity-100={sponsorsSectionVisible}
			class:translate-y-0={sponsorsSectionVisible}
		>
			<div class="flex items-center justify-center gap-3 mb-4">
				<div class="h-px w-12 bg-gradient-to-r from-transparent to-orange-600/50"></div>
				<span class="text-xs font-bold tracking-[0.3em] text-orange-700 uppercase">Bronz</span>
				<div class="h-px w-12 bg-gradient-to-l from-transparent to-orange-600/50"></div>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
				<a href="https://www.msci.com/" target="_blank" rel="noopener noreferrer" class="group relative overflow-hidden bg-white rounded-lg border border-slate-200 transition-all duration-500 hover:border-orange-600 hover:-translate-y-1">
					<div class="absolute inset-0 bg-gradient-to-br from-orange-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
					<div class="relative p-5 flex items-center justify-center" style="min-height: 75px;">
						<img src={`${base}/img/sponsors/MSCI.png`} alt="MSCI" loading="lazy" class="max-w-full h-auto object-contain opacity-70 group-hover:opacity-100 transition-all duration-500" style="max-height: 35px;" />
					</div>
				</a>
				<a href="https://emet.gov.hu/kategoria/kiemelt-kategoriak/palyazatok/aktualis-felhivasok/nemzeti-tehetseg-program/" target="_blank" rel="noopener noreferrer" class="group relative overflow-hidden bg-white rounded-lg border border-slate-200 transition-all duration-500 hover:border-orange-600 hover:-translate-y-1">
					<div class="absolute inset-0 bg-gradient-to-br from-orange-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
					<div class="relative p-5 flex items-center justify-center" style="min-height: 75px;">
						<img src={`${base}/img/sponsors/NTP.png`} alt="NTP" loading="lazy" class="max-w-full h-auto object-contain opacity-70 group-hover:opacity-100 transition-all duration-500" style="max-height: 35px;" />
					</div>
				</a>
			</div>
		</div>

		<!-- Nature Tier -->
		<div class="transition-all duration-700 delay-500"
			class:opacity-0={!sponsorsSectionVisible}
			class:translate-y-8={!sponsorsSectionVisible}
			class:opacity-100={sponsorsSectionVisible}
			class:translate-y-0={sponsorsSectionVisible}
		>
			<div class="flex items-center justify-center gap-3 mb-4">
				<div class="h-px w-12 bg-gradient-to-r from-transparent to-emerald-500/50"></div>
				<span class="text-xs font-bold tracking-[0.3em] text-emerald-700 uppercase">Természetbeli Támogatók</span>
				<div class="h-px w-12 bg-gradient-to-l from-transparent to-emerald-500/50"></div>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-lg mx-auto">
				<a href="https://kifu.gov.hu/hpc-edih/" target="_blank" rel="noopener noreferrer" class="group relative overflow-hidden bg-white rounded-lg border border-slate-200 transition-all duration-500 hover:border-emerald-500 hover:-translate-y-1 h-36">
					<div class="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
					<div class="relative h-full p-5 flex items-center justify-center">
						<img src={`${base}/img/sponsors/HPC.png`} alt="HPC" loading="lazy" class="max-w-full max-h-full object-contain opacity-70 group-hover:opacity-100 transition-all duration-500" />
					</div>
				</a>
				<a href="https://www.elte.hu/" target="_blank" rel="noopener noreferrer" class="group relative overflow-hidden bg-white rounded-lg border border-slate-200 transition-all duration-500 hover:border-emerald-500 hover:-translate-y-1 h-36">
					<div class="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
					<div class="relative h-full p-5 flex items-center justify-center">
						<img src={`${base}/img/sponsors/ELTE.png`} alt="ELTE" loading="lazy" class="max-w-full max-h-full object-contain opacity-70 group-hover:opacity-100 transition-all duration-500" />
					</div>
				</a>
				<a href="https://njszt.hu/" target="_blank" rel="noopener noreferrer" class="group relative overflow-hidden bg-white rounded-lg border border-slate-200 transition-all duration-500 hover:border-emerald-500 hover:-translate-y-1 h-36">
					<div class="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
					<div class="relative h-full p-5 flex items-center justify-center">
						<img src={`${base}/img/sponsors/NJSZT.png`} alt="NJSZT" loading="lazy" class="max-w-full max-h-full object-contain opacity-70 group-hover:opacity-100 transition-all duration-500" />
					</div>
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	@keyframes blob {
		0% {
			transform: translate(0px, 0px) scale(1);
		}
		33% {
			transform: translate(30px, -50px) scale(1.1);
		}
		66% {
			transform: translate(-20px, 20px) scale(0.9);
		}
		100% {
			transform: translate(0px, 0px) scale(1);
		}
	}

	.animate-blob {
		animation: blob 7s infinite;
	}

	.animation-delay-2000 {
		animation-delay: 2s;
	}

	.animation-delay-4000 {
		animation-delay: 4s;
	}

	.animation-delay-200 {
		animation-delay: 0.2s;
	}

	.animation-delay-400 {
		animation-delay: 0.4s;
	}

	@keyframes scrollFade {
		0%, 100% {
			opacity: 0.4;
		}
		50% {
			opacity: 1;
		}
	}

	@keyframes scrollWheel {
		0% {
			transform: translateY(0);
			opacity: 1;
		}
		100% {
			transform: translateY(12px);
			opacity: 0;
		}
	}

	@keyframes swipeUp {
		0%, 100% {
			transform: translateY(0);
			opacity: 0.6;
		}
		50% {
			transform: translateY(-20px);
			opacity: 1;
		}
	}

	@keyframes swipeUpArrow {
		0%, 100% {
			transform: translateY(0);
			opacity: 0.4;
		}
		50% {
			transform: translateY(-10px);
			opacity: 1;
		}
	}

	.animate-scrollFade {
		animation: scrollFade 2s ease-in-out infinite;
	}

	.animate-scrollWheel {
		animation: scrollWheel 1.5s ease-in-out infinite;
	}

	.animate-swipeUp {
		animation: swipeUp 2s ease-in-out infinite;
	}

	.animate-swipeUpArrow {
		animation: swipeUpArrow 2s ease-in-out infinite;
	}

	@keyframes shimmer {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(100%);
		}
	}

	.animate-shimmer {
		animation: shimmer 3s ease-in-out infinite;
	}

	@keyframes flowDot {
		0%, 14.3% {
			cx: 0;
		}
		85.7% {
			cx: 100;
		}
		100% {
			cx: 100;
		}
	}

	.animate-flow-dot {
		animation: flowDot 7s ease-in-out infinite;
	}

	@keyframes checkpointPulse {
		0%, 14.3% {
			opacity: 0;
			transform: scale(1);
		}
		15.3% {
			opacity: 0.2;
			transform: scale(1.15);
		}
		16.3% {
			opacity: 0.35;
			transform: scale(1.3);
		}
		17.3% {
			opacity: 0.5;
			transform: scale(1.45);
		}
		18.3% {
			opacity: 0.6;
			transform: scale(1.6);
		}
		19.3% {
			opacity: 0.55;
			transform: scale(1.75);
		}
		20.3% {
			opacity: 0.48;
			transform: scale(1.9);
		}
		21.3% {
			opacity: 0.4;
			transform: scale(2.05);
		}
		22.3% {
			opacity: 0.3;
			transform: scale(2.2);
		}
		23.3% {
			opacity: 0.2;
			transform: scale(2.35);
		}
		24.3% {
			opacity: 0.1;
			transform: scale(2.5);
		}
		25.3%, 100% {
			opacity: 0;
			transform: scale(2.7);
		}
	}

	.checkpoint-pulse-1 {
		animation: checkpointPulse 7s cubic-bezier(0.4, 0, 0.2, 1) infinite;
		animation-delay: 0s;
	}

	.checkpoint-pulse-2 {
		animation: checkpointPulse 7s cubic-bezier(0.4, 0, 0.2, 1) infinite;
		animation-delay: 2.33s;
	}

	.checkpoint-pulse-3 {
		animation: checkpointPulse 7s cubic-bezier(0.4, 0, 0.2, 1) infinite;
		animation-delay: 4.66s;
	}

	/* Badge pulse animations - synchronized with flowing light */
	@keyframes badgePulse {
		0%, 14.3% {
			opacity: 0;
			transform: scale(1);
			box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
		}
		15.3% {
			opacity: 0.2;
			transform: scale(1.03);
			box-shadow: 0 0 6px 2px rgba(255, 255, 255, 0.2);
		}
		16.3% {
			opacity: 0.35;
			transform: scale(1.06);
			box-shadow: 0 0 10px 4px rgba(255, 255, 255, 0.35);
		}
		17.3% {
			opacity: 0.5;
			transform: scale(1.09);
			box-shadow: 0 0 14px 6px rgba(255, 255, 255, 0.5);
		}
		18.3% {
			opacity: 0.6;
			transform: scale(1.12);
			box-shadow: 0 0 18px 7px rgba(255, 255, 255, 0.6);
		}
		19.3% {
			opacity: 0.65;
			transform: scale(1.15);
			box-shadow: 0 0 20px 8px rgba(255, 255, 255, 0.65);
		}
		20.3% {
			opacity: 0.6;
			transform: scale(1.18);
			box-shadow: 0 0 22px 9px rgba(255, 255, 255, 0.65);
		}
		21.3% {
			opacity: 0.55;
			transform: scale(1.21);
			box-shadow: 0 0 23px 9px rgba(255, 255, 255, 0.6);
		}
		22.3% {
			opacity: 0.48;
			transform: scale(1.24);
			box-shadow: 0 0 23px 9px rgba(255, 255, 255, 0.5);
		}
		23.3% {
			opacity: 0.4;
			transform: scale(1.27);
			box-shadow: 0 0 22px 9px rgba(255, 255, 255, 0.4);
		}
		24.3% {
			opacity: 0.3;
			transform: scale(1.3);
			box-shadow: 0 0 20px 8px rgba(255, 255, 255, 0.3);
		}
		25.3% {
			opacity: 0.2;
			transform: scale(1.33);
			box-shadow: 0 0 16px 6px rgba(255, 255, 255, 0.2);
		}
		26.3% {
			opacity: 0.1;
			transform: scale(1.36);
			box-shadow: 0 0 12px 4px rgba(255, 255, 255, 0.1);
		}
		27.3%, 100% {
			opacity: 0;
			transform: scale(1.4);
			box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
		}
	}

	.badge-pulse-1 {
		animation: badgePulse 7s cubic-bezier(0.4, 0, 0.2, 1) infinite;
		animation-delay: 0s;
	}

	.badge-pulse-2 {
		animation: badgePulse 7s cubic-bezier(0.4, 0, 0.2, 1) infinite;
		animation-delay: 2.33s;
	}

	.badge-pulse-3 {
		animation: badgePulse 7s cubic-bezier(0.4, 0, 0.2, 1) infinite;
		animation-delay: 4.66s;
	}

	.video-control-btn {
		width: 44px;
		height: 44px;
		border-radius: 12px;
		background: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.3s ease;
		pointer-events: all;
	}

	.video-control-btn:hover {
		background: rgba(0, 0, 0, 0.8);
		border-color: rgba(255, 255, 255, 0.3);
		transform: scale(1.1);
	}

	.video-control-btn:active {
		transform: scale(0.95);
	}
</style>
