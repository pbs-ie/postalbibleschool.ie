export default function Heading4({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <><h4 className="p-6 mt-0 mb-2 text-2xl italic font-thin leading-tight text-blue-800 uppercase">{children}</h4></>
    );
}