import PopupModal from "@/Components/Modals/PopupModal";
import AdvancedTable from "@/Components/Tables/AdvancedTable";
import Heading1Nospace from "@/Components/Typography/Heading1Nospace";
import Heading2Nospace from "@/Components/Typography/Heading2Nospace";
import BasicButton from "@/Elements/Buttons/BasicButton";
import ButtonLink from "@/Elements/Buttons/ButtonLink";
import SecondaryButton from "@/Elements/Buttons/SecondaryButton";
import ChevronLeft from "@/Elements/Icons/ChevronLeft";
import EditIcon from "@/Elements/Icons/EditIcon";
import PlusSolid from "@/Elements/Icons/PlusSolid";
import RefreshIcon from "@/Elements/Icons/RefreshIcon";
import Trash from "@/Elements/Icons/Trash";
import IconHoverSpan from "@/Elements/Span/IconHoverSpan";
import SidebarLayout from "@/Layouts/SidebarLayout";
import TwoColumnLayout from "@/Layouts/TwoColumnLayout";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { modalHelper } from "@/helper";
import { router } from "@inertiajs/react";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import route from "ziggy-js";


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
                        <IconHoverSpan>
                            <ButtonLink dataTest="edit_icon" hierarchy="transparent" size="xsmall" href={route("curriculum.edit", row.original.id)}><EditIcon className="w-6 h-6" key={row.id} /></ButtonLink>
                        </IconHoverSpan>
                        <IconHoverSpan>
                            <BasicButton dataTest="delete_icon" onClick={() => {
                                setIdToDelete(row.original.id);
                                setNameToDelete(row.original.name);
                                showModal();
                            }} hierarchy="transparent" size="xsmall"><Trash className="w-6 h-6 text-red-500" key={row.id} /></BasicButton>
                        </IconHoverSpan>
                    </div>
                )
            }
        })
    ];
    return (
        <WrapperLayout>
            <PopupModal innerRef={dialogRef} onClose={closeModal}>
                <article className="flex flex-col max-w-screen-sm gap-4 lg:max-w-screen-lg">
                    <Heading2Nospace>Delete Curriculum?</Heading2Nospace>
                    <p>Are you sure you want to delete the curriculum :</p>
                    <p className="font-bold">{nameToDelete}</p>
                    <div className="flex justify-end w-full gap-2">
                        <SecondaryButton onClick={() => closeModal()}>Cancel</SecondaryButton>
                        <BasicButton dataTest="confirm_delete_btn" hierarchy="delete" onClick={() => {
                            router.delete(route('curriculum.destroy', idToDelete + ""));
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
                <div className="mx-10 lg:max-w-5xl">
                    <div className="flex justify-between">
                        <Heading1Nospace>Manage Curricula</Heading1Nospace>
                        <div className="flex gap-2">

                            <ButtonLink size="small" Icon={PlusSolid} dataTest="create_curriculum_btn" href={route('curriculum.create')} >Create Curriculum</ButtonLink>
                            <ButtonLink size="small" href={route('curriculum.sync')}><span className="flex items-center gap-3">Update Filemaker <RefreshIcon /></span></ButtonLink>
                        </div>

                    </div>
                    {tableDataMemo && tableDataMemo.length > 0 ?
                        <div className="m-5 overflow-auto">
                            <AdvancedTable
                                data={tableDataMemo}
                                columns={defaultColumns}
                                enableGlobalFilter={true}
                            />
                        </div>
                        :
                        <p className="text-gray-700">No curricula created</p>
                    }

                </div>
            </SidebarLayout>
        </WrapperLayout>
    )
}