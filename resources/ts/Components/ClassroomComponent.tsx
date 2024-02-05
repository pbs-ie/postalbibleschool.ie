import Group from "@/Elements/Icons/Group";
import { useRef } from "react";
import Heading2Alt from "@/Components/Typography/Heading2Alt";
import BasicButton from "@/Elements/Buttons/BasicButton";
import DashboardLongCard from "@/Components/Cards/DashboardLongCard";
import PopupModal from "./Modals/PopupModal";
import CreateClassroomForm from "./Forms/CreateClassroomForm";


export default function ClassroomComponent({ classrooms }: { classrooms: ClassroomProps[] }) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const showModal = () => {
        dialogRef.current?.showModal();
    }
    const closeModal = () => {
        dialogRef.current?.close();
    }

    return (
        <div className="flex flex-col items-start w-full">
            <PopupModal innerRef={dialogRef}>
                <CreateClassroomForm onCancel={() => closeModal()} />
            </PopupModal>

            <Heading2Alt>My Classes</Heading2Alt>
            <div className="grid md:w-3/4 grid-rows-[auto_1fr] self-center gap-2 lg:px-10">
                <ul data-test="classroom_list" className="flex flex-col gap-2">
                    {
                        classrooms.map((classroom: any) =>
                            <li key={classroom.id} className="flex"><DashboardLongCard Icon={Group} href={route('classroom.show', classroom.id)} title={classroom.name} /></li>
                        )
                    }
                </ul>
                <div className="flex justify-end">
                    <BasicButton hierarchy="primary" type="button" dataTest="classroom_create_button" onClick={() => showModal()}>Add Class</BasicButton>
                </div>
            </div>
        </div>
    )
}