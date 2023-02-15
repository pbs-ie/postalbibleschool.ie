import { createInertiaApp } from '@inertiajs/inertia-react'
import createServer from '@inertiajs/server'
import ReactDOMServer from 'react-dom/server'

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'PBS';

createServer(page =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => `${title} | ${appName}`,
        resolve: name => {
            const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true })
            return pages[`./Pages/${name}.tsx`]
        },
        setup: ({ App, props }) => <App {...props} />,
    }),
)