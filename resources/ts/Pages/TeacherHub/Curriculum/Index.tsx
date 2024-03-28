import PopupModal from "@/Components/Modals/PopupModal";
import AdvancedTable from "@/Components/Tables/AdvancedTable";
import Heading1Nospace from "@/Components/Typography/Heading1Nospace";
import Heading2Nospace from "@/Components/Typography/Heading2Nospace";
import BasicButton from "@/Elements/Buttons/BasicButton";
import ButtonLink from "@/Elements/Buttons/ButtonLink";
import PrimaryButton from "@/Elements/Buttons/PrimaryButton";
import SecondaryButton from "@/Elements/Buttons/SecondaryButton";
import ChevronLeft from "@/Elements/Icons/ChevronLeft";
import EditIcon from "@/Elements/Icons/EditIcon";
import PlusSolid from "@/Elements/Icons/PlusSolid";
import Trash from "@/Elements/Icons/Trash";
import SidebarLayout from "@/Layouts/SidebarLayout";
import TwoColumnLayout from "@/Layouts/TwoColumnLayout";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { modalHelper } from "@/helper";
import { router } from "@inertiajs/react";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";

export interface CurriculumProps {
    name: string,
    email: string,
    jan_lesson?: "paper" | "digital",
    feb_lesson?: "paper" | "digital",
    mar_lesson?: "paper" | "digital",
    apr_lesson?: "paper" | "digital",
    may_lesson?: "paper" | "digital",
    jun_lesson?: "paper" | "digital",
    sep_lesson?: "paper" | "digital",
    oct_lesson?: "paper" | "digital",
    nov_lesson?: "paper" | "digital",
    dec_lesson?: "paper" | "digital",
    curriculum_type: "paper" | "digital",
    digital_count: number,
    id: number
}

export default function Index({ curriculumList }: { curriculumList?: CurriculumProps[] }) {
    const { dialogRef, showModal, closeModal } = modalHelper();
    const [idToDelete, setIdToDelete] = useState<Number>();
    const [nameToDelete, setNameToDelete] = useState<string>();
    const tableDataMemo = useMemo(() => curriculumList, [curriculumList]);

    const columnHelper = createColumnHelper<CurriculumProps>();

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
            header: "Name"
        }),
        columnHelper.accessor(row => row.email, {
            header: "Email"
        }),
        columnHelper.accessor(row => row.curriculum_type, {
            header: "Curriculum Type"
        }),
        columnHelper.accessor(row => row.digital_count + "", {
            header: "Digital Months"
        }),
        columnHelper.display({
            id: 'actions',
            header: () => "Actions",
            cell: ({ row }) => {
                return (
                    <div className="flex items-center">
                        <ButtonLink dataTest="edit_icon" hierarchy="transparent" size="xsmall" href={route("curriculum.edit", row.original.id)}><EditIcon className="w-6 h-6" key={row.id} /></ButtonLink>
                        <BasicButton dataTest="delete_icon" onClick={() => {
                            setIdToDelete(row.original.id);
                            setNameToDelete(row.original.name);
                            showModal();
                        }} hierarchy="delete" size="xsmall"><Trash key={row.id} /></BasicButton>
                    </div>
                )
            }
        })
    ];
    return (
        <WrapperLayout>
            <PopupModal innerRef={dialogRef} onClose={closeModal}>
                <article className="flex flex-col gap-4 lg:max-w-screen-lg max-w-screen-sm">
                    <Heading2Nospace>Delete Curriculum?</Heading2Nospace>
                    <p>Are you sure you want to delete the curriculum :</p>
                    <p className="font-bold">{nameToDelete}</p>
                    <div className="w-full flex justify-end gap-2">
                        <SecondaryButton onClick={() => closeModal()}>Cancel</SecondaryButton>
                        <BasicButton dataTest="confirm_delete_btn" hierarchy="delete" onClick={() => {
                            router.delete(route('curriculum.destroy', idToDelete));
                            closeModal();
                        }}>Delete</BasicButton>
                    </div>
                </article>
            </PopupModal>
            <ButtonLink hierarchy="transparent" href={route('dashboard')}><span className="flex items-center gap-2">
                <ChevronLeft />{"Back to Hub"}
            </span></ButtonLink>
            <SidebarLayout>
                <div></div>
                <TwoColumnLayout>
                    <div className="mx-10">
                        <div className="flex justify-between">
                            <Heading1Nospace>Manage Curricula</Heading1Nospace>
                            <div>

                                <ButtonLink Icon={PlusSolid} dataTest="create_curriculum_btn" href={route('curriculum.create')} >Create New Curriculum</ButtonLink>
                            </div>

                        </div>
                        {tableDataMemo && tableDataMemo.length > 0 ?
                            <div className="m-5 overflow-auto lg:max-w-5xl">
                                <AdvancedTable
                                    data={tableDataMemo}
                                    columns={defaultColumns}
                                    enableGlobalFilter={true}
                                />
                            </div>
                            :
                            <p>No curricula created</p>
                        }

                    </div>
                </TwoColumnLayout>
            </SidebarLayout>
        </WrapperLayout>
    )
}