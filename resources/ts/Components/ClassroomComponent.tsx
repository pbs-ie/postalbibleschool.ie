import Group from "@/Elements/Icons/Group";
import Heading2Alt from "@/Components/Typography/Heading2Alt";
import BasicButton from "@/Elements/Buttons/BasicButton";
import DashboardLongCard from "@/Components/Cards/DashboardLongCard";
import PopupModal from "./Modals/PopupModal";
import CreateClassroomForm from "@/Components/Forms/CreateClassroomForm";
import { modalHelper } from "@/helper";
import { router } from "@inertiajs/react";
import ResourceCard from "@/Components/Cards/ResourceCard";
import Calendar from "@/Elements/Icons/Calendar";


export default function ClassroomComponent({ classrooms, canViewCurriculum = false }: { classrooms: ClassroomProps[], canViewCurriculum?: boolean }) {
    const { dialogRef, showModal, closeModal } = modalHelper();

    const handleDelete = (event: React.MouseEvent, id: number) => {
        event.preventDefault();
        event.stopPropagation();
        router.delete(route('classroom.destroy', id));
    }

    return (
        <div className="flex flex-col items-start w-full lg:max-w-4xl mx-auto">
            <PopupModal innerRef={dialogRef}>
                <CreateClassroomForm onCancel={() => closeModal()} />
            </PopupModal>

            <div className="flex flex-wrap gap-2 mx-auto">
                <ResourceCard Icon={Calendar} href={route('orders.index')} title="My Monthly Orders" />
                {canViewCurriculum &&
                    <ResourceCard Icon={Group} href={route('curriculum.index')} title="Curriculum" />
                }
            </div>
            <Heading2Alt>My Classes</Heading2Alt>
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