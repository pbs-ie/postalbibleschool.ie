import { getButtonClassName } from "@/helper";
import { Link } from "@inertiajs/react";
import { HTMLAttributeAnchorTarget } from "react";

interface ButtonLinkProps {
    type?: "primary" | "secondary";
    className?: string;
    target?: HTMLAttributeAnchorTarget;
    href: string;
    children: React.ReactNode;

}

export default function ButtonLink({ type = "primary", className = '', href, target = "_self", children }: ButtonLinkProps) {
    return (
        <>
            <Link
                as="button"
                type="button"
                target={target}
                className={getButtonClassName(className, type)}
                href={href}
            >
                {children}
            </Link>
        </>
    );
}
