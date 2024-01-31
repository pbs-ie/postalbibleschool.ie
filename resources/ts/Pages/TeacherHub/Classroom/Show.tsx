import Heading1Nospace from "@/Components/Typography/Heading1Nospace"
import ButtonLink from "@/Elements/Buttons/ButtonLink"
import ChevronLeft from "@/Elements/Icons/ChevronLeft"
import SidebarLayout from "@/Layouts/SidebarLayout"
import TwoColumnLayout from "@/Layouts/TwoColumnLayout"
import WrapperLayout from "@/Layouts/WrapperLayout"

export default function Show({ classroom }: { classroom: ClassroomProps }) {
    return (
        <WrapperLayout>
            <ButtonLink hierarchy="transparent" href={route('dashboard')}><span className="flex items-center gap-2">
                <ChevronLeft />{"Back to Hub"}
            </span></ButtonLink>
            <SidebarLayout>
                <div></div>
                <TwoColumnLayout>
                    <div className="">
                        <Heading1Nospace>{classroom.name}</Heading1Nospace>
                    </div>
                </TwoColumnLayout>
            </SidebarLayout>
        </WrapperLayout>
    )
}