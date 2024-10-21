import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode } from 'react';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'PBS';

let timeout: number;

router.on('start', (event) => {
    console.log(event.detail.visit);
    timeout = setTimeout(() => {
        document.getElementById('loader')?.classList.remove('hidden')
        document.body.style.overflow = 'hidden';
    }, 500);
});

router.on('finish', (event) => {
    console.log(event.detail.visit);
    document.body.style.overflow = 'unset';
    document.getElementById('loader')?.classList.add('hidden');
    clearTimeout(timeout);
});

createInertiaApp({
    title: (title) => `${title} | ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <StrictMode>
                <App {...props} />
            </StrictMode>
        );
    },
    progress: false
});
