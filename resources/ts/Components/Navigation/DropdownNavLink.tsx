import { Link } from '@inertiajs/inertia-react';
export default function DropdownNavLink({ href, active, children }: { href: string, active: boolean, children: any }) {
    return (
        <Link
            href={href}
            className={
                active
                    ? 'inline-flex items-center whitespace-nowrap py-4 px-8 w-full text-gray-50 bg-blue-500 bg-clip-border text-sm font-medium leading-5 font-bold focus:outline-none focus:border-black focus:bg-slate-200 transition duration-150 ease-in-out'
                    : 'inline-flex items-center whitespace-nowrap py-4 px-8 w-full border-b border-gray-300 text-sm font-medium leading-5 hover:bg-slate-200 hover:rounded-lg focus:outline-none focus:border-black focus:bg-slate-200 transition duration-150 ease-in-out'
            }
        >
            {children}
        </Link>
    );
}
