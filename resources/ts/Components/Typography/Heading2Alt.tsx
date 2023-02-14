export default function Heading3({ className = "", children }: { className?: string, children: React.ReactNode }): JSX.Element {
    return (
        <><h2 className={`leading-tight uppercase text-blue-900 text-3xl font-bold mb-2 mt-0 ${className}`}>{children}</h2></>
    );
}