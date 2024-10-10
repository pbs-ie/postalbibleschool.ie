import _ from "lodash";

import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";
import SidebarLayout from "@/Layouts/SidebarLayout";

import DashboardSidebar from "@/Components/Navigation/DashboardSidebar";
import ClassroomListSection from "@/Components/Sections/ClassroomListSection";
import CurriculumListSection from "@/Components/Sections/CurriculumListSection";
import SchoolInformationSection from "@/Components/Sections/SchoolInformationSection";
import ProjectedOrdersSection, { ProjectedOrders } from "@/Components/Sections/ProjectedOrdersSection";


interface DashboardProps {
    classrooms: ClassroomProps[],
    canManageCurriculum: boolean,
    curriculumList?: CurriculumProps[],
    lessonOrder: LessonOrder,
    projectedOrders: ProjectedOrders[]
}
export default function Dashboard({ classrooms, canManageCurriculum = false, curriculumList, lessonOrder, projectedOrders }: DashboardProps) {

    return (
        <WrapperLayout>
            <SidebarLayout>
                <DashboardSidebar canManageCurriculum={canManageCurriculum} />
                <ContentWrapper className="w-full overflow-auto" title={""}>
                    <div className="flex flex-col w-full pr-4 mx-auto lg:max-w-7xl">
                        {/* {!_.isEmpty(lessonOrder) &&
                            <SchoolInformationSection lessonOrder={lessonOrder} />
                        } */}
                        {!canManageCurriculum &&
                            <ClassroomListSection classrooms={classrooms} curriculumList={curriculumList ?? []} />
                        }
                        <CurriculumListSection curriculumList={curriculumList ?? []} />
                        {!canManageCurriculum &&
                            <ProjectedOrdersSection projectedOrders={projectedOrders} />
                        }
                    </div>
                </ContentWrapper>
            </SidebarLayout>
        </WrapperLayout>
    )
}