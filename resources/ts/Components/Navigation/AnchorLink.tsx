export default function AnchorLink({ href, newTab = false, children, className = "", Icon }: {
    href: string, newTab?: boolean, className?: string, children?: React.ReactNode, Icon?: Icon["props"]
}) {
    return (
        <a href={href} className={"text-blue-600 underline hover:text-blue-800 visited:text-purple-600 " + className} target={newTab ? "_blank" : "_self"}>
            <span className="flex items-center gap-2">
                {Icon && <Icon />}<span>{children ?? href}{newTab && "(opens in new tab)"}</span>
            </span>
        </a>
    )
}