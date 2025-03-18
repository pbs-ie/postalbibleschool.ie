import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
// import fs from 'node:fs';

export default defineConfig({
	base: "./",
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./resources/ts", import.meta.url)),
			"@images": fileURLToPath(new URL("./resources/images", import.meta.url)),
		},
	},
	plugins: [
		laravel({
			input: "resources/ts/app.tsx",
			ssr: "resources/ts/ssr.jsx",
			refresh: true,
		}),
		react(),
	],
	ssr: {
		noExternal: ["country-region-data", "@inertiajs/server"],
	},
	server: {
		host: "127.0.0.1",
		// watch: {
		//     usePolling: true,
		// },
		// https: {
		//     key: fs.readFileSync('localhost+2-key.pem'),
		//     cert: fs.readFileSync('localhost+2.pem')
		// }
	},
});
