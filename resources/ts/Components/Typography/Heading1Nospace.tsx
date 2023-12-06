export default function Heading1({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <><h1 className="p-4 text-3xl font-bold leading-snug text-blue-900 uppercase md:text-4xl font-subtitle">{children}</h1></>
    );
}