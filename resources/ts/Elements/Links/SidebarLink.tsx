import { InertiaLinkProps, Link } from '@inertiajs/react';

interface SidebarLinkProps {
    isActive: boolean;
    isSecondary?: boolean;
    children: React.ReactNode;
}

export default function SidebarLink({ isActive, isSecondary, children, ...props }: SidebarLinkProps & Omit<InertiaLinkProps, "className" | "aria-current">) {
    const getCurrentStyle: () => string = () => {
        let styleValue = 'w-full capitalize items-center p-2 rounded text-sm leading-5 transition duration- ease-in-out ';
        if (isActive) {
            styleValue += ` font-bold bg-gray-200 `
        } else {
            styleValue += ` `
        }
        return styleValue;
    }
    return (
        <Link
            {...props}
            className={getCurrentStyle()}
            aria-current={isActive ? "true" : "false"}
        >
            {children}
        </Link>
    );
}
