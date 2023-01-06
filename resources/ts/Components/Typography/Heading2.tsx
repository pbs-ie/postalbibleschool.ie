export default function Heading2({ children }: {children: React.ReactNode}): JSX.Element {
    return (
        <><h2 className="font-medium leading-tight text-2xl font-bold mb-2 mt-0 p-4 text-blue-600">{children}</h2></>
    );
}