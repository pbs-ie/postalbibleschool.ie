import Heading1 from "@/Components/Typography/Heading1";
import { Head } from "@inertiajs/inertia-react";

export default function EventWrapper({ title, heading, className = "", children }: { title: string, heading?: string, className?: string, children: React.ReactNode }): JSX.Element {
    return (
        <>
            <Head title={`Events - ${title}`}></Head>
            <section className={"py-12 mx-auto text-center shadow-sm max-w-7xl sm:px-6 lg:px-8 " + className}>
                <Heading1>{heading ?? title}</Heading1>
                {children}
            </section>
        </>
    )
}