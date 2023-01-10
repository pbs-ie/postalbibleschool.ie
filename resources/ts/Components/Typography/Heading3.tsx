export default function Heading3({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <><h3 className="leading-tight text-blue-800 text-2xl font-bold mb-2 mt-0 px-6 py-4">{children}</h3></>
    );
}