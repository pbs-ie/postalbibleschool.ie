export default function Heading4({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <><h4 className="leading-tight text-blue-800 text-xl font-bold mb-2 mt-0 p-6">{children}</h4></>
    );
}