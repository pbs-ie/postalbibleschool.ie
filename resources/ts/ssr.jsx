import { createInertiaApp } from '@inertiajs/react'
import createServer from '@inertiajs/react/server'
import ReactDOMServer from 'react-dom/server'
import route from "ziggy-js";
import {Ziggy} from "@/ziggy";

createServer(page =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => `${title} | Postal Bible School`,
        resolve: name => {
            const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true })
            return pages[`./Pages/${name}.tsx`]
        },
        setup: ({ App, props }) => {
            // Set global function route
            global.route = (name, params, absolute, config = Ziggy) => route(name, params, absolute, config);
            <App {...props} />;
        },
    }),
)