import { Link } from '@inertiajs/inertia-react';

export default function ResponsiveNavLink({ method = 'get', as = 'a', href, children }: { method?: string, as?: string, href: string, children: React.ReactNode }) {
    return (
        <Link
            method={method}
            as={as}
            href={href}
            className={`w-full flex items-start pl-3 pr-4 py-3 text-slate-100 hover:text-gray-50 focus:text-gray-50 border-b border-gray-300  hover:border-gray-400 focus:border-transparent   text-base font-medium focus:outline-none focus:ring-2 focus:ring-gray-100 transition duration-150 ease-in-out`}
        >
            {children}
        </Link>
    );
}
