export default function Heading3({ className = "", children }: { className?: string, children: React.ReactNode }): JSX.Element {
    return (
        <><h3 className={`leading-tight capitalize text-blue-800 text-2xl font-bold mb-2 mt-0 ${className}`}>{children}</h3></>
    );
}