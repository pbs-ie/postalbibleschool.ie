export default function Heading2Alt({ className = "", isTitlecase = false, children }: { className?: string, isTitlecase?: boolean, children: React.ReactNode }): JSX.Element {
    return (
        <><h2 className={`leading-tight ${isTitlecase ? "capitalize" : "uppercase"} text-blue-900 text-2xl md:text-3xl font-bold mb-2 mt-0 ${className}`}>{children}</h2></>
    );
}