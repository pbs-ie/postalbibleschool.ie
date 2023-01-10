import { Link } from '@inertiajs/inertia-react';
export default function DropdownNavLink({ href, active, children }: { href: string, active: boolean, children: any }) {
    return (
        <Link
            href={href}
            className={
                active
                    ? 'inline-flex items-center whitespace-nowrap py-4 px-8 w-full border-b-1 text-gray-50 bg-pbsblue text-sm font-medium leading-5 font-bold hover:border-gray-50 focus:outline-none focus:border-black focus:bg-slate-200 transition duration-150 ease-in-out'
                    : 'inline-flex items-center whitespace-nowrap py-4 px-8 w-full border-b-1 border-gray-50 text-sm font-medium leading-5 hover:bg-slate-200 focus:outline-none focus:border-black focus:bg-slate-200 transition duration-150 ease-in-out'
            }
        >
            {children}
        </Link>
    );
}
