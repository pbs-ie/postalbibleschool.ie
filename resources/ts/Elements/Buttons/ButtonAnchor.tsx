import { getButtonClassNamesAsString } from "@/helper";

export default function ButtonAnchor({ hierarchy = "primary", href, isExternalLink = false, Icon, size = "medium", children }: ButtonLinkProps) {
    return (
        <a
            href={href}
            className={getButtonClassNamesAsString(hierarchy, size)}
            target={isExternalLink ? "_blank" : "_self"}>
            <span className="flex items-center gap-2">
                {Icon && <Icon />}<span>{children ?? href}</span>
            </span>
        </a>
    )
}