import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";
import ClassroomListSection from "@/Components/Sections/ClassroomListSection";
import SidebarLayout from "@/Layouts/SidebarLayout";
import DashboardResourceSection from "@/Components/Sections/DashboardResourceSection";
import CurriculumListSection from "@/Components/Sections/CurriculumListSection";
import DashboardSidebar from "@/Components/Navigation/DashboardSidebar";

import SchoolInformationSection from "@/Components/Sections/SchoolInformationSection";


interface DashboardProps {
    classrooms: any,
    canViewCurriculum: boolean,
    curriculumList?: CurriculumProps[],
    lessonOrder: LessonOrder,
}
export default function Dashboard({ classrooms, canViewCurriculum = false, curriculumList, lessonOrder }: DashboardProps) {

    return (
        <WrapperLayout>
            <SidebarLayout>
                <DashboardSidebar />
                <ContentWrapper title="School Hub" className="w-full">
                    <div className="flex flex-col lg:max-w-7xl w-full pr-4 mx-auto">
                        <SchoolInformationSection lessonOrder={lessonOrder} />
                        <DashboardResourceSection canViewCurriculum={canViewCurriculum} />
                        <CurriculumListSection curriculumList={curriculumList} />
                        <ClassroomListSection classrooms={classrooms} curriculumList={curriculumList ?? []} />
                    </div>
                </ContentWrapper>
            </SidebarLayout>
        </WrapperLayout>
    )
}