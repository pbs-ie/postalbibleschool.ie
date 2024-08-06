import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";
import SidebarLayout from "@/Layouts/SidebarLayout";

import DashboardSidebar from "@/Components/Navigation/DashboardSidebar";
import DashboardResourceSection from "@/Components/Sections/DashboardResourceSection";
import ClassroomListSection from "@/Components/Sections/ClassroomListSection";
import CurriculumListSection from "@/Components/Sections/CurriculumListSection";
import SchoolInformationSection from "@/Components/Sections/SchoolInformationSection";


interface DashboardProps {
    classrooms: ClassroomProps[],
    canViewCurriculum: boolean,
    curriculumList?: CurriculumProps[],
    lessonOrder: LessonOrder,
}
export default function Dashboard({ classrooms, canViewCurriculum = false, curriculumList, lessonOrder }: DashboardProps) {

    return (
        <WrapperLayout>
            <SidebarLayout>
                <DashboardSidebar canViewCurriculum={canViewCurriculum} />
                <ContentWrapper title="School Hub" className="w-full">
                    <div className="flex flex-col w-full pr-4 mx-auto lg:max-w-7xl">
                        <SchoolInformationSection lessonOrder={lessonOrder} />
                        <CurriculumListSection curriculumList={curriculumList ?? []} canViewCurriculum={canViewCurriculum} />
                        {!canViewCurriculum &&
                            <ClassroomListSection classrooms={classrooms} curriculumList={curriculumList ?? []} />
                        }
                    </div>
                </ContentWrapper>
            </SidebarLayout>
        </WrapperLayout>
    )
}