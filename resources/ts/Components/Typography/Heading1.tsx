export default function Heading1({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <><h1 className="p-6 mt-2 mb-4 text-4xl font-bold leading-snug text-blue-800 uppercase md:text-5xl font-title">{children}</h1></>
    );
}