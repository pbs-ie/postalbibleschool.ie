import Group from "@/Elements/Icons/Group";
import ResourceCard from "@/Components/Cards/ResourceCard";
import CreateDialogCard from "@/Components/Cards/CreateDialogCard";
import { useRef } from "react";
import Heading2Alt from "./Typography/Heading2Alt";
import BasicButton from "@/Elements/Buttons/BasicButton";


export default function ClassroomComponent({ classrooms }: { classrooms: ClassroomProps[] }) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const showModal = () => {
        dialogRef.current?.showModal();
    }

    return (
        <div className="flex flex-col items-start w-full">
            <CreateDialogCard innerRef={dialogRef} />

            <Heading2Alt>My Classes</Heading2Alt>
            <div className="grid grid-rows-[auto_1fr] gap-2 lg:px-10">
                <ul data-test="classroom_list" className="flex flex-wrap gap-2">
                    {
                        classrooms.map((classroom: any) =>
                            <li key={classroom.id} className="flex"><ResourceCard Icon={Group} href={route('classroom.show', classroom.id)} title={classroom.name} /></li>
                        )
                    }
                </ul>
                <div className="flex justify-end">
                    <BasicButton hierarchy="primary" type="button" dataTest="classroom_create_button" onClick={() => showModal()}>Create Class</BasicButton>
                </div>
            </div>
        </div>
    )
}