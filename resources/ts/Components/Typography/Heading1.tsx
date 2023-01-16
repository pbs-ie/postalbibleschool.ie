export default function Heading1({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <><h1 className="font-serif font-normal uppercase leading-snug text-5xl font-bold mb-4 mt-2 p-6 text-blue-800">{children}</h1></>
    );
}