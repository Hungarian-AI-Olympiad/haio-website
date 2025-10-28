<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { PUBLIC_WEB3FORMS_ACCESS_KEY } from '$env/static/public';
	import NeuralNetwork from '$lib/components/NeuralNetwork.svelte';

	let formData = {
		name: '',
		email: '',
		subject: '',
		message: ''
	};

	// Honeypot field for bot detection (should remain empty)
	let honeypot = '';

	let isSubmitting = false;
	let submitStatus: 'idle' | 'success' | 'error' = 'idle';
	let errorMessage = '';
	let captchaToken = '';
	let captchaContainer: HTMLElement;
	let captchaWidgetId: string | null = null;

	// Lazy loading state
	let headerVisible = false;
	let card1Visible = false;
	let card2Visible = false;
	let card3Visible = false;
	let formVisible = false;

	// Render hCaptcha when component mounts
	onMount(() => {
		// Pre-fill form from URL parameters
		if (browser) {
			const urlParams = new URLSearchParams(window.location.search);
			const subject = urlParams.get('subject');
			const message = urlParams.get('message');
			
			if (subject) {
				formData.subject = decodeURIComponent(subject);
			}
			if (message) {
				formData.message = decodeURIComponent(message);
			}
		}

		if (browser && captchaContainer) {
			// Wait for hCaptcha script to load
			const checkHCaptcha = setInterval(() => {
				if (typeof (window as any).hcaptcha !== 'undefined') {
					clearInterval(checkHCaptcha);
					
					// Render the captcha widget
					try {
						captchaWidgetId = (window as any).hcaptcha.render(captchaContainer, {
							sitekey: '50b2fe65-b00b-4b9e-ad62-3ba471098be2',
							callback: (token: string) => {
								captchaToken = token;
							},
							theme: 'light'
						});
					} catch (error) {
						// hCaptcha render failed - user will see error when submitting
					}
				}
			}, 100);

			// Cleanup after 10 seconds if script doesn't load
			setTimeout(() => clearInterval(checkHCaptcha), 10000);
		}

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
					} else if (dataAnimate === 'card-1') {
						card1Visible = true;
					} else if (dataAnimate === 'card-2') {
						card2Visible = true;
					} else if (dataAnimate === 'card-3') {
						card3Visible = true;
					} else if (dataAnimate === 'form') {
						formVisible = true;
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

	async function handleSubmit(e: Event) {
		e.preventDefault();
		
		// Only run on client-side
		if (!browser) return;

		// Bot detection: honeypot field should be empty
		if (honeypot) {
			// Silent fail for bots
			return;
		}
		
		// Check if captcha is completed
		if (!captchaToken) {
			submitStatus = 'error';
			errorMessage = 'Kérjük, töltse ki a captcha-t a folytatáshoz.';
			return;
		}

		// Validate required fields
		if (!formData.name || !formData.email || !formData.subject || !formData.message) {
			submitStatus = 'error';
			errorMessage = 'Minden mező kitöltése kötelező.';
			return;
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			submitStatus = 'error';
			errorMessage = 'Érvénytelen email formátum.';
			return;
		}
		
		isSubmitting = true;
		submitStatus = 'idle';
		errorMessage = '';

		try {
			// Submit directly to Web3Forms API
			const response = await fetch('https://api.web3forms.com/submit', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify({
					access_key: PUBLIC_WEB3FORMS_ACCESS_KEY,
					name: formData.name,
					email: formData.email,
					subject: formData.subject,
					message: formData.message,
					from_name: 'HAIO Kapcsolat Űrlap',
					replyto: formData.email,
					'h-captcha-response': captchaToken,
					botcheck: honeypot // Web3Forms honeypot field
				})
			});

			const result = await response.json();

			if (response.ok && result.success) {
				submitStatus = 'success';
				formData = { name: '', email: '', subject: '', message: '' };
				captchaToken = '';
				
				// Reset hCaptcha widget
				if (typeof (window as any).hcaptcha !== 'undefined' && captchaWidgetId !== null) {
					(window as any).hcaptcha.reset(captchaWidgetId);
				}

				// Reset success message after 5 seconds
				setTimeout(() => {
					submitStatus = 'idle';
				}, 5000);
			} else {
				submitStatus = 'error';
				errorMessage = result.message || 'Nem sikerült elküldeni az üzenetet';
			}
		} catch (error) {
			submitStatus = 'error';
			errorMessage = 'Hálózati hiba. Kérjük, próbálja újra később.';
		} finally {
			isSubmitting = false;
		}
	}

</script>

<svelte:head>
	<title>Kapcsolat - Hungarian AI Olympiad</title>
	<meta name="description" content="Lépjen kapcsolatba velünk. Válaszolunk minden kérdésére a Hungarian AI Olympiad-dal kapcsolatban." />
	<!-- hCaptcha Script -->
	<script src="https://js.hcaptcha.com/1/api.js" async defer></script>
</svelte:head>

<!-- CONTACT PAGE -->
<section class="min-h-screen bg-desert-100 relative overflow-hidden pt-24 pb-12">
	<!-- Neural Network Background -->
	<div class="absolute inset-0 opacity-5">
		<NeuralNetwork nodeCount={30} position="full" />
	</div>

	<div class="container mx-auto px-6 relative z-10">
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
					Vedd fel velünk a kapcsolatot
				</span>
			</div>
			<h1 class="text-4xl md:text-5xl font-bold text-dark-blue mb-3">
				Kapcsolat
			</h1>
			<p class="text-desert-700 text-base md:text-lg max-w-2xl mx-auto">
				Kérdésed van? Szeretnél többet megtudni programjainkról? Írj nekünk bizalommal!
			</p>
		</div>

		<!-- Contact Form and Info Grid -->
		<div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
			<!-- Contact Information -->
			<div class="space-y-6">
				<div>
					<h2 class="text-2xl font-bold text-dark-blue mb-6">Vedd fel velünk a kapcsolatot</h2>
					
					<!-- Email -->
					<a 
						href="mailto:mi_olimpia@inf.elte.hu" 
						class="group block mb-4 transition-all duration-700"
						class:opacity-0={!card1Visible}
						class:translate-y-8={!card1Visible}
						class:opacity-100={card1Visible}
						class:translate-y-0={card1Visible}
						data-animate="card-1"
						style="transition-delay: 100ms;"
					>
						<div class="flex items-start space-x-5 p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-transparent hover:border-warm-blue/30">
							<div class="w-14 h-14 bg-gradient-to-br from-warm-blue to-dark-blue rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
								<i class="fas fa-envelope text-2xl"></i>
							</div>
							<div class="flex-1">
								<h3 class="text-lg font-bold text-dark-blue mb-2 group-hover:text-warm-blue transition-colors duration-300">Hivatalos Email</h3>
								<p class="text-desert-600 text-sm mb-2 leading-relaxed">
									Keress minket a hivatalos email címünkön bármilyen kérdéssel
								</p>
								<span class="text-warm-blue font-semibold text-sm group-hover:underline">
									mi_olimpia@inf.elte.hu
								</span>
							</div>
						</div>
					</a>

					<!-- Discord -->
					<a 
						href="https://discord.gg/KKTzNebjGW" 
						target="_blank" 
						rel="noopener noreferrer" 
						class="group block mb-4 transition-all duration-700"
						class:opacity-0={!card2Visible}
						class:translate-y-8={!card2Visible}
						class:opacity-100={card2Visible}
						class:translate-y-0={card2Visible}
						data-animate="card-2"
						style="transition-delay: 200ms;"
					>
						<div class="flex items-start space-x-5 p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#5865F2]/30">
							<div class="w-14 h-14 bg-gradient-to-br from-warm-blue to-dark-blue rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 group-hover:bg-[#5865F2] transition-all duration-300">
								<i class="fab fa-discord text-2xl"></i>
							</div>
							<div class="flex-1">
								<h3 class="text-lg font-bold text-dark-blue mb-2 group-hover:text-[#5865F2] transition-colors duration-300">Discord Közösség</h3>
								<p class="text-desert-600 text-sm mb-2 leading-relaxed">
									Csatlakozz közösségünkhöz és találkozz a többi résztvevővel
								</p>
								<span class="text-[#5865F2] font-semibold text-sm group-hover:underline">
									Csatlakozás a szerverhez →
								</span>
							</div>
						</div>
					</a>

					<!-- LinkedIn -->
					<a 
						href="https://www.linkedin.com/company/hungarian-ai-olympiad-haio/" 
						target="_blank" 
						rel="noopener noreferrer" 
						class="group block transition-all duration-700"
						class:opacity-0={!card3Visible}
						class:translate-y-8={!card3Visible}
						class:opacity-100={card3Visible}
						class:translate-y-0={card3Visible}
						data-animate="card-3"
						style="transition-delay: 300ms;"
					>
						<div class="flex items-start space-x-5 p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#0A66C2]/30">
							<div class="w-14 h-14 bg-gradient-to-br from-warm-blue to-dark-blue rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 group-hover:bg-[#0A66C2] transition-all duration-300">
								<i class="fab fa-linkedin text-2xl"></i>
							</div>
							<div class="flex-1">
								<h3 class="text-lg font-bold text-dark-blue mb-2 group-hover:text-[#0A66C2] transition-colors duration-300">LinkedIn Profil</h3>
								<p class="text-desert-600 text-sm mb-2 leading-relaxed">
									Kövess minket LinkedInen, hogy ne maradj le híreinkről és eseményeinkről
								</p>
								<span class="text-[#0A66C2] font-semibold text-sm group-hover:underline">
									Követés a LinkedIn-en →
								</span>
							</div>
						</div>
					</a>
				</div>

				<!-- Additional Info -->
				<div class="p-6 bg-gradient-to-br from-warm-blue/10 to-dark-blue/10 rounded-xl border border-warm-blue/20 shadow-sm">
					<div class="flex items-start space-x-4">
						<div class="w-12 h-12 bg-warm-blue/20 rounded-lg flex items-center justify-center flex-shrink-0">
							<i class="fas fa-clock text-warm-blue text-xl"></i>
						</div>
						<div>
							<h3 class="text-lg font-bold text-dark-blue mb-2">Várható válaszidő</h3>
							<p class="text-desert-700 text-sm leading-relaxed">
								Általában <span class="font-semibold text-dark-blue">24-48 órán belül</span> válaszolunk minden megkeresésre. Ha a kérdés sürgős, kérjük jelezd üzenetedben.
							</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Contact Form -->
			<div 
				class="bg-white rounded-2xl shadow-lg p-6 transition-all duration-700"
				class:opacity-0={!formVisible}
				class:translate-y-8={!formVisible}
				class:opacity-100={formVisible}
				class:translate-y-0={formVisible}
				data-animate="form"
				style="transition-delay: 400ms;"
			>
				<h2 class="text-xl font-bold text-dark-blue mb-5">Küldj üzenetet</h2>
				
				<form on:submit={handleSubmit} class="space-y-4">
					<!-- Name -->
					<div>
						<label for="name" class="block text-sm font-semibold text-dark-blue mb-1.5">
							Név <span class="text-red-500">*</span>
						</label>
						<input
							type="text"
							id="name"
							bind:value={formData.name}
							required
							class="w-full px-4 py-2.5 border border-desert-300 rounded-lg focus:ring-2 focus:ring-warm-blue focus:border-transparent transition-all duration-200 outline-none"
							placeholder="A teljes neved"
						/>
					</div>

					<!-- Email -->
					<div>
						<label for="email" class="block text-sm font-semibold text-dark-blue mb-1.5">
							Email cím <span class="text-red-500">*</span>
						</label>
						<input
							type="email"
							id="email"
							bind:value={formData.email}
							required
							class="w-full px-4 py-2.5 border border-desert-300 rounded-lg focus:ring-2 focus:ring-warm-blue focus:border-transparent transition-all duration-200 outline-none"
							placeholder="email@example.com"
						/>
					</div>

					<!-- Subject -->
					<div>
						<label for="subject" class="block text-sm font-semibold text-dark-blue mb-1.5">
							Tárgy <span class="text-red-500">*</span>
						</label>
						<input
							type="text"
							id="subject"
							bind:value={formData.subject}
							required
							class="w-full px-4 py-2.5 border border-desert-300 rounded-lg focus:ring-2 focus:ring-warm-blue focus:border-transparent transition-all duration-200 outline-none"
							placeholder="Miben segíthetünk?"
						/>
					</div>

					<!-- Message -->
					<div>
						<label for="message" class="block text-sm font-semibold text-dark-blue mb-1.5">
							Üzenet <span class="text-red-500">*</span>
						</label>
						<textarea
							id="message"
							bind:value={formData.message}
							required
							rows="5"
							class="w-full px-4 py-2.5 border border-desert-300 rounded-lg focus:ring-2 focus:ring-warm-blue focus:border-transparent transition-all duration-200 outline-none resize-none"
							placeholder="Írd le kérdésedet vagy üzenetedet..."
						></textarea>
					</div>

					<!-- Honeypot field (hidden from users, catches bots) -->
					<div class="absolute left-[-9999px]" aria-hidden="true">
						<label for="website">Website (leave blank)</label>
						<input
							type="text"
							id="website"
							name="website"
							bind:value={honeypot}
							tabindex="-1"
							autocomplete="off"
						/>
					</div>

					<!-- hCaptcha -->
					<div class="flex justify-center">
						<div bind:this={captchaContainer}></div>
					</div>

					<!-- Submit Button -->
					<button
						type="submit"
						disabled={isSubmitting}
						class="w-full px-6 py-3 bg-gradient-to-r from-dark-blue to-warm-blue text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
					>
						{#if isSubmitting}
							<span class="flex items-center justify-center">
								<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
									<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								Küldés...
							</span>
						{:else}
							Üzenet küldése
						{/if}
					</button>

					<!-- Success Message -->
					{#if submitStatus === 'success'}
						<div class="p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start space-x-3 animate-fadeIn">
							<svg class="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
							</svg>
							<div>
								<h4 class="text-emerald-900 font-semibold mb-1">Sikeres küldés!</h4>
								<p class="text-emerald-700 text-sm">Köszönjük üzenetét. Hamarosan jelentkezünk!</p>
							</div>
						</div>
					{/if}

					<!-- Error Message -->
					{#if submitStatus === 'error'}
						<div class="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3 animate-fadeIn">
							<svg class="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
							</svg>
							<div>
								<h4 class="text-red-900 font-semibold mb-1">Hiba történt</h4>
								<p class="text-red-700 text-sm">{errorMessage || 'Kérjük, próbálja újra később.'}</p>
							</div>
						</div>
					{/if}
				</form>
			</div>
		</div>
	</div>
</section>

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
		animation: fadeIn 0.3s ease-out;
	}
</style>
