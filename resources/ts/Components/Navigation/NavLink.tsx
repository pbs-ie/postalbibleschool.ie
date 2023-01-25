import { Link } from '@inertiajs/inertia-react';
export default function NavLink({ href, active, isSecondary, children }: { href: string, active: boolean, isSecondary?: boolean, children: any }) {
    return (
        <Link
            href={href}
            className={
                active
                    ? `inline-flex uppercase items-center px-1 pt-1 border-b-2 border-gray-300 text-sm leading-5 ${isSecondary ? 'text-blue-900' : 'text-white'} font-bold hover:border-gray-50 focus:outline-none focus:border-white transition duration-150 ease-in-out`
                    : `inline-flex uppercase items-center px-1 pt-1 border-b-2 border-transparent text-sm  leading-5 ${isSecondary ? 'text-blue-900 font-normal hover:font-bold' : 'text-gray-200 font-medium hover:text-white'}  hover:border-gray-50 focus:outline-none focus:text-gray-100 focus:border-gray-50 transition duration-150 ease-in-out`
            }
        >
            {children}
        </Link>
    );
}
