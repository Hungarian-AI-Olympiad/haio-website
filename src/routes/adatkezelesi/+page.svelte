<script lang="ts">
    import { onMount } from 'svelte';
    import { base } from '$app/paths';
    import NeuralNetwork from '$lib/components/NeuralNetwork.svelte';
    
    // Lazy loading state
    let headerVisible = false;
    let introVisible = false;
    let purposeVisible = false;
    let controllersVisible = false;
    let ctaVisible = false;
    
    onMount(() => {
        // Intersection Observer for lazy loading
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target as HTMLElement;
                    const dataAnimate = element.getAttribute('data-animate');
                    
                    if (dataAnimate === 'header') {
                        headerVisible = true;
                    } else if (dataAnimate === 'intro') {
                        introVisible = true;
                    } else if (dataAnimate === 'purpose') {
                        purposeVisible = true;
                    } else if (dataAnimate === 'controllers') {
                        controllersVisible = true;
                    } else if (dataAnimate === 'cta') {
                        ctaVisible = true;
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements
        document.querySelectorAll('[data-animate]').forEach(el => {
            observer.observe(el);
        });

        return () => {
            observer.disconnect();
        };
    });
</script>

<svelte:head>
    <title>Adatkezelési tájékoztató | HAIO</title>
    <meta name="description" content="Adatkezelési és adatvédelmi tájékoztató a Hungarian AI Olympiad (HAIO) projekthez kapcsolódóan." />
</svelte:head>

<section class="min-h-screen bg-desert-100 relative overflow-hidden pt-24 pb-12">
    <div class="absolute inset-0 opacity-5">
        <NeuralNetwork nodeCount={30} position="full" />
    </div>

    <div class="container mx-auto px-6 relative z-10 max-w-5xl">
        <div 
            class="text-center mb-12 transition-all duration-700"
            class:opacity-0={!headerVisible}
            class:translate-y-8={!headerVisible}
            class:opacity-100={headerVisible}
            class:translate-y-0={headerVisible}
            data-animate="header"
        >
            <div class="inline-block mb-4">
                <span class="px-4 py-2 bg-gradient-to-r from-dark-blue to-warm-blue text-white text-sm font-semibold rounded-full shadow-lg">
                    Adatvédelem
                </span>
            </div>
            <h1 class="text-4xl md:text-5xl font-bold text-dark-blue mb-3">
                Adatkezelési Tájékoztató
            </h1>
            <p class="text-desert-700 text-base md:text-lg max-w-2xl mx-auto">
                Információk személyes adatok kezeléséről a projektben való részvétellel kapcsolatban
            </p>
        </div>

        <div class="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
            <div 
                class="prose prose-lg max-w-none transition-all duration-700"
                class:opacity-0={!introVisible}
                class:translate-y-8={!introVisible}
                class:opacity-100={introVisible}
                class:translate-y-0={introVisible}
                data-animate="intro"
                style="transition-delay: 100ms;"
            >
                <p class="text-desert-700 leading-relaxed">
                    Az információs önrendelkezésről és az információszabadságról szóló <strong class="text-dark-blue">2011. évi CXII. törvény (Infotv.) 16. §</strong>, valamint az Európai Parlament és a Tanács <strong class="text-dark-blue">(EU) 2016/679 rendelete</strong> (a továbbiakban GDPR) 12. cikk (1) bekezdése értelmében a <strong class="text-dark-blue">Neumann János Számítógép-tudományi Társaság</strong> tájékoztatja az érintettet a projektben elektronikusan benyújtott adataival kapcsolatos adatkezelésről.
                </p>
            </div>

            <div 
                class="bg-gradient-to-br from-warm-blue/5 to-dark-blue/5 rounded-xl p-6 border border-warm-blue/20 transition-all duration-700"
                class:opacity-0={!purposeVisible}
                class:translate-y-8={!purposeVisible}
                class:opacity-100={purposeVisible}
                class:translate-y-0={purposeVisible}
                data-animate="purpose"
                style="transition-delay: 200ms;"
            >
                <h2 class="text-2xl font-bold text-dark-blue mb-4">A Projekt Célja</h2>
                <p class="text-desert-700 leading-relaxed">
                    A nemzetközi mesterséges intelligencia diákolimpiára utazó, középiskolás diákokból álló magyar csapat felkészítése és kiválasztása.
                </p>
            </div>

            <div 
                class="border-t border-desert-200 pt-8 transition-all duration-700"
                class:opacity-0={!controllersVisible}
                class:translate-y-8={!controllersVisible}
                class:opacity-100={controllersVisible}
                class:translate-y-0={controllersVisible}
                data-animate="controllers"
                style="transition-delay: 300ms;"
            >
                <h2 class="text-2xl font-bold text-dark-blue mb-6">Adatkezelő</h2>
                <div class="grid md:grid-cols-2 gap-6">
                    <div class="bg-desert-50 rounded-xl p-6 border border-desert-200">
                        <h3 class="text-lg font-bold text-dark-blue mb-3">NJSZT</h3>
                        <div class="space-y-2 text-sm text-desert-700">
                            <p><strong>Székhely:</strong> 1054 Budapest, Báthori u. 16.</p>
                        </div>
                    </div>
                    <div class="bg-desert-50 rounded-xl p-6 border border-desert-200">
                        <h3 class="text-lg font-bold text-dark-blue mb-3">ELTE IK</h3>
                        <div class="space-y-2 text-sm text-desert-700">
                            <p><strong>Székhely:</strong> 1117 Budapest, Pázmány Péter sétány 1/C</p>
                        </div>
                    </div>
                </div>
            </div>

            <div 
                class="border-t border-desert-200 pt-8 transition-all duration-700"
                class:opacity-0={!ctaVisible}
                class:translate-y-8={!ctaVisible}
                class:opacity-100={ctaVisible}
                class:translate-y-0={ctaVisible}
                data-animate="cta"
                style="transition-delay: 400ms;"
            >
                <div class="bg-warm-blue/10 rounded-xl p-6 border border-warm-blue/30">
                    <h3 class="text-lg font-bold text-dark-blue mb-3">Kérdése van?</h3>
                                    <p class="text-desert-700 text-sm leading-relaxed mb-3">
                    Ha kérdése van az adatkezeléssel kapcsolatban, vegye fel velünk a kapcsolatot.
                </p>
                <a href="{base}/contact" class="inline-flex items-center text-warm-blue hover:text-dark-blue font-semibold transition-colors">
                    Kapcsolat →
                </a>
                </div>
            </div>
        </div>
    </div>
</section>
