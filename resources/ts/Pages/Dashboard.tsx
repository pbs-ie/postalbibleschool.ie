import ResourceCard from "@/Components/Cards/ResourceCard";
import Video from "@/Elements/Icons/VideoCamera";
import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";
import ClassroomListSection from "@/Components/Sections/ClassroomListSection";
import SidebarLayout from "@/Layouts/SidebarLayout";
import Heading2Alt from "@/Components/Typography/Heading2Alt";
import Play from "@/Elements/Icons/PlayIcon";
import DashboardResourceSection from "@/Components/Sections/DashboardResourceSection";
import CurriculumListSection from "@/Components/Sections/CurriculumListSection";

export default function Dashboard({ classrooms, canViewCurriculum = false, curriculumList }: { classrooms: any, canViewCurriculum: boolean, curriculumList?: CurriculumProps[] }) {

    return (
        <WrapperLayout>
            <SidebarLayout>
                <div className="flex flex-col items-center p-10 bg-sky-100 w-full lg:w-72 mx-auto">
                    <Heading2Alt className="text-center">Additional Resources</Heading2Alt>
                    <div className="flex flex-wrap lg:flex-col gap-2 mx-auto">
                        <ResourceCard size="small" Icon={Play} href={route('assembly.index')} title="Assembly Videos" />
                        <ResourceCard size="small" Icon={Video} href={route('assembly.bonus.index')} title="Bonus Videos" />
                    </div>
                </div>
                <ContentWrapper title="School Hub" className="md:w-full lg:w-full">
                    <div className="flex flex-col items-center w-full lg:max-w-4xl mx-auto">
                        <DashboardResourceSection canViewCurriculum={canViewCurriculum} />
                        <CurriculumListSection curriculumList={curriculumList} />
                        <ClassroomListSection classrooms={classrooms} />
                    </div>
                </ContentWrapper>
            </SidebarLayout>
        </WrapperLayout>
    )
}