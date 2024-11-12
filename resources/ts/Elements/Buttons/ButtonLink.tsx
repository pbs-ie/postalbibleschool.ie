import { getButtonClassNamesAsString } from "@/helper";
import { Link } from "@inertiajs/react";


export default function ButtonLink({ hierarchy = "primary", size = "medium", href, children, Icon, dataTest }: Omit<ButtonLinkProps, "isExternalLink">) {
    return (
        <>
            <Link
                as="button"
                type="button"
                className={getButtonClassNamesAsString(hierarchy, size)}
                href={href}
                data-test={dataTest}
            >
                <span className="flex items-center gap-2">
                    {Icon && <Icon />}<span>{children}</span>
                </span>
            </Link>
        </>
    );
}
