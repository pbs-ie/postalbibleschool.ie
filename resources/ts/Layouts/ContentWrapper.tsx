import Heading1 from "@/Components/Typography/Heading1";
import { Head } from "@inertiajs/react";

export default function ContentWrapper({ title, className = "", children }: { title: string, className?: string, children: React.ReactNode }): JSX.Element {
    return (
        <>
            <Head title={title}></Head>
            <section className={`px-4 py-12 mx-auto text-center max-w-7xl sm:px-6 lg:px-8 ${className}`}>
                <Heading1>{title}</Heading1>
                {children}
            </section>
        </>
    )
}