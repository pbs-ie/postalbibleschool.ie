import { Head } from "@inertiajs/react";

import DashboardSidebar from "@/Components/Navigation/DashboardSidebar";
import Heading1 from "@/Components/Typography/Heading1";

import ButtonLink from "@/Elements/Buttons/ButtonLink";
import ChevronLeft from "@/Elements/Icons/ChevronLeft";

import WrapperLayout from "@/Layouts/WrapperLayout";
import SidebarLayout from "@/Layouts/SidebarLayout";

export default function WrapperWithNavback({ title, navBackText, navBackRoute, canEdit = false, children }: { title: string, navBackText: string, navBackRoute: string, canEdit?: boolean, children: React.ReactNode }) {
    return (
        <WrapperLayout>
            <SidebarLayout>
                <DashboardSidebar canManageCurriculum={canEdit} />
                <Head title={title}></Head>
                <div className="w-full">
                    <ButtonLink hierarchy="transparent" href={navBackRoute}><span className="flex items-center gap-2">
                        <ChevronLeft />{navBackText}
                    </span></ButtonLink>
                    <section className={"p-4 mx-auto text-center max-w-7xl sm:px-6 mb-5"}>
                        <Heading1>{title}</Heading1>
                        {children}
                    </section>
                </div>
            </SidebarLayout>
        </WrapperLayout>
    )
}