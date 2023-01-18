import Heading1 from "@/Components/Typography/Heading1";
import { Head } from "@inertiajs/inertia-react";

export default function EventWrapper({ title, children }: { title: string, children: React.ReactNode }): JSX.Element {
    return (
        <>
            <Head title={title}></Head>
            <section className="text-center shadow-sm sm:rounded-lg max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <Heading1>{title}</Heading1>
                {children}
            </section>
        </>
    )
}