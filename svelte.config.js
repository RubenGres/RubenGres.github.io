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
				// Ignore 404 errors for specific routes
				if (status === 404) {
					console.warn(`Ignoring 404 error for ${path}`);
					return; // Prevent the error from stopping the build
				}
			}
		}
	}
};
	
export default config;
