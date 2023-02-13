export default function Heading2({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <><h2 className="p-6 mt-6 mb-4 text-3xl font-bold leading-relaxed text-center text-blue-900 uppercase md:font-extrabold font-subtitle md:text-4xl">{children}</h2></>
    );
}