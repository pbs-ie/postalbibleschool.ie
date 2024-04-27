import { Head } from "@inertiajs/react";
import WrapperLayout from "@/Layouts/WrapperLayout";


export default function CampWrapper({ children, title }: { children: React.ReactNode, title: string }) {
    return (
        <WrapperLayout showCampNav>
            {/* @ts-ignore  */}
            <Head>
                <title>{`Events - Camp${title !== "" ? " - " + title : ""}`}</title>
            </Head>
            <section className="text-center">
                {children}
            </section>
        </WrapperLayout>
    )
}