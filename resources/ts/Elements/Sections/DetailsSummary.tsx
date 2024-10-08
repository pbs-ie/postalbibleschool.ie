export default function DetailsSummary({ children, summaryBody, defaultOpen = false }: { children: JSX.Element, summaryBody: JSX.Element, defaultOpen?: boolean }) {
    return (
        <details className="relative mb-4 group lg:mb-10" open={defaultOpen}>
            <summary className="pl-4 cursor-pointer group-open:before:rotate-90 flex justify-between mb-1 select-none before:transition-transform before:rotate-0 before:border-8 before:border-[transparent_transparent_transparent_black] before:absolute before:left-0 before:top-2 before:origin-[.2rem_50%]">{summaryBody}</summary>
            {children}
        </details>
    )
}