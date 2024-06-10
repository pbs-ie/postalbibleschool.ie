import Heading1 from "@/Components/Typography/Heading1";
import ButtonLink from "@/Elements/Buttons/ButtonLink";
import ChevronLeft from "@/Elements/Icons/ChevronLeft";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { Head } from "@inertiajs/react";

export default function BonusAssemblyWrapper({ title, navBackText, navBackRoute, children }: { title: string, navBackText: string, navBackRoute: string, children: React.ReactNode }) {
    return (
        <WrapperLayout>
            <Head title={title}></Head>
            <ButtonLink hierarchy="transparent" href={navBackRoute}><span className="flex items-center gap-2">
                <ChevronLeft />{navBackText}
            </span></ButtonLink>
            <section className={"p-4 mx-auto text-center max-w-7xl sm:px-6 mb-5"}>
                <Heading1>{title}</Heading1>
                {children}
            </section>
        </WrapperLayout>
    )
}