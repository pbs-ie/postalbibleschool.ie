import DeleteDialogCard from "@/Components/Cards/DeleteDialogCard";
import { PastEventCardProps } from "@/Components/Cards/StepEventCard";
import AdvancedTable from "@/Components/Tables/AdvancedTable";
import Heading2Alt from "@/Components/Typography/Heading2Alt";

import BasicButton from "@/Elements/Buttons/BasicButton";
import ButtonLink from "@/Elements/Buttons/ButtonLink";
import EditIcon from "@/Elements/Icons/EditIcon";
import Eye from "@/Elements/Icons/Eye";
import Trash from "@/Elements/Icons/Trash";
import IconHoverSpan from "@/Elements/Span/IconHoverSpan";

import { modalHelper, truncateString } from "@/helper";

import { router } from "@inertiajs/react";
import { createColumnHelper, ColumnDef } from "@tanstack/react-table";
import { useState, useMemo } from "react";
import route from "ziggy-js";

export default function EventManagementTable({ allEvents = [] }: { allEvents: PastEventCardProps[] }) {
    const [idToDelete, setIdToDelete] = useState<number>();
    const [nameToDelete, setNameToDelete] = useState<string>();
    const { dialogRef, showModal, closeModal } = modalHelper();


    const tableDataMemo = useMemo(() => allEvents, [allEvents]);

    const columnHelper = createColumnHelper<PastEventCardProps>();

    const defaultColumns = [
        columnHelper.accessor(row => row.id + "", {
            header: 'ID',
        }),
        columnHelper.display({
            id: 'image',
            header: 'Thumbnail',
            cell: ({ row }) => (
                <img className="w-40" src={route('images.show', row.original.imageLink)} alt={"Image for " + row.original.topic} />
            )
        }),
        columnHelper.accessor(row => row.topic, {
            header: 'Title',
        }),
        columnHelper.accessor(row => row.startDate, {
            header: 'Date',
        }),
        columnHelper.display({
            id: 'description',
            header: 'Video Description',
            cell: ({ row }) => (
                <p title={row.original.description} className="w-40 font-normal text-left whitespace-normal lg:w-80">{truncateString(row.original.description, 40)}</p>
            )
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex items-center">
                    <IconHoverSpan>
                        <ButtonLink size="xsmall" hierarchy="transparent" href={route('events.step.past.edit', row.original.id)}><EditIcon className="w-6 h-6" /> Edit</ButtonLink>
                    </IconHoverSpan>
                    <IconHoverSpan>
                        <ButtonLink size="xsmall" hierarchy="transparent" href={route('events.step.past.show', row.original.id)}><span className="flex flex-col items-center">
                            <Eye className="w-6 h-6" /> Videos
                        </span></ButtonLink>
                    </IconHoverSpan>
                    <IconHoverSpan>
                        <BasicButton dataTest={"step_past_delete_icon" + row.id} hierarchy="transparent" size="xsmall" onClick={() => {
                            setIdToDelete(row.original.id);
                            setNameToDelete(row.original.topic);
                            showModal();
                        }}><span className="flex flex-col items-center text-red-500">
                                <Trash key={row.id} />Delete
                            </span></BasicButton>
                    </IconHoverSpan>
                </div>
            )
        })
    ];

    return (
        <div className="space-y-2">
            <Heading2Alt>Event Manager</Heading2Alt>
            <hr />
            <DeleteDialogCard
                dialogRef={dialogRef}
                closeModal={closeModal}
                onSubmit={() => {
                    router.delete(route('events.step.past.destroy', idToDelete));
                    closeModal();
                }}
                title="Delete Event?"
                message="Are you sure you want to delete:"
                nameToDelete={nameToDelete}
            />
            <div className="flex justify-end w-full">
                <ButtonLink href={route('events.step.past.create')}>Add event</ButtonLink>
            </div>

            {allEvents.length === 0 ?
                <div className="w-full">No events added</div>
                :
                <div className="w-full overflow-x-auto">
                    <AdvancedTable
                        data={tableDataMemo}
                        columns={defaultColumns as ColumnDef<PastEventCardProps>[]}
                        enableGlobalFilter={false}
                    />
                </div>
            }
        </div>
    )
}