export default function Heading1Nospace({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <><h1 className="text-3xl font-bold leading-snug text-blue-900 uppercase md:text-4xl font-subtitle">{children}</h1></>
    );
}