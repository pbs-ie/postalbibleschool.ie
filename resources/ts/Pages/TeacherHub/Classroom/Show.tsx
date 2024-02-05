import AddClassroomStudentsForm from "@/Components/Forms/AddClassroomStudentsForm"
import PopupModal from "@/Components/Modals/PopupModal"
import Heading1Nospace from "@/Components/Typography/Heading1Nospace"
import BasicButton from "@/Elements/Buttons/BasicButton"
import ButtonLink from "@/Elements/Buttons/ButtonLink"
import ChevronLeft from "@/Elements/Icons/ChevronLeft"
import SidebarLayout from "@/Layouts/SidebarLayout"
import TwoColumnLayout from "@/Layouts/TwoColumnLayout"
import WrapperLayout from "@/Layouts/WrapperLayout"
import { useRef } from "react"

export interface StudentProps {
    classroom_id: string,
    first_name: string,
    last_name: string,
    area_code: string,
    grade: string,
    id: number
}

export default function Show({ classroom, students = [] }: { classroom: ClassroomProps, students: StudentProps[] }) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const showStudentListModal = () => {
        dialogRef.current?.showModal();
    }
    return (
        <WrapperLayout>
            <PopupModal innerRef={dialogRef}>
                <AddClassroomStudentsForm students={students} />
            </PopupModal>
            <ButtonLink hierarchy="transparent" href={route('dashboard')}><span className="flex items-center gap-2">
                <ChevronLeft />{"Back to Hub"}
            </span></ButtonLink>
            <SidebarLayout>
                <div></div>
                <TwoColumnLayout>
                    <div className="">
                        <Heading1Nospace>{classroom.name}</Heading1Nospace>
                        <BasicButton onClick={() => showStudentListModal()}>Add Students</BasicButton>
                    </div>
                </TwoColumnLayout>
            </SidebarLayout>
        </WrapperLayout>
    )
}