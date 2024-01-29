import Heading1Alt from "@/Components/Typography/Heading1Alt"
import ButtonLink from "@/Elements/Buttons/ButtonLink"
import ChevronLeft from "@/Elements/Icons/ChevronLeft"
import WrapperLayout from "@/Layouts/WrapperLayout"

export default function Show({ classroom }: { classroom: ClassroomProps }) {
    return (
        <WrapperLayout>
            <ButtonLink hierarchy="transparent" href={route('dashboard')}><span className="flex items-center gap-2">
                <ChevronLeft />{"Back to Hub"}
            </span></ButtonLink>
            <Heading1Alt>Class name : {classroom.name}</Heading1Alt>


        </WrapperLayout>

    )
}