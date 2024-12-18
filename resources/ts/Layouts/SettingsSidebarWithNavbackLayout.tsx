import { Head } from "@inertiajs/react";

import Heading1 from "@/Components/Typography/Heading1";

import ButtonLink from "@/Elements/Buttons/ButtonLink";
import ChevronLeft from "@/Elements/Icons/ChevronLeft";

import WrapperLayout from "@/Layouts/WrapperLayout";
import SidebarLayout from "@/Layouts/SidebarLayout";
import SettingsSidebar from "@/Components/Navigation/SettingsSidebar";

export default function SettingSidebarWithNavbackLayout({ title, navBackText, navBackRoute, children }: { title: string, navBackText?: string, navBackRoute?: string, children: React.ReactNode }) {
    return (
        <WrapperLayout>
            <SidebarLayout>
                <SettingsSidebar />
                <Head title={title}></Head>
                <div className="w-full">
                    {navBackRoute && navBackText &&
                        <ButtonLink hierarchy="transparent" href={navBackRoute}>
                            <span className="flex items-center gap-2"><ChevronLeft />{navBackText}</span>
                        </ButtonLink>
                    }
                    <section className={"p-4 mx-auto text-center max-w-7xl sm:px-6 mb-5"}>
                        <Heading1>{title}</Heading1>
                        {children}
                    </section>
                </div>
            </SidebarLayout>
        </WrapperLayout>
    )
}