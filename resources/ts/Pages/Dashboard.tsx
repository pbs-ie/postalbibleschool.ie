import _ from "lodash";

import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";
import SidebarLayout from "@/Layouts/SidebarLayout";

import DashboardSidebar from "@/Components/Navigation/DashboardSidebar";
import ClassroomListSection from "@/Components/Sections/ClassroomListSection";
import CurriculumListSection from "@/Components/Sections/CurriculumListSection";
import SchoolInformationSection from "@/Components/Sections/SchoolInformationSection";


interface DashboardProps {
    classrooms: ClassroomProps[],
    canManageCurriculum: boolean,
    curriculumList?: CurriculumProps[],
    lessonOrder: LessonOrder,
}
export default function Dashboard({ classrooms, canManageCurriculum = false, curriculumList, lessonOrder }: DashboardProps) {

    return (
        <WrapperLayout>
            <SidebarLayout>
                <DashboardSidebar canManageCurriculum={canManageCurriculum} />
                <ContentWrapper title="School Hub" className="w-full">
                    <div className="flex flex-col w-full pr-4 mx-auto lg:max-w-7xl">
                        {!_.isEmpty(lessonOrder) &&
                            <SchoolInformationSection lessonOrder={lessonOrder} />
                        }
                        <CurriculumListSection curriculumList={curriculumList ?? []} canManageCurriculum={canManageCurriculum} />
                        {!canManageCurriculum &&
                            <ClassroomListSection classrooms={classrooms} curriculumList={curriculumList ?? []} />
                        }
                    </div>
                </ContentWrapper>
            </SidebarLayout>
        </WrapperLayout>
    )
}