import { InertiaLinkProps, Link } from '@inertiajs/react';

interface SidebarLinkProps {
    isActive: boolean;
    isSecondary?: boolean;
    children: React.ReactNode;
}

export default function SidebarLink({ isActive, isSecondary, children, ...props }: SidebarLinkProps & Omit<InertiaLinkProps, "className" | "aria-current">) {
    return (
        <Link
            {...props}
            className={'w-full capitalize items-center hover:bg-white hover:text-black p-2 rounded-t lg:rounded text-sm leading-5 ' +
                (isActive ? 'font-bold bg-white text-black'
                    : '')
            }
            aria-current={isActive ? "true" : "false"}
        >
            {children}
        </Link>
    );
}
