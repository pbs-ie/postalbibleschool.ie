export default function Heading2({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <><h2 className="p-6 mt-6 mb-4 font-sans text-3xl font-bold leading-relaxed text-center text-blue-900 uppercase md:font-extrabold md:text-4xl">{children}</h2></>
    );
}