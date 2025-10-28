<script lang="ts">
	import { base } from '$app/paths';
	
	const sponsors = [
		{ name: 'Bosch', logo: `${base}/img/sponsors/BOSCH.png`, url: 'https://www.bosch.hu/' },
		{ name: 'Ericsson', logo: `${base}/img/sponsors/ERICSSON.png`, url: 'https://www.ericsson.com/hu' },
		{ name: 'Hungarikum Alkusz', logo: `${base}/img/sponsors/HUNGARIKUMALKUSZ.png`, url: 'https://hungarikumalkusz.hu/' },
		{ name: 'Andersen', logo: `${base}/img/sponsors/ANDERSEN.png`, url: 'https://www.andersen.com/' },
		{ name: 'MSCI', logo: `${base}/img/sponsors/MSCI.png`, url: 'https://www.msci.com/' },
		{ name: 'NTP', logo: `${base}/img/sponsors/NTP.png`, url: 'https://emet.gov.hu/kategoria/kiemelt-kategoriak/palyazatok/aktualis-felhivasok/nemzeti-tehetseg-program/' },
		{ name: 'HPC', logo: `${base}/img/sponsors/HPC.png`, url: 'https://kifu.gov.hu/hpc-edih/'},
		{ name: 'ELTE', logo: `${base}/img/sponsors/ELTE.png`, url: 'https://www.elte.hu/' },
		{ name: 'NJSZT', logo: `${base}/img/sponsors/NJSZT.png`, url: 'https://njszt.hu/' }
	];
</script>

<footer class="bg-dark-blue text-desert-200 pt-8 pb-2 border-t border-desert-700">
    <div class="container mx-auto px-6">
        <!-- Main Content: 4 columns on desktop, stack on mobile -->
        <div class="grid md:grid-cols-4 gap-6 mb-6">
        <!-- Logo and Description -->
        <div class="md:col-span-1">
            <div class="flex items-center space-x-2 mb-3">
                <div class="bg-white rounded-md p-1.5">
                    <img src={`${base}/img/footer/haio_footer.png`} alt="HAIO Logo" class="h-8 w-8 object-contain" />
                </div>
                <span class="text-lg font-bold text-off-white">HAIO</span>
            </div>
            <p class="text-off-white text-xs leading-relaxed">
                Hungarian AI Olympiad - A magyar mesterséges intelligencia olimpiák hivatalos oldala.
            </p>
        </div>            <!-- Quick Links -->
            <div class="md:col-span-1">
                <h3 class="text-off-white font-semibold mb-3 text-sm">Gyors Linkek</h3>
                <ul class="space-y-1.5">
                    <li><a href="{base}/" class="text-desert-300 hover:text-off-white transition-colors duration-200 text-xs">Főoldal</a></li>
                    <li><a href="{base}/molo" class="text-desert-300 hover:text-off-white transition-colors duration-200 text-xs">MÓLÓ</a></li>
                    <li><a href="{base}/haio" class="text-desert-300 hover:text-off-white transition-colors duration-200 text-xs">HAIO</a></li>
                    <li><a href="{base}/gyik" class="text-desert-300 hover:text-off-white transition-colors duration-200 text-xs">GY.I.K.</a></li>
                    <li><a href="{base}/adatkezelesi" class="text-desert-300 hover:text-off-white transition-colors duration-200 text-xs">Adatkezelési tájékoztató</a></li>
                </ul>
            </div>

            <!-- Social Media -->
            <div class="md:col-span-1">
                <h3 class="text-off-white font-semibold mb-3 text-sm">Közösség</h3>
                <div class="flex space-x-3">
                    <a 
                        href="https://www.linkedin.com/company/hungarian-ai-olympiad-haio/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="w-9 h-9 bg-desert-700 rounded-lg flex items-center justify-center text-desert-200 hover:bg-warm-blue hover:text-off-white transition-all duration-300 transform hover:scale-110"
                        aria-label="LinkedIn"
                    >
                        <i class="fab fa-linkedin text-base"></i>
                    </a>
                    <a 
                        href="https://discord.gg/KKTzNebjGW" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="w-9 h-9 bg-desert-700 rounded-lg flex items-center justify-center text-desert-200 hover:bg-warm-blue hover:text-off-white transition-all duration-300 transform hover:scale-110"
                        aria-label="Discord"
                    >
                        <i class="fab fa-discord text-base"></i>
                    </a>
                </div>
            </div>

            <!-- Sponsors Section - Now in the same row -->
            <div class="md:col-span-1">
                <h3 class="text-off-white font-semibold mb-3 text-sm">Támogatóink</h3>
                <div class="grid grid-cols-3 gap-2">
                    {#each sponsors as sponsor}
                        <a 
                            href={sponsor.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            class="group w-full h-10 flex items-center justify-center p-1.5 bg-off-white rounded hover:bg-desert-100 transition-all duration-300"
                            title={sponsor.name}
                        >
                            <img 
                                src={sponsor.logo} 
                                alt={sponsor.name} 
                                class="max-w-full max-h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                            />
                        </a>
                    {/each}
                </div>
            </div>
        </div>

        <div class="border-t border-desert-700 pt-3 pb-2 flex items-center justify-center">
            <p class="text-desert-300 text-sm">
                &copy; {new Date().getFullYear()} <span class="hidden sm:inline">Hungarian AI Olympiad</span><span class="sm:hidden">HAIO</span>. Minden jog fenntartva.
            </p>
        </div>
    </div>
</footer>
