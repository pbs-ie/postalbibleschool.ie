import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
const path = require('path');

export default defineConfig({
    resolve: {
        alias: {
            '@images': path.resolve(__dirname, './resources/images')
        }
    },
    plugins: [
        laravel({
            input: "resources/js/app.jsx",
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: "127.0.0.1",
        // watch: {
        //     usePolling: true,
        // },
    },
});
