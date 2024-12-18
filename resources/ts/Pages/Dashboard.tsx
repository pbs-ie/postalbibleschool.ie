import { Head } from "@inertiajs/react";

import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";
import SidebarLayout from "@/Layouts/SidebarLayout";

import DashboardSidebar from "@/Components/Navigation/DashboardSidebar";
import { ProjectedOrders } from "@/Components/Sections/ProjectedOrdersSection";
import SchoolOrderSection from "@/Components/Sections/SchoolOrderSection";


interface DashboardProps {
    classrooms: ClassroomProps[],
    canManageCurriculum: boolean,
    curriculumList?: CurriculumProps[],
    projectedOrders: ProjectedOrders[]
}
export default function Dashboard({ classrooms, canManageCurriculum = false, curriculumList, projectedOrders }: DashboardProps) {

    return (
        <WrapperLayout>
            <SidebarLayout>
                <DashboardSidebar canManageCurriculum={canManageCurriculum} />
                <ContentWrapper className="w-full overflow-auto" title={""}>
                    <Head title="School Hub" />
                    {canManageCurriculum ?
                        <p className="italic text-gray-700">You are logged in as an admin. Resources can be found in the sidebar.</p>
                        :
                        <SchoolOrderSection classrooms={classrooms} projectedOrders={projectedOrders} curricula={curriculumList ?? []} />
                    }
                </ContentWrapper>
            </SidebarLayout>
        </WrapperLayout>
    )
}