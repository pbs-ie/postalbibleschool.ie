export default function Heading1({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <><h1 className="p-2 my-2 text-4xl font-bold leading-snug text-blue-800 uppercase md:text-5xl lg:mt-2 lg:mb-4 lg:p-6 font-title">{children}</h1></>
    );
}