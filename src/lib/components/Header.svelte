<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { base } from '$app/paths';
    
    export let alwaysScrolled = false;
    
    let programDropdownOpen = false;
    let menuOpen = false;
    let yearDropdownOpen = false;
    let isHovered = false;
    let scrolled = false;


    $: effectiveScrolled = alwaysScrolled || scrolled;


    // Handle navigation with hash anchors
    async function navigateToHash(event: MouseEvent, href: string) {
        event.preventDefault();
        
        // Close dropdowns and mobile menu
        programDropdownOpen = false;
        yearDropdownOpen = false;
        menuOpen = false;
        
        // Extract path and hash
        const [path, hash] = href.split('#');
        const currentPath = $page.url.pathname;
        
        // Check if we're navigating to a different page
        const isDifferentPage = path && path !== currentPath;
        
        if (isDifferentPage) {
            // Navigate to the new page first
            await goto(href, { noScroll: true });
            
            // Wait for DOM to render, then scroll to hash
            if (hash) {
                setTimeout(() => {
                    const element = document.getElementById(hash);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 100);
            }
        } else if (hash) {
            // Same page, just scroll to hash
            const element = document.getElementById(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Update URL hash without navigation
                history.pushState(null, '', `#${hash}`);
            }
        } else {
            // No hash, just navigate
            goto(href);
        }
    }


    function toggleYearDropdown() {
        yearDropdownOpen = !yearDropdownOpen;
    }

    // Close dropdown when clicking outside
    function handleClickOutside(event: MouseEvent) {
        const target = event.target as HTMLElement;
        // Close year dropdown if clicking outside of it
        if (!target.closest('.year-dropdown')) {
            yearDropdownOpen = false;
        }
        // Close program dropdown if clicking outside of it
        if (!target.closest('.program-dropdown')) {
            programDropdownOpen = false;
        }
        // Close mobile menu if clicking outside of it
        if (!target.closest('.mobile-menu-container') && !target.closest('.mobile-menu-button')) {
            menuOpen = false;
        }
    }


    // Handle scroll event
    function handleScroll() {
        scrolled = window.scrollY > 50;
    }
</script>


<svelte:window on:click={handleClickOutside} on:scroll={handleScroll} />


<nav 
    class="fixed w-full z-50 top-0 transition-all duration-300 bg-off-white"
    class:lg:bg-transparent={!effectiveScrolled}
    class:lg:bg-off-white={effectiveScrolled}
    class:shadow-lg={effectiveScrolled}
    class:border-b={effectiveScrolled}
    class:border-desert-200={effectiveScrolled}
    style="transition: background-color 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;"
>
    <div class="max-w-full mx-auto px-12 py-3">
        <div class="flex justify-between items-center">
            <!-- Left side: HAIO Logo and text -->
            <div class="flex items-center space-x-3">
                <a 
                    href="{base}/" 
                    class="flex items-center space-x-3 group"
                >
                    <img src={`${base}/img/header/haio_header.png`} alt="HAIO Logo" class="h-11 w-11 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                    <div class="flex flex-col leading-tight">
                        <span class="text-xl font-bold tracking-wide transition-all duration-300 text-dark-blue lg:text-dark-blue lg:drop-shadow-none" class:lg:text-white={!effectiveScrolled} class:lg:drop-shadow-lg={!effectiveScrolled}>
                            HAIO
                        </span>
                        <span class="text-[10px] font-light tracking-widest uppercase transition-all duration-300 opacity-80 text-dark-blue lg:text-dark-blue lg:drop-shadow-none" class:lg:text-white={!effectiveScrolled} class:lg:drop-shadow-lg={!effectiveScrolled}>
                            Hungarian AI Olympiad
                        </span>
                    </div>
                </a>

                <!-- Slash Separator (hidden on mobile) -->
                <div class="hidden lg:block h-12 w-px mx-3 transition-colors duration-300 {effectiveScrolled ? 'bg-desert-300' : 'bg-white/40'}">
                </div>

                <!-- DOCK Logo and text (hidden on mobile) -->
                <a 
                    href="{base}/dock" 
                    class="hidden lg:flex items-center space-x-3 group"
                >
                    <img src={`${base}/img/dock/dockt_2.png`} alt="DOCK Logo" class="h-11 w-11 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                    <div class="flex flex-col leading-tight">
                        <span class="text-xl font-bold tracking-wide transition-all duration-300 text-dark-blue" class:lg:text-white={!effectiveScrolled} class:lg:drop-shadow-lg={!effectiveScrolled}>
                            DOCK
                        </span>
                        <span class="text-[10px] font-light tracking-widest uppercase transition-all duration-300 opacity-80 text-dark-blue" class:lg:text-white={!effectiveScrolled} class:lg:drop-shadow-lg={!effectiveScrolled}>
                            Digital Online Competence Kernel
                        </span>
                    </div>
                </a>
            </div>


            <!-- Mobile menu button -->
            <button 
                on:click={() => (menuOpen = !menuOpen)} 
                type="button" 
                class="lg:hidden focus:outline-none transition-all duration-300 mobile-menu-button text-dark-blue hover:text-warm-blue"
            >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {#if menuOpen}
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    {:else}
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    {/if}
                </svg>
            </button>


    <!-- Desktop Navigation -->
    <div class="hidden lg:flex items-center space-x-0.5 xl:space-x-1">
        <!-- Main navigation links -->
           <!-- Programok Dropdown -->
           <div class="relative program-dropdown">
               <button
                   on:click|stopPropagation|preventDefault={() => programDropdownOpen = !programDropdownOpen}
                   type="button"
                   class="relative px-2 xl:px-3 py-2 text-xs xl:text-sm font-medium transition-all duration-200 flex items-center space-x-1 rounded-md group overflow-hidden whitespace-nowrap"
                   class:text-dark-blue={effectiveScrolled} class:text-white={!effectiveScrolled} class:drop-shadow-lg={!effectiveScrolled}
               >
                   <span class="relative z-10 flex items-center space-x-1">
                       <span>Programok</span>
                       <svg class="w-3 xl:w-4 h-3 xl:h-4 transition-transform duration-200" class:rotate-180={programDropdownOpen} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                       </svg>
                   </span>
                   {#if effectiveScrolled}
                       <span class="absolute inset-0 bg-desert-200 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                   {:else}
                       <span class="absolute inset-0 bg-white/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                   {/if}
               </button>
               {#if programDropdownOpen}
                   <div class="absolute top-full left-0 mt-2 w-48 bg-off-white rounded-lg shadow-lg border border-desert-200 py-1 animate-fadeIn z-50">
                   <a href="{base}/#programs-desc" on:click={(e) => navigateToHash(e, `${base}/#programs-desc`)} class="block px-4 py-2 text-sm text-dark-blue hover:bg-desert-100 transition-colors duration-150">Programok Bemutatása</a>
                   <a href="{base}/molo" on:click={() => { programDropdownOpen = false; goto(`${base}/molo`); }} class="block px-4 py-2 text-sm text-dark-blue hover:bg-desert-100 transition-colors duration-150">MÓLÓ</a>
                   <a href="{base}/haio" on:click={() => { programDropdownOpen = false; goto(`${base}/haio`); }} class="block px-4 py-2 text-sm text-dark-blue hover:bg-desert-100 transition-colors duration-150">HAIO</a>
                   </div>
               {/if}
           </div>
        <a href="{base}/#dates" on:click={(e) => navigateToHash(e, `${base}/#dates`)} class="relative px-2 xl:px-3 py-2 text-xs xl:text-sm font-medium transition-all duration-200 rounded-md group overflow-hidden whitespace-nowrap" class:text-dark-blue={effectiveScrolled} class:text-white={!effectiveScrolled} class:drop-shadow-lg={!effectiveScrolled}>
            <span class="relative z-10">Fontos Időpontok</span>
            {#if effectiveScrolled}
                <span class="absolute inset-0 bg-desert-200 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
            {:else}
                <span class="absolute inset-0 bg-white/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
            {/if}
        </a>
           <a href="{base}/#international" on:click={(e) => navigateToHash(e, `${base}/#international`)} class="relative px-2 xl:px-3 py-2 text-xs xl:text-sm font-medium transition-all duration-200 rounded-md group overflow-hidden whitespace-nowrap" class:text-dark-blue={effectiveScrolled} class:text-white={!effectiveScrolled} class:drop-shadow-lg={!effectiveScrolled}>
               <span class="relative z-10">Nemzetközi Versenyek</span>
               {#if effectiveScrolled}
                   <span class="absolute inset-0 bg-desert-200 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
               {:else}
                   <span class="absolute inset-0 bg-white/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
               {/if}
           </a>
        <div class="relative year-dropdown">
            <button
                on:click|stopPropagation|preventDefault={toggleYearDropdown}
                type="button"
                class="relative px-2 xl:px-3 py-2 text-xs xl:text-sm font-medium transition-all duration-200 flex items-center space-x-1 rounded-md group overflow-hidden whitespace-nowrap" class:text-dark-blue={effectiveScrolled} class:text-white={!effectiveScrolled} class:drop-shadow-lg={!effectiveScrolled}>
                <span class="relative z-10 flex items-center space-x-1">
                    <span>Korábbi Évek</span>
                    <svg class="w-3 xl:w-4 h-3 xl:h-4 transition-transform duration-200" class:rotate-180={yearDropdownOpen} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
                {#if effectiveScrolled}
                    <span class="absolute inset-0 bg-desert-200 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                {:else}
                    <span class="absolute inset-0 bg-white/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                {/if}
            </button>
            {#if yearDropdownOpen}
                <div class="absolute top-full left-0 mt-2 w-32 bg-off-white rounded-lg shadow-lg border border-desert-200 py-1 animate-fadeIn">
                    <a href="{base}/2025" on:click={() => { yearDropdownOpen = false; goto(`${base}/2025`); }} class="block px-4 py-2 text-sm text-dark-blue hover:bg-desert-100 transition-colors duration-150">
                        2025
                    </a>
                    <a href="{base}/2024" on:click={() => { yearDropdownOpen = false; goto(`${base}/2024`); }} class="block px-4 py-2 text-sm text-dark-blue hover:bg-desert-100 transition-colors duration-150">
                        2024
                    </a>
                </div>
            {/if}
    </div>


    <!-- Hall of Fame Link -->
    <a href="{base}/hall-of-fame" on:click={() => goto(`${base}/hall-of-fame`)} class="relative px-2 xl:px-3 py-2 text-xs xl:text-sm font-medium transition-all duration-200 rounded-md group overflow-hidden whitespace-nowrap" class:text-dark-blue={effectiveScrolled} class:text-white={!effectiveScrolled} class:drop-shadow-lg={!effectiveScrolled}>
                    <span class="relative z-10">Hall of Fame</span>
                    {#if effectiveScrolled}
                        <span class="absolute inset-0 bg-desert-200 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    {:else}
                        <span class="absolute inset-0 bg-white/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    {/if}
                </a>


                <!-- GY.I.K. Link -->
                <a href="{base}/gyik" on:click={() => goto(`${base}/gyik`)} class="relative px-2 xl:px-3 py-2 text-xs xl:text-sm font-medium transition-all duration-200 rounded-md group overflow-hidden whitespace-nowrap" class:text-dark-blue={effectiveScrolled} class:text-white={!effectiveScrolled} class:drop-shadow-lg={!effectiveScrolled}>
                    <span class="relative z-10">GY.I.K.</span>
                    {#if effectiveScrolled}
                        <span class="absolute inset-0 bg-desert-200 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    {:else}
                        <span class="absolute inset-0 bg-white/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    {/if}
                </a>


                <!-- Vertical divider -->
                <div class="h-6 w-0.5 mx-1 xl:mx-2 transition-colors duration-500" class:bg-desert-300={effectiveScrolled} style={!effectiveScrolled ? 'background-color: rgba(255, 255, 255, 0.3);' : ''}></div>


                <!-- Social icons -->
                <a 
                       href="{base}/contact"
                       on:click={() => goto(`${base}/contact`)}
                    class="px-2 xl:px-3 py-2 transition-all duration-300" class:text-dark-blue={effectiveScrolled} class:hover:text-warm-blue={effectiveScrolled} class:text-white={!effectiveScrolled} class:hover:text-desert-100={!effectiveScrolled} class:drop-shadow-lg={!effectiveScrolled}
                    aria-label="Contact"
                >
                    <i class="fas fa-envelope text-lg xl:text-xl"></i>
                </a>
                <a 
                    href="https://discord.gg/KKTzNebjGW" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="px-2 xl:px-3 py-2 transition-all duration-300" class:text-dark-blue={effectiveScrolled} class:hover:text-warm-blue={effectiveScrolled} class:text-white={!effectiveScrolled} class:hover:text-desert-100={!effectiveScrolled} class:drop-shadow-lg={!effectiveScrolled}
                    aria-label="Discord"
                >
                    <i class="fab fa-discord text-lg xl:text-xl"></i>
                </a>
                <a 
                    href="https://www.linkedin.com/company/hungarian-ai-olympiad-haio/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="px-2 xl:px-3 py-2 transition-all duration-300" class:text-dark-blue={effectiveScrolled} class:hover:text-warm-blue={effectiveScrolled} class:text-white={!effectiveScrolled} class:hover:text-desert-100={!effectiveScrolled} class:drop-shadow-lg={!effectiveScrolled}
                    aria-label="LinkedIn"
                >
                    <i class="fab fa-linkedin text-lg xl:text-xl"></i>
                </a>
            </div>
        </div>


    <!-- Mobile Navigation -->
    {#if menuOpen}
        <div class="lg:hidden mt-4 pb-4 animate-fadeIn mobile-menu-container">
            <div class="flex flex-col space-y-2">
                <!-- DOCK Link with Logo (Mobile) -->
                <a href="{base}/dock" on:click={() => { menuOpen = false; goto(`${base}/dock`); }} class="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-warm-blue/10 to-dark-blue/10 rounded-lg border border-warm-blue/20 hover:border-warm-blue/40 transition-all duration-200">
                    <img src={`${base}/img/dock/dock_2.png`} alt="DOCK" class="h-10 w-10 object-contain" />
                    <div class="flex flex-col">
                        <span class="text-sm font-bold text-dark-blue">DOCK</span>
                        <span class="text-[9px] text-desert-700 uppercase tracking-wide">Digital Online Competence Kernel</span>
                    </div>
                </a>

                   <!-- Programok Dropdown (Mobile) -->
                   <div class="px-4 py-2">
                       <div class="text-sm font-medium text-desert-700 mb-2">Programok</div>
                       <div class="pl-4 space-y-1">
                           <a href="{base}/#programs-desc" on:click={(e) => { menuOpen = false; navigateToHash(e, `${base}/#programs-desc`); }} class="block py-1 text-sm text-dark-blue hover:text-warm-blue">Programok Bemutatása</a>
                        <a href="{base}/molo" on:click={() => { menuOpen = false; goto(`${base}/molo`); }} class="block py-1 text-sm text-dark-blue hover:text-warm-blue">MÓLÓ</a>
                        <a href="{base}/haio" on:click={() => { menuOpen = false; goto(`${base}/haio`); }} class="block py-1 text-sm text-dark-blue hover:text-warm-blue">HAIO</a>
                       </div>
                   </div>
                    <a href="{base}/#dates" on:click={(e) => { menuOpen = false; navigateToHash(e, `${base}/#dates`); }} class="px-4 py-2 text-sm font-medium text-dark-blue hover:bg-desert-100 rounded-lg transition-colors duration-200">
                        Fontos Időpontok
                    </a>
                    <a href="{base}/#international" on:click={(e) => { menuOpen = false; navigateToHash(e, `${base}/#international`); }} class="px-4 py-2 text-sm font-medium text-dark-blue hover:bg-desert-100 rounded-lg transition-colors duration-200">
                        Nemzetközi Versenyek
                    </a>
                    
                <div class="px-4 py-2">
                    <div class="text-sm font-medium text-desert-700 mb-2">Korábbi Évek</div>
                    <div class="pl-4 space-y-1">
                        <a href="{base}/2025" on:click={() => { menuOpen = false; goto(`${base}/2025`); }} class="block py-1 text-sm text-dark-blue hover:text-warm-blue">2025</a>
                        <a href="{base}/2024" on:click={() => { menuOpen = false; goto(`${base}/2024`); }} class="block py-1 text-sm text-dark-blue hover:text-warm-blue">2024</a>
            </div>
        </div>              <a href="{base}/hall-of-fame" on:click={() => { menuOpen = false; goto(`${base}/hall-of-fame`); }} class="px-4 py-2 text-sm font-medium text-dark-blue hover:bg-desert-100 rounded-lg transition-colors duration-200">
                    Hall of Fame
                </a>


                <a href="{base}/gyik" on:click={() => { menuOpen = false; goto(`${base}/gyik`); }} class="px-4 py-2 text-sm font-medium text-dark-blue hover:bg-desert-100 rounded-lg transition-colors duration-200">
                    GY.I.K.
                </a>

                <div class="border-t border-desert-200 my-2"></div>

                <div class="flex items-center justify-around px-4 py-2">
                    <a href="{base}/contact" on:click={() => { menuOpen = false; goto(`${base}/contact`); }} class="text-dark-blue hover:text-warm-blue" aria-label="Contact">
                        <i class="fas fa-envelope text-2xl"></i>
                    </a>
                    <a href="https://discord.gg/KKTzNebjGW" target="_blank" rel="noopener noreferrer" on:click={() => menuOpen = false} class="text-dark-blue hover:text-warm-blue" aria-label="Discord">
                        <i class="fab fa-discord text-2xl"></i>
                    </a>
                    <a href="https://www.linkedin.com/company/hungarian-ai-olympiad-haio/" target="_blank" rel="noopener noreferrer" on:click={() => menuOpen = false} class="text-dark-blue hover:text-warm-blue" aria-label="LinkedIn">
                        <i class="fab fa-linkedin text-2xl"></i>
                    </a>
                </div>
            </div>
        </div>
    {/if}
    </div>
</nav>


<style>
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }


    .animate-fadeIn {
        animation: fadeIn 0.2s ease-out;
    }
</style>
