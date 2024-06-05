
import NewCurriculumForm from "@/Components/Forms/NewCurriculumForm";
import Heading1Nospace from "@/Components/Typography/Heading1Nospace"
import ButtonLink from "@/Elements/Buttons/ButtonLink";
import ChevronLeft from "@/Elements/Icons/ChevronLeft";
import SidebarLayout from "@/Layouts/SidebarLayout";
import WrapperLayout from "@/Layouts/WrapperLayout";

export default function Create() {

    return (
        <WrapperLayout>
            <ButtonLink hierarchy="transparent" href={route('dashboard')}><span className="flex items-center gap-2">
                <ChevronLeft />{"Back to Hub"}
            </span></ButtonLink>
            <SidebarLayout>
                <div></div>
                <div>
                    <Heading1Nospace>Create New Curriculum</Heading1Nospace>

                    <NewCurriculumForm />
                </div>
            </SidebarLayout>
        </WrapperLayout >
    )
}