import Heading2Alt from "@/Components/Typography/Heading2Alt";
import BasicButton from "@/Elements/Buttons/BasicButton";
import PopupModal from "@/Components/Modals/PopupModal";
import CreateClassroomForm from "@/Components/Forms/CreateClassroomForm";
import { modalHelper } from "@/helper";
import { router } from "@inertiajs/react";
import InformationCircle from "@/Elements/Icons/InformationCircle";
import TooltipCard from "@/Components/Cards/TooltipCard";
import ButtonLink from "@/Elements/Buttons/ButtonLink";
import EditIcon from "@/Elements/Icons/EditIcon";
import Trash from "@/Elements/Icons/Trash";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import SecondaryButton from "@/Elements/Buttons/SecondaryButton";
import Heading2Nospace from "@/Components/Typography/Heading2Nospace";
import AdvancedTable from "@/Components/Tables/AdvancedTable";


export default function ClassroomListSection({ classrooms = [] }: { classrooms: ClassroomProps[] }) {
    const [idToDelete, setIdToDelete] = useState<Number>();
    const [nameToDelete, setNameToDelete] = useState<string>();
    const { dialogRef: dialogRefCreate, showModal: showCreateModal, closeModal: closeCreateModal } = modalHelper();
    const { dialogRef: dialogRefDelete, showModal: showDeleteModal, closeModal: closeDeleteModal } = modalHelper();

    const tableDataMemo = useMemo(() => classrooms, [classrooms]);
    const columnHelper = createColumnHelper<ClassroomProps>();

    const defaultColumns = [
        columnHelper.display({
            id: 'select-col',
            header: () => (
                <p>No.</p>
            ),
            cell: ({ row }) => (
                <div className="flex items-center">
                    {Number(row.id) + 1}
                </div>
            ),
        }),
        columnHelper.accessor(row => row.name, {
            header: "Name",
            enableColumnFilter: false
        }),
        columnHelper.accessor(row => row.curriculum_name, {
            header: "Curriculum",
            enableColumnFilter: false
        }),
        columnHelper.accessor(row => row.level_0_order + "", {
            header: "Level 0",
            enableColumnFilter: false
        }),
        columnHelper.accessor(row => row.level_1_order + "", {
            header: "Level 1",
            enableColumnFilter: false
        }),
        columnHelper.accessor(row => row.level_2_order + "", {
            header: "Level 2",
            enableColumnFilter: false
        }),
        columnHelper.accessor(row => row.level_3_order + "", {
            header: "Level 3",
            enableColumnFilter: false
        }),
        columnHelper.accessor(row => row.level_4_order + "", {
            header: "Level 4",
            enableColumnFilter: false
        }),
        columnHelper.accessor(row => row.tlp_order + "", {
            header: "TLP",
            enableColumnFilter: false
        }),
        columnHelper.display({
            id: 'actions',
            header: () => "Actions",
            cell: ({ row }) => {
                return (
                    <div className="flex items-center">
                        <ButtonLink dataTest="edit_icon" hierarchy="transparent" size="xsmall" href={route("classroom.show", row.original.id)}><EditIcon className="w-6 h-6" key={row.id} /></ButtonLink>
                        <BasicButton dataTest="delete_icon" onClick={() => {
                            setIdToDelete(row.original.id);
                            setNameToDelete(row.original.name);
                            showDeleteModal();
                        }} hierarchy="delete" size="xsmall"><Trash key={row.id} /></BasicButton>
                    </div>
                )
            }
        })
    ];

    const handleDelete = (event: React.MouseEvent, id: number) => {
        event.preventDefault();
        event.stopPropagation();
        router.delete(route('classroom.destroy', id));
    }

    return (
        <div className="flex flex-col items-start w-full lg:max-w-4xl">
            <PopupModal innerRef={dialogRefCreate}>
                <CreateClassroomForm onCancel={() => closeCreateModal()} />
            </PopupModal>

            <PopupModal innerRef={dialogRefDelete} onClose={closeDeleteModal}>
                <article className="flex flex-col gap-4 lg:max-w-screen-lg max-w-screen-sm">
                    <Heading2Nospace>Delete Classroom?</Heading2Nospace>
                    <p>Are you sure you want to delete the classroom :</p>
                    <p className="font-bold">{nameToDelete}</p>
                    <div className="w-full flex justify-end gap-2">
                        <SecondaryButton onClick={() => closeDeleteModal()}>Cancel</SecondaryButton>
                        <BasicButton dataTest="confirm_delete_btn" hierarchy="delete" onClick={() => {
                            router.delete(route('curriculum.destroy', idToDelete));
                            closeDeleteModal();
                        }}>Delete</BasicButton>
                    </div>
                </article>
            </PopupModal>

            <span className="flex items-start gap-2">
                <Heading2Alt>My Classes</Heading2Alt>
                <TooltipCard id={"classroom-tip"} text={"Classrooms help segregate students into different groups that can be assigned a common curriculum."} direction={"top"}>
                    <a href="#" className="pointer-events-none" aria-describedby="classroom-tip"><InformationCircle className="w-4 h-4 text-gray-600" /></a>
                </TooltipCard>
            </span>
            <div className="grid w-full grid-rows-[auto_1fr] gap-2 ">
                <ul data-test="classroom_list" className="flex flex-col gap-2">
                    {classrooms.length === 0 ?
                        <p className="text-gray-500 italic">No classroom found. Create a new one by clicking the button below.</p>
                        :
                        <AdvancedTable
                            data={tableDataMemo}
                            columns={defaultColumns}
                            enableGlobalFilter={false}
                            enableSorting={false}
                        />
                    }
                </ul>
                <div className="flex justify-end">
                    <BasicButton hierarchy="primary" type="button" dataTest="classroom_create_button" onClick={() => showCreateModal()}>Add Classroom</BasicButton>
                </div>
            </div>
        </div>
    )
}