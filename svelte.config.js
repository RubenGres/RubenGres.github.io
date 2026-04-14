import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),

		prerender: {
			handleHttpError: ({ status, path, referrer, referenceType }) => {
				// Ignore /blog/* paths — they live on an external subdomain
				if (status === 404 && path.startsWith('/blog')) {
					console.warn(`Skipping /blog path (external): ${path}`);
					return;
				}
				// Ignore dynamically-resolved paths from JS data
				if (status === 404 && referenceType === 'js') {
					console.warn(`Ignoring JS-referenced 404: ${path}`);
					return;
				}
				throw new Error(`${status} on ${path}${referrer ? ` (linked from ${referrer})` : ''}`);
			}
		}
	}
};
	
export default config;
