import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./resources/ts", import.meta.url)),
            "@images": fileURLToPath(new URL("./resources/images", import.meta.url)),
        },
    },
    plugins: [
        laravel({
            input: "resources/ts/app.tsx",
            ssr: "resources/ts/ssr.tsx",
            refresh: true,
        }),
        react(),
    ],
    ssr: {
        noExternal: [
            "country-region-data",
            "@inertiajs/server"
        ],
    },
    server: {
        host: "127.0.0.1",
        // watch: {
        //     usePolling: true,
        // },
    },
});
