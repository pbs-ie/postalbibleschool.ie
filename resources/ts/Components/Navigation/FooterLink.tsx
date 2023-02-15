import { Link } from '@inertiajs/inertia-react';

export default function ResponsiveNavLink({ method = 'get', as = 'a', href, children }: { method?: string, as?: string, href: string, children: React.ReactNode }) {
    return (
        <Link
            method={method}
            as={as}
            href={href}
            className="flex items-start w-full py-3 pl-3 pr-4 font-medium transition duration-150 ease-in-out border-b border-gray-300 text-slate-300 hover:text-white focus:text-white focus:border-transparent md:text-base focus:outline-none focus:ring-2 focus:ring-gray-100"
        >
            {children}
        </Link>
    );
}
