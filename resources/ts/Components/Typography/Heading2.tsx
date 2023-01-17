export default function Heading2({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <><h2 className="font-subtitle leading-relaxed uppercase text-3xl text-center font-bold mb-4 mt-6 p-6 text-blue-800">{children}</h2></>
    );
}