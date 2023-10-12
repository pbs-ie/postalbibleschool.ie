import { Method } from "@inertiajs/core";
import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({ method = "get", as = 'a', href, active = false, children }: { method?: Method | undefined, as?: string, href: string, active?: boolean, children: React.ReactNode }) {
    return (
        <Link
            method={method}
            as={as}
            href={href}
            className={`w-full flex items-start mx-2 px-2 py-2 text-base font-medium transition duration-150 ease-in-out rounded 
            ${active
                    ? 'bg-gray-300 text-gray-900 dark:bg-gray-700  dark:text-gray-100'
                    : 'border-transparent hover:text-gray-900 focus:text-gray-900 focus:bg-gray-300 hover:bg-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-700 dark:focus:text-gray-100 dark:focus:bg-gray-700'
                }`}
        >
            {children}
        </Link>
    );
}
