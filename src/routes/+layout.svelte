<script>
import { page } from '$app/stores';
import { base } from '$app/paths';
import Header from '$lib/components/Header.svelte';
import Footer from '$lib/components/Footer.svelte';
import CookieConsent from '$lib/components/CookieConsent.svelte';
import { afterNavigate } from '$app/navigation';
import '../app.css';

$: isHomePage = $page.url.pathname === `${base}/` || $page.url.pathname === base;
$: isContactPage = $page.url.pathname === `${base}/contact`;
$: isAdatkezelesiPage = $page.url.pathname === `${base}/adatkezelesi`;
$: isGyikPage = $page.url.pathname === `${base}/gyik`;
$: is2024Page = $page.url.pathname === `${base}/2024`;
$: is2025Page = $page.url.pathname === `${base}/2025`;
$: isMoloPage = $page.url.pathname === `${base}/molo`;
$: isHaioPage = $page.url.pathname === `${base}/haio`;
$: isHallOfFamePage = $page.url.pathname === `${base}/hall-of-fame`;
// alwaysScrolled should be true for all pages EXCEPT the home page
$: alwaysScrolled = !isHomePage;

afterNavigate(() => {
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

<div class="min-h-screen bg-desert-50">
	<Header alwaysScrolled={alwaysScrolled} />

	<main class="bg-desert-50">
		<slot />
	</main>

	<Footer />
	
	<!-- Cookie Consent - Shows on all pages -->
	<CookieConsent />
</div>
