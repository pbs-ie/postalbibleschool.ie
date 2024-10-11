import route from "ziggy-js";
import { router } from "@inertiajs/core";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";

import ButtonLink from "@/Elements/Buttons/ButtonLink";
import Trash from "@/Elements/Icons/Trash";
import EditIcon from "@/Elements/Icons/EditIcon";
import Eye from "@/Elements/Icons/Eye";
import IconHoverSpan from "@/Elements/Span/IconHoverSpan";
import BasicButton from "@/Elements/Buttons/BasicButton";

import DeleteDialogCard from "@/Components/Cards/DeleteDialogCard";
import AdvancedTable from "@/Components/Tables/AdvancedTable";

import { AssemblyVideoProps } from "@/Pages/Assembly/Index";

import SettingSidebarWithNavbackLayout from "@/Layouts/SettingsSidebarWithNavbackLayout";

import { modalHelper } from "@/helper";

export default function Admin({ videoList }: { videoList: AssemblyVideoProps[] }) {
    const [idToDelete, setIdToDelete] = useState<number>();
    const [nameToDelete, setNameToDelete] = useState<string>();
    const { dialogRef, showModal, closeModal } = modalHelper();


    const tableDataMemo = useMemo(() => videoList, [videoList]);

    const columnHelper = createColumnHelper<AssemblyVideoProps>();

    const defaultColumns = [
        columnHelper.display({
            id: 'Image',
            header: 'Thumbnail',
            cell: ({ row }) => (
                <img className="w-40" src={route('images.show', row.original.imageLink)} alt={"Image for " + row.original.title} />
            )
        }),
        columnHelper.accessor(row => row.title, {
            header: 'Title',
        }),
        columnHelper.accessor(row => row.month, {
            header: 'Month',
        }),
        columnHelper.accessor(row => row.series, {
            header: 'Series',
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex items-center">
                    <IconHoverSpan>
                        <ButtonLink size="xsmall" hierarchy="transparent" href={route('assembly.edit', +row.original.id)}><EditIcon className="w-6 h-6" /> Edit</ButtonLink>
                    </IconHoverSpan>
                    <IconHoverSpan>
                        <ButtonLink size="xsmall" hierarchy="transparent" href={route('assembly.show', +row.original.id)}><Eye className="w-6 h-6" /> View</ButtonLink>
                    </IconHoverSpan>
                    <IconHoverSpan>
                        <BasicButton dataTest={"assembly_delete_icon" + row.id} hierarchy="transparent" size="xsmall" onClick={() => {
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
        <SettingSidebarWithNavbackLayout title="Admin" navBackText="Go to Assembly Gallery" navBackRoute={route("assembly.index")}>
            <DeleteDialogCard
                dialogRef={dialogRef}
                closeModal={closeModal}
                onSubmit={() => {
                    router.delete(route('assembly.destroy', idToDelete));
                    closeModal();
                }}
                title="Delete Assembly?"
                message="Are you sure you want to delete this event:"
                nameToDelete={nameToDelete}
            />
            <div className="flex justify-end w-full">
                <ButtonLink href={route('assembly.create')}>Add video</ButtonLink>
            </div>

            <div className="w-full overflow-x-auto">
                <AdvancedTable data={tableDataMemo} columns={defaultColumns as ColumnDef<AssemblyVideoProps>[]} />
            </div>
        </SettingSidebarWithNavbackLayout>
    )
}