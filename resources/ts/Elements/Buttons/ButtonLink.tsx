import { getButtonClassNamesAsString } from "@/helper";
import { Link } from "@inertiajs/react";
interface ButtonLinkProps {
    hierarchy?: "primary" | "secondary";
    size?: Button["size"];
    href: string;
    children: React.ReactNode;
    Icon?: Icon["regular"];
}

export default function ButtonLink({ hierarchy = "primary", size = "medium", href, children, Icon }: ButtonLinkProps) {
    return (
        <>
            <Link
                as="button"
                type="button"
                className={getButtonClassNamesAsString(hierarchy, size)}
                href={href}
            >
                <span className="flex items-center gap-2">
                    <span>{children}</span>{Icon && <Icon />}
                </span>
            </Link>
        </>
    );
}
