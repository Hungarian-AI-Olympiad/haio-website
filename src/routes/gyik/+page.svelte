<script lang="ts">
    import { onMount } from 'svelte';
    import { base } from '$app/paths';
    import NeuralNetwork from '$lib/components/NeuralNetwork.svelte';
    
    // Lazy loading state
    let headerVisible = false;
    let faqItemsVisible: boolean[] = [];
    let ctaVisible = false;
    
    // FAQ items with lorem ipsum
    let faqItems = [
        {
            id: 1,
            question: 'A felkészítő tanfolyamok ingyenesen elérhetők?',
            answer: 'Igen. Minden tanfolyamunk díjmentes, és a részleteket megtalálod a weboldalunkon.',
            open: false
        },
        {
            id: 2,
            question: 'A tananyagok eléréséhez szükség van regisztrációra?',
            answer: 'A MÓLÓ online alkalmainak Teams-linkjeit a Discord-szerverünkön tesszük közzé, később pedig YouTube-csatornánkon is visszanézhetők. Erősen ajánljuk a Discordhoz való csatlakozást, mivel ez a fő kommunikációs felületünk.',
            open: false
        },
        {
            id: 3,
            question: 'A HAIO-ra külön kell regisztrálni?',
            answer: 'Igen. A HAIO programra (és azon belül a válogatóra) külön regisztrációs űrlap szükséges. Ez azért fontos, mert így kaphatsz egy új Discord-rangot, amellyel célzottan tudunk tájékoztatni a további lépésekről.',
            open: false
        },
        {
            id: 4,
            question: 'Hányadikosoknak szólnak az IAIO és az IOAI versenyek?',
            answer: 'Mindkét verseny a 9–12. évfolyamos diákokat célozza. Ha a verseny évében még középiskolás vagy, részt vehetsz a megmérettetésen.',
            open: false
        },
        {
            id: 5,
            question: 'Mindkét csapatba be lehet kerülni az országos forduló után?',
            answer: 'Igen, amennyiben a válogatót követő évben is középiskolás vagy. Ez azt jelenti, hogy a 12. évfolyamot befejezők az adott tanévben már csak az IOAI versenyen vehetnek részt, az IAIO-n viszont nem.',
            open: false
        },
        {
            id: 6,
            question: 'Az online fordulón lehet pontot szerezni, vagy csak szűrő funkciója van?',
            answer: 'Az online forduló pontjai nem vihetők tovább az országos fordulóra, viszont ez a szakasz szűrőként működik, tehát innen ki lehet esni a versenysorozatból.',
            open: false
        },
        {
            id: 7,
            question: 'Az országos válogató személyesen lesz megtartva?',
            answer: 'Igen, az országos válogatót általában az ELTE Informatikai Karán rendezzük meg, Budapesten.',
            open: false
        },
        {
            id: 8,
            question: 'Ha nem szeretnék versenyezni, csak tanulni, mit tehetek?',
            answer: 'Ebben az esetben a MÓLÓ projektet ajánljuk. Itt teljesen szabadon részt vehetsz az online órákon, vagy tanulhatsz az elérhető tananyagokból bármilyen kötelezettség nélkül.',
            open: false
        },
        {
            id: 9,
            question: 'Hol kerülnek megrendezésre a táborok?',
            answer: 'A táborokat általában az ELTE Informatikai Karán rendezzük meg, Budapesten.',
            open: false
        },
        {
            id: 10,
            question: 'A versenyekre lehet jelentkezni külföldről is?',
            answer: 'Igen, amennyiben magyar állampolgár vagy és magyar iskolában tanulsz, nincs akadálya sem az országos, sem a nemzetközi versenyen való részvételnek.',
            open: false
        }
    ];
    
    // Initialize visibility array
    faqItemsVisible = new Array(faqItems.length).fill(false);
    
    function toggleFaq(id: number) {
        faqItems = faqItems.map(item => 
            item.id === id ? { ...item, open: !item.open } : item
        );
    }
    
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
                    } else if (dataAnimate?.startsWith('faq-item-')) {
                        const index = parseInt(dataAnimate.split('-')[2]);
                        faqItemsVisible[index] = true;
                        faqItemsVisible = [...faqItemsVisible];
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
    <title>GY.I.K. | HAIO</title>
    <meta name="description" content="Gyakran Ismételt Kérdések a Hungarian AI Olympiad (HAIO) programról és a mesterséges intelligencia diákolimpiáról." />
</svelte:head>

<section class="min-h-screen bg-desert-100 relative overflow-hidden pt-24 pb-12">
    <div class="absolute inset-0 opacity-5">
        <NeuralNetwork nodeCount={30} position="full" />
    </div>

    <div class="container mx-auto px-6 relative z-10 max-w-4xl">
        <!-- Header -->
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
                    Segítségnyújtás
                </span>
            </div>
            <h1 class="text-4xl md:text-5xl font-bold text-dark-blue mb-3">
                Gyakran Ismételt Kérdések
            </h1>
            <p class="text-desert-700 text-base md:text-lg max-w-2xl mx-auto">
                Találd meg a válaszokat a leggyakrabban felmerülő kérdésekre
            </p>
        </div>

        <!-- FAQ Items -->
        <div class="space-y-4">
            {#each faqItems as item, index (item.id)}
                <div 
                    class="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-700 overflow-hidden border border-desert-200"
                    class:opacity-0={!faqItemsVisible[index]}
                    class:translate-y-8={!faqItemsVisible[index]}
                    class:opacity-100={faqItemsVisible[index]}
                    class:translate-y-0={faqItemsVisible[index]}
                    data-animate="faq-item-{index}"
                    style="transition-delay: {index * 100}ms;"
                >
                    <button
                        on:click={() => toggleFaq(item.id)}
                        class="w-full px-6 py-5 flex items-center justify-between text-left group"
                    >
                        <div class="flex items-start gap-4 flex-1">
                            <div class="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-dark-blue to-warm-blue flex items-center justify-center text-white font-bold text-sm shadow-md">
                                {item.id}
                            </div>
                            <h3 class="text-lg font-semibold text-dark-blue group-hover:text-warm-blue transition-colors duration-300 flex-1">
                                {item.question}
                            </h3>
                        </div>
                        <div class="flex-shrink-0 ml-4">
                            <svg 
                                class="w-6 h-6 text-dark-blue group-hover:text-warm-blue transition-all duration-500"
                                class:rotate-180={item.open}
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </button>
                    
                    <div 
                        class="faq-answer"
                        class:open={item.open}
                    >
                        <div class="px-6 pb-5">
                            <div class="pl-12 pr-10 pt-2 border-t border-desert-100">
                                <p class="text-desert-700 leading-relaxed">
                                    {item.answer}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>

        <!-- Contact CTA -->
        <div 
            class="mt-12 bg-gradient-to-br from-dark-blue to-warm-blue rounded-2xl p-8 text-center shadow-xl transition-all duration-700"
            class:opacity-0={!ctaVisible}
            class:translate-y-8={!ctaVisible}
            class:opacity-100={ctaVisible}
            class:translate-y-0={ctaVisible}
            data-animate="cta"
        >
            <div class="mb-4">
                <svg class="w-16 h-16 mx-auto text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h2 class="text-2xl font-bold text-white mb-3">
                Nem találtad a választ?
            </h2>
            <p class="text-white/90 mb-6 max-w-md mx-auto">
                Ha további kérdésed van, lépj kapcsolatba velünk, és szívesen segítünk!
            </p>
            <a 
                href="{base}/contact" 
                class="inline-flex items-center gap-2 px-6 py-3 bg-white text-dark-blue rounded-full font-semibold transition-all duration-300 hover:bg-desert-100 hover:shadow-2xl hover:scale-105"
            >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Kapcsolatfelvétel</span>
            </a>
        </div>
    </div>
</section>

<style>
    .faq-answer {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.5s ease-in-out, opacity 0.5s ease-in-out;
        opacity: 0;
    }
    
    .faq-answer.open {
        max-height: 500px;
        opacity: 1;
    }
    
    svg {
        transition: transform 0.5s ease-in-out;
    }
</style>
