<script>
import { page } from '$app/stores';
import { base } from '$app/paths';
import Header from '$lib/components/Header.svelte';
import Footer from '$lib/components/Footer.svelte';
import CookieConsent from '$lib/components/CookieConsent.svelte';
import { afterNavigate } from '$app/navigation';
import '../app.css';
import { PUBLIC_GOOGLE_ANALYTICS_ID } from '$env/static/public';

$: isHomePage = $page.url.pathname === `${base}/` || $page.url.pathname === base;
$: isContactPage = $page.url.pathname === `${base}/contact`;
$: isAdatkezelesiPage = $page.url.pathname === `${base}/adatkezelesi`;
$: isGyikPage = $page.url.pathname === `${base}/gyik`;
$: is2024Page = $page.url.pathname === `${base}/2024`;
$: is2025Page = $page.url.pathname === `${base}/2025`;
$: isMoloPage = $page.url.pathname === `${base}/molo`;
$: isHaioPage = $page.url.pathname === `${base}/haio`;
$: isHallOfFamePage = $page.url.pathname === `${base}/hall-of-fame`;
$: alwaysScrolled = !isHomePage;

afterNavigate(() => {
    // Send page_view to Google Analytics on SPA navigation (if gtag is available)
    try {
        if (PUBLIC_GOOGLE_ANALYTICS_ID && typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('config', PUBLIC_GOOGLE_ANALYTICS_ID, {
                page_path: window.location.pathname + window.location.search + window.location.hash
            });
        }
    } catch (e) {
        console.warn('gtag send failed', e);
    }

    // Hash scrolling behavior
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
        setTimeout(() => {
            const el = document.getElementById(hash.slice(1));
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 50);
    }
});
</script>

<!-- REMOVED THE SVELTE:HEAD SECTION ENTIRELY -->

<div class="min-h-screen bg-desert-50">
    <Header alwaysScrolled={alwaysScrolled} />

    <main class="bg-desert-50">
        <slot />
    </main>

    <Footer />
    
    <!-- Cookie Consent handles loading GA AFTER user consent -->
    <CookieConsent />
</div>
