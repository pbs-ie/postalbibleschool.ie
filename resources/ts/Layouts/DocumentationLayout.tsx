import { Head } from "@inertiajs/react";
import WrapperLayout from "./WrapperLayout";
import TitleBlock from "@/Components/Typography/TitleBlock";

export default function DocumentationLayout({ title, subtitle, children }: { title: string, subtitle?: string, children: React.ReactNode }): JSX.Element {
    return (
        <WrapperLayout>
            <div className="grid md:grid-cols-[1fr_4fr]">
                <nav></nav>
                <div>
                    <Head title={title}></Head>
                    <section>
                        <TitleBlock title={title} subtitle={subtitle} />

                        <div className="px-4 py-12 sm:px-6 lg:px-12">
                            {children}
                        </div>
                    </section>
                </div>
            </div>
        </WrapperLayout>
    )
}