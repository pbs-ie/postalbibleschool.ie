import ButtonLink from "@/Elements/Buttons/ButtonLink";
import Trash from "@/Elements/Icons/Trash";
import EditIcon from "@/Elements/Icons/EditIcon";
import Eye from "@/Elements/Icons/Eye";
import AdvancedTable from "@/Components/Tables/AdvancedTable";
import { router } from "@inertiajs/core";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import BonusAssemblyWrapper from "@/Layouts/BonusAssemblyWrapper";
import { modalHelper, truncateString } from "@/helper";
import BasicButton from "@/Elements/Buttons/BasicButton";
import IconHoverSpan from "@/Elements/Span/IconHoverSpan";
import DeleteDialogCard from "@/Components/Cards/DeleteDialogCard";
import route from "ziggy-js";
import { BonusVideoProps } from "./Index";

export default function BonusAdmin({ videoList }: { videoList: BonusVideoProps[] }) {
    const [idToDelete, setIdToDelete] = useState<number>();
    const [nameToDelete, setNameToDelete] = useState<string>();
    const { dialogRef, showModal, closeModal } = modalHelper();

    const tableDataMemo = useMemo(() => videoList, [videoList]);

    const columnHelper = createColumnHelper<BonusVideoProps>();

    const defaultColumns = [
        columnHelper.display({
            id: 'Image',
            header: 'Thumbnail',
            cell: ({ row }) => (
                <img className="w-40" src={route('images.show', row.original.imageLink)} alt={"Thumbnail for " + row.original.title} />
            )
        }),
        columnHelper.accessor(row => row.title, {
            header: 'Title',
        }),

        columnHelper.accessor(row => row.videoTitle, {
            header: 'Video title',
        }),
        columnHelper.accessor(row => row.category, {
            header: 'Category',
        }),
        columnHelper.display({
            id: 'externalUrl',
            header: 'External Url',
            cell: ({ row }) => (
                <p title={row.original.externalUrl} className="w-40 font-normal whitespace-normal lg:w-80 overflow-clip">{truncateString(row.original.externalUrl, 40)}</p>
            )
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex items-center">
                    <IconHoverSpan>
                        <ButtonLink dataTest="bonus_assembly_edit_icon" size="xsmall" hierarchy="transparent" href={route('assembly.bonus.edit', row.original.id)}><EditIcon className="w-6 h-6" /> Edit</ButtonLink>
                    </IconHoverSpan>
                    <IconHoverSpan>
                        <ButtonLink dataTest="bonus_assembly_view_icon" size="xsmall" hierarchy="transparent" href={route('assembly.bonus.show', row.original.id)}><Eye className="w-6 h-6" /> View</ButtonLink>
                    </IconHoverSpan>
                    <IconHoverSpan>
                        <BasicButton dataTest={"bonus_video_delete_icon"} hierarchy="transparent" size="xsmall" onClick={() => {
                            setIdToDelete(row.original.id);
                            setNameToDelete(row.original.title);
                            showModal();
                        }}><span className="flex flex-col items-center text-red-500">
                                <Trash key={row.id} />Delete
                            </span></BasicButton>
                    </IconHoverSpan>
                </div>
            )
        })
    ]

    return (
        <BonusAssemblyWrapper title={"Admin - Bonus Videos"} navBackText={"Go to Gallery"} navBackRoute={route('assembly.bonus.index')} >
            <DeleteDialogCard
                dialogRef={dialogRef}
                closeModal={closeModal}
                onSubmit={() => {
                    router.delete(route('assembly.bonus.destroy', idToDelete));
                    closeModal();
                }}
                title="Delete Bonus Video?"
                message="Are you sure you want to delete this video:"
                nameToDelete={nameToDelete}
            />
            <div className="flex justify-end w-full">
                <ButtonLink dataTest="add_new_bonus_button" href={route('assembly.bonus.create')}>Add video</ButtonLink>
            </div>

            <div className="w-full overflow-x-auto">
                <AdvancedTable data={tableDataMemo} columns={defaultColumns} />
            </div>
        </BonusAssemblyWrapper>
    )
}