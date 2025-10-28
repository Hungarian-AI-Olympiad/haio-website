import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		
		paths: {
			base: process.env.PUBLIC_BASE_PATH || ''
		},
		
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// Ignore 404s for favicon and other common missing files
				if (path.includes('favicon')) {
					return;
				}
				throw new Error(message);
			}
		},
		
		// Content Security Policy for enhanced security
		csp: {
			mode: 'auto',
			directives: {
				'default-src': ['self'],
				'script-src': ['self', 'unsafe-inline', 'https://js.hcaptcha.com', 'https://cdnjs.cloudflare.com', 'https://www.youtube.com'],
				'style-src': ['self', 'unsafe-inline', 'https://fonts.googleapis.com', 'https://cdnjs.cloudflare.com'],
				'font-src': ['self', 'https://fonts.gstatic.com', 'https://cdnjs.cloudflare.com'],
				'img-src': ['self', 'data:', 'https:', 'blob:'],
				'frame-src': ['https://www.youtube.com', 'https://colab.research.google.com', 'https://newrelic.com', 'https://hcaptcha.com', 'https://*.hcaptcha.com'],
				'connect-src': ['self', 'https://api.web3forms.com', 'https://hcaptcha.com', 'https://*.hcaptcha.com'],
				'object-src': ['none'],
				'base-uri': ['self']
			}
		}
	}
};

export default config;
