import { getButtonClassNamesAsString } from "@/helper";

export default function ButtonAnchor({ hierarchy = "primary", href, openNewTab = false, children }: { hierarchy?: "primary" | "secondary", href: string, openNewTab?: boolean, children?: React.ReactNode }) {
    return (
        <a
            href={href}
            className={getButtonClassNamesAsString(hierarchy, "medium")}
            target={openNewTab ? "_blank" : "_self"}>
            {children ?? href}
        </a>
    )
}