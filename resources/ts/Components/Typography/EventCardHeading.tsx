export default function Heading3({ className = "", children }: { className?: string, children: React.ReactNode }): JSX.Element {
    return (
        <><div className={`leading-tight uppercase text-blue-600 text-2xl font-bold mb-2 mt-0 ${className}`}>{children}</div></>
    );
}