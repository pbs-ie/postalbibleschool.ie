export default function Heading2({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <><h2 className="p-2 my-2 font-sans text-3xl font-bold leading-relaxed text-center text-blue-900 uppercase lg:mt-6 lg:mb-4 lg:p-6 md:font-extrabold md:text-4xl">{children}</h2></>
    );
}