import Group from "@/Elements/Icons/Group";
import Heading2Alt from "@/Components/Typography/Heading2Alt";
import BasicButton from "@/Elements/Buttons/BasicButton";
import DashboardLongCard from "@/Components/Cards/DashboardLongCard";
import PopupModal from "@/Components/Modals/PopupModal";
import CreateClassroomForm from "@/Components/Forms/CreateClassroomForm";
import { modalHelper } from "@/helper";
import { router } from "@inertiajs/react";
import InformationCircle from "@/Elements/Icons/InformationCircle";
import TooltipCard from "@/Components/Cards/TooltipCard";


export default function ClassroomListSection({ classrooms = [] }: { classrooms: ClassroomProps[] }) {
    const { dialogRef, showModal, closeModal } = modalHelper();

    const handleDelete = (event: React.MouseEvent, id: number) => {
        event.preventDefault();
        event.stopPropagation();
        router.delete(route('classroom.destroy', id));
    }

    return (
        <div className="flex flex-col items-start w-full lg:max-w-4xl">
            <PopupModal innerRef={dialogRef}>
                <CreateClassroomForm onCancel={() => closeModal()} />
            </PopupModal>

            <span className="flex items-start gap-2">
                <Heading2Alt>My Classes</Heading2Alt>
                <TooltipCard id={"classroom-tip"} text={"Classrooms help segregate students into different groups that can be assigned a common curriculum."} direction={"top"}>
                    <a href="#" className="pointer-events-none" aria-describedby="classroom-tip"><InformationCircle className="w-4 h-4 text-gray-600" /></a>
                </TooltipCard>
            </span>
            <div className="grid md:w-3/4 grid-rows-[auto_1fr] gap-2 ">
                <ul data-test="classroom_list" className="flex flex-col gap-2">
                    {classrooms.length === 0 ?
                        <p className="text-gray-500 italic">No classroom found. Create a new one by clicking the button below.</p>
                        :
                        classrooms.map((classroom: ClassroomProps) =>
                            <li key={classroom.id} className="flex">
                                <DashboardLongCard
                                    Icon={Group}
                                    href={route('classroom.show', classroom.id)}
                                    title={classroom.name}
                                    onDelete={(event) => handleDelete(event, classroom.id)} />
                            </li>
                        )
                    }
                </ul>
                <div className="flex justify-end">
                    <BasicButton hierarchy="primary" type="button" dataTest="classroom_create_button" onClick={() => showModal()}>Add Classroom</BasicButton>
                </div>
            </div>
        </div>
    )
}