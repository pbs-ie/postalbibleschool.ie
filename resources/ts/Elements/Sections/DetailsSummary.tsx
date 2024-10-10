export default function DetailsSummary({ children, summaryElement, defaultOpen = false }: { children: JSX.Element, summaryElement: JSX.Element, defaultOpen?: boolean }) {
    return (
        <details className="relative mb-4 border border-gray-200 rounded-lg bg-sky-100 open:bg-white group" open={defaultOpen}>
            <summary className="pl-4 p-4 cursor-pointer group-open:after:rotate-90 flex justify-between select-none after:transition-transform after:rotate-0 after:border-8 after:mr-6 after:mt-4 after:border-[transparent_transparent_transparent_black] after:absolute after:right-0 after:top-2 after:origin-[.2rem_50%]">{summaryElement}</summary>
            <div className="px-2 pb-2 mt-2 lg:px-4 lg:pb-4">
                {children}
            </div>
        </details>
    )
}