import { getButtonClassName } from "@/helper";

export default function ButtonAnchor({ type = "primary", href, newTab = false, children, className = "" }: { type?: "primary" | "secondary", href: string, newTab?: boolean, className?: string, children?: React.ReactNode }) {
    return (
        <a
            href={href}
            className={getButtonClassName(className, type)}
            target={newTab ? "_blank" : "_self"}>
            {children ?? href}
        </a>
    )
}