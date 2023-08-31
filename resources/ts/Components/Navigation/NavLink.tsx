import { Link } from '@inertiajs/react';
export default function NavLink({ href, active, isCta, isSecondary, children }: { href: string, active: boolean, isSecondary?: boolean, isCta?: boolean, children: any }) {
    const getCurrentStyle: () => string = () => {
        let styleValue = 'inline-flex uppercase items-center pt-1 border-b-2 text-sm leading-5 transition duration-150 ease-in-out ';
        if (isCta) {
            styleValue += ` my-3 rounded-full text-gray-800 px-3 active:border-b-0`;
            if (active) {
                styleValue += ` text-indigo-700 bg-indigo-50 font-bold`
            } else {
                styleValue += ` bg-cyan-300 hover:bg-cyan-400 font-medium`
            }
        }
        else if (active) {
            styleValue += ` border-gray-300 ${isSecondary ? 'text-blue-900' : 'text-white'} font-bold hover:border-gray-50 focus:border-white`
        } else {
            styleValue += ` border-transparent ${isSecondary ? 'text-blue-900 font-normal hover:font-bold' : 'text-gray-200 font-medium hover:text-white'}  hover:border-gray-50 focus:text-gray-100 focus:border-gray-50`
        }

        return styleValue;
    }
    return (
        <Link
            href={href}
            className={getCurrentStyle()}
        >
            {children}
        </Link>
    );
}
