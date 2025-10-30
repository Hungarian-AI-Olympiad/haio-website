<script lang="ts">
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import { base } from '$app/paths';
    import { PUBLIC_GOOGLE_ANALYTICS_ID } from '$env/static/public';

    const GOOGLE_ANALYTICS_ID = PUBLIC_GOOGLE_ANALYTICS_ID;

    let showCookieSettings = false;
    let cookiePreferences = {
        necessary: true,
        analytics: false
    };

    onMount(() => {
        if (browser) {
            const cookieConsent = localStorage.getItem('cookieConsent');
            if (!cookieConsent) {
                showCookieSettings = true;
            } else {
                cookiePreferences = JSON.parse(cookieConsent);
                loadScriptsBasedOnConsent();
            }
        }
    });

    function acceptAllCookies() {
        cookiePreferences = { necessary: true, analytics: true };
        saveAndLoadScripts();
    }
    
    function declineAllCookies() {
        cookiePreferences = { necessary: true, analytics: false };
        saveAndLoadScripts();
    }
    
    function savePreferences() {
        saveAndLoadScripts();
    }

    function saveAndLoadScripts() {
        localStorage.setItem('cookieConsent', JSON.stringify(cookiePreferences));
        showCookieSettings = false;
        loadScriptsBasedOnConsent();
    }

    function loadScriptsBasedOnConsent() {
        if (!browser) return;

        if (cookiePreferences.analytics && !window.gaLoaded) {
            loadGoogleAnalytics();
            window.gaLoaded = true;
        }
    }

    function loadGoogleAnalytics() {
        const script1 = document.createElement('script');
        script1.async = true;
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`;
        document.head.appendChild(script1);

        window.dataLayer = window.dataLayer || [];
        function gtag(...args) {
            window.dataLayer.push(args);
        }
        window.gtag = gtag;
        
        gtag('js', new Date());
        gtag('config', GOOGLE_ANALYTICS_ID, {
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure'
        });

        gtag('consent', 'update', {
            'analytics_storage': 'granted'
        });
    }

    function openCookieSettings() {
        showCookieSettings = true;
    }
</script>

<svelte:head>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        
        gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'wait_for_update': 500
        });
    </script>
</svelte:head>

{#if showCookieSettings}
<div class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
    <div class="bg-desert-900/95 backdrop-blur-lg rounded-lg sm:rounded-2xl shadow-2xl border border-desert-600/50 w-full max-w-lg sm:max-w-2xl max-h-[85vh] overflow-y-auto">
        <div class="p-3 sm:p-6 md:p-8">
            <h3 class="text-base sm:text-2xl font-bold text-off-white mb-3 sm:mb-4">Sütibeállítások</h3>
            
            <p class="text-desert-200 text-xs sm:text-sm mb-3 sm:mb-4">
                Weboldalunk sütiket használ a megfelelő működéshez és a látogatottsági statisztikák méréséhez. További információ: <a href="{base}/adatkezelesi" class="text-warm-blue hover:underline font-medium">Adatvédelmi Tájékoztató</a>.
            </p>

            <div class="flex gap-2 mb-3 sm:mb-4">
                <button
                    on:click={acceptAllCookies}
                    class="flex-1 px-3 py-2 bg-warm-blue text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-warm-blue/80 transition-all duration-300 shadow-md"
                >
                    Összes elfogadása
                </button>
                <button
                    on:click={declineAllCookies}
                    class="flex-1 px-3 py-2 bg-desert-700 text-desert-100 text-xs sm:text-sm font-medium rounded-lg hover:bg-desert-600 transition-all duration-300"
                >
                    Összes elutasítása
                </button>
            </div>
            
            <p class="text-desert-300 text-[10px] sm:text-xs mb-2 sm:mb-3 italic">
                Vagy válasszon egyénileg:
            </p>
            
            <div class="space-y-2 sm:space-y-3">
                <div class="bg-desert-800/50 rounded-lg p-2 sm:p-3 border border-desert-700">
                    <div class="flex items-center justify-between mb-1 sm:mb-1.5">
                        <h4 class="text-off-white font-semibold text-xs sm:text-sm">Alapvető sütik</h4>
                        <div class="bg-desert-600 text-desert-300 text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full font-medium">
                            Kötelező
                        </div>
                    </div>
                    <p class="text-desert-300 text-[10px] sm:text-xs">
                        Elengedhetetlenek a weboldal működéséhez. Nem tárolnak személyes adatokat.
                    </p>
                </div>
                
                <div class="bg-desert-800/50 rounded-lg p-2 sm:p-3 border border-desert-700">
                    <div class="flex items-center justify-between mb-1 sm:mb-1.5">
                        <h4 class="text-off-white font-semibold text-xs sm:text-sm">Analitikai sütik (Google Analytics)</h4>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                bind:checked={cookiePreferences.analytics}
                                class="sr-only peer"
                            />
                            <div class="w-9 h-5 sm:w-10 sm:h-5 bg-desert-700 peer-focus:ring-2 peer-focus:ring-warm-blue rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 sm:after:h-4 sm:after:w-4 after:transition-all peer-checked:bg-warm-blue"></div>
                        </label>
                    </div>
                    <p class="text-desert-300 text-[10px] sm:text-xs">
                        Névtelen statisztikák gyűjtése a felhasználói élmény javítása érdekében.
                    </p>
                </div>
            </div>
            
            <div class="mt-3 sm:mt-4">
                <button
                    on:click={savePreferences}
                    class="w-full px-3 py-2 sm:py-2.5 bg-warm-blue text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-warm-blue/80 transition-all duration-300 shadow-md"
                >
                    Beállítások mentése
                </button>
            </div>
        </div>
    </div>
</div>
{/if}

{#if !showCookieSettings}
<button
    on:click={openCookieSettings}
    class="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 bg-desert-800/90 backdrop-blur-lg text-desert-200 p-3 rounded-lg shadow-lg border border-desert-600/50 hover:bg-desert-700/90 hover:text-off-white transition-all duration-300 group"
    title="Sütibeállítások"
    aria-label="Cookie beállítások megnyitása"
>
    <svg class="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:rotate-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"/>
        <circle cx="7" cy="10" r="1.5"/>
        <circle cx="12" cy="6" r="1.5"/>
        <circle cx="16" cy="12" r="1.5"/>
        <circle cx="9" cy="15" r="1.5"/>
    </svg>
</button>
{/if}
