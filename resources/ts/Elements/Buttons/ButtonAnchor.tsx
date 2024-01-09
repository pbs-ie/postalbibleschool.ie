import { getButtonClassNamesAsString } from "@/helper";

export default function ButtonAnchor({ hierarchy = "primary", href, isExternalLink = false, Icon, children }: ButtonLinkProps) {
    return (
        <a
            href={href}
            className={getButtonClassNamesAsString(hierarchy, "medium")}
            target={isExternalLink ? "_blank" : "_self"}>
            <span className="flex items-center gap-2">
                <span>{children ?? href}</span>{Icon && <Icon />}
            </span>
        </a>
    )
}