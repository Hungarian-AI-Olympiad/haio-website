<script lang="ts">
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    // Cookie consent state
    let showCookieBanner = false;
    let showCookieSettings = false;
    let cookiePreferences = {
        necessary: true, // Always true
        analytics: false,
        marketing: false
    };

    onMount(() => {
        if (browser) {
            // Check if user has already set cookie preferences
            const cookieConsent = localStorage.getItem('cookieConsent');
            if (!cookieConsent) {
                // Show settings popup directly instead of banner
                showCookieSettings = true;
            } else {
                cookiePreferences = JSON.parse(cookieConsent);
            }
        }
    });

    // Cookie consent functions
    function acceptAllCookies() {
        cookiePreferences = { necessary: true, analytics: true, marketing: true };
        localStorage.setItem('cookieConsent', JSON.stringify(cookiePreferences));
        showCookieBanner = false;
        showCookieSettings = false;
    }
    
    function declineAllCookies() {
        cookiePreferences = { necessary: true, analytics: false, marketing: false };
        localStorage.setItem('cookieConsent', JSON.stringify(cookiePreferences));
        showCookieBanner = false;
        showCookieSettings = false;
    }
    
    function savePreferences() {
        localStorage.setItem('cookieConsent', JSON.stringify(cookiePreferences));
        showCookieSettings = false;
        showCookieBanner = false;
    }
    
    function openCookieSettings() {
        showCookieSettings = true;
    }
</script>

<!-- COOKIE PREFERENCES MODAL -->
{#if showCookieSettings}
<div class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
    <div class="bg-desert-900/95 backdrop-blur-lg rounded-lg sm:rounded-2xl shadow-2xl border border-desert-600/50 w-full max-w-lg sm:max-w-2xl max-h-[85vh] overflow-y-auto">
        <div class="p-3 sm:p-6 md:p-8">
            <div class="flex items-center justify-between mb-3 sm:mb-6">
                <h3 class="text-base sm:text-2xl font-bold text-off-white">Cookie preferenciák</h3>
            </div>
            
            <p class="text-desert-200 text-xs sm:text-base mb-3 sm:mb-4 leading-relaxed">
                A sütik segítenek nekünk a webhely működésének biztosításában, tartalmak és hirdetések személyre szabásában, valamint forgalmi adataink elemzésében.
            </p>

            <!-- Quick action buttons -->
            <div class="flex gap-2 mb-4 sm:mb-6">
                <button
                    on:click={acceptAllCookies}
                    class="flex-1 px-4 py-2.5 bg-warm-blue text-white text-sm sm:text-base font-medium rounded-lg hover:bg-warm-blue/80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-warm-blue focus:ring-offset-2 focus:ring-offset-desert-900"
                >
                    Összes elfogadása
                </button>
                <button
                    on:click={declineAllCookies}
                    class="flex-1 px-4 py-2.5 bg-desert-700 text-desert-100 text-sm sm:text-base font-medium rounded-lg hover:bg-desert-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-desert-600 focus:ring-offset-2 focus:ring-offset-desert-900"
                >
                    Összes elutasítása
                </button>
            </div>
            
            <p class="text-desert-300 text-xs sm:text-sm mb-3 sm:mb-4 italic">
                Vagy állítsa be egyénileg:
            </p>
            
            <div class="space-y-2 sm:space-y-4">
                <!-- Necessary Cookies -->
                <div class="bg-desert-800/50 rounded-lg p-2 sm:p-4 border border-desert-700">
                    <div class="flex items-center justify-between mb-1 sm:mb-2">
                        <h4 class="text-off-white font-semibold text-xs sm:text-base">Szükséges sütik</h4>
                        <div class="bg-desert-600 text-desert-300 text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                            Mindig aktív
                        </div>
                    </div>
                    <p class="text-desert-300 text-[10px] sm:text-sm">
                        Ezek a sütik elengedhetetlenek a webhely megfelelő működéséhez és nem kapcsolhatók ki.
                    </p>
                </div>
                
                <!-- Analytics Cookies -->
                <div class="bg-desert-800/50 rounded-lg p-2 sm:p-4 border border-desert-700">
                    <div class="flex items-center justify-between mb-1 sm:mb-2">
                        <h4 class="text-off-white font-semibold text-xs sm:text-base">Analitikai sütik</h4>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                bind:checked={cookiePreferences.analytics}
                                class="sr-only peer"
                            />
                            <div class="w-9 h-5 sm:w-11 sm:h-6 bg-desert-700 peer-focus:ring-2 peer-focus:ring-warm-blue rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-warm-blue"></div>
                        </label>
                    </div>
                    <p class="text-desert-300 text-[10px] sm:text-sm">
                        Ezek a sütik lehetővé teszik számunkra a látogatások és forgalmi források mérését.
                    </p>
                </div>
                
                <!-- Marketing Cookies -->
                <div class="bg-desert-800/50 rounded-lg p-2 sm:p-4 border border-desert-700">
                    <div class="flex items-center justify-between mb-1 sm:mb-2">
                        <h4 class="text-off-white font-semibold text-xs sm:text-base">Marketing sütik</h4>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                            bind:checked={cookiePreferences.marketing}
                            class="sr-only peer"
                        />
                        <div class="w-9 h-5 sm:w-11 sm:h-6 bg-desert-700 peer-focus:ring-2 peer-focus:ring-warm-blue rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-warm-blue"></div>
                    </label>
                </div>
                <p class="text-desert-300 text-[10px] sm:text-sm">
                    Ezek a sütik releváns hirdetések megjelenítésére használhatók.
                </p>
            </div>
        </div>
        
        <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-3 sm:mt-6">
            <button
                on:click={savePreferences}
                class="flex-1 px-3 py-2 sm:px-6 sm:py-3 bg-warm-blue text-white text-xs sm:text-base font-semibold rounded-lg hover:bg-warm-blue/80 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-warm-blue/50"
            >
                Beállítások mentése
            </button>
            <button
                on:click={() => showCookieSettings = false}
                class="flex-1 px-3 py-2 sm:px-6 sm:py-3 bg-desert-700 text-desert-100 text-xs sm:text-base font-semibold rounded-lg hover:bg-desert-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-desert-500/50"
            >
                Mégse
            </button>
        </div>
    </div>
</div>
</div>
{/if}<!-- COOKIE PREFERENCES BUTTON (Persistent after consent) -->
{#if !showCookieBanner && !showCookieSettings}
<button
    on:click={openCookieSettings}
    class="fixed bottom-6 left-6 z-40 bg-desert-800/90 hover:backdrop-blur-lg text-desert-200 p-3 rounded-lg shadow-lg border border-desert-600/50 hover:bg-desert-700/90 hover:text-off-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-warm-blue/50"
    title="Cookie Beállítások"
>
    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"/>
        <circle cx="7" cy="10" r="1.5"/>
        <circle cx="12" cy="6" r="1.5"/>
        <circle cx="16" cy="12" r="1.5"/>
        <circle cx="9" cy="15" r="1.5"/>
    </svg>
</button>
{/if}

<style>
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-fadeInUp {
        animation: fadeInUp 0.8s ease-out forwards;
        opacity: 0;
    }
</style>
