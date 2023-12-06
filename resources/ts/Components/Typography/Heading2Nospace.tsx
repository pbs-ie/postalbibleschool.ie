export default function Heading2Alt({ className = "", children }: { className?: string, children: React.ReactNode }): JSX.Element {
    return (
        <><h2 className={`leading-tight uppercase text-blue-900 text-3xl font-bold ${className}`}>{children}</h2></>
    );
}