import ButtonLink from "@/Elements/Buttons/ButtonLink";
import DeleteDialogCard from "@/Components/Cards/DeleteDialogCard";
import { PastEventCardProps } from "@/Components/Cards/StepEventCard";
import Trash from "@/Elements/Icons/Trash";
import EditIcon from "@/Elements/Icons/EditIcon";
import Eye from "@/Elements/Icons/Eye";
import AdvancedTable from "@/Components/Tables/AdvancedTable";
import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { router } from "@inertiajs/core";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import Heading2 from "@/Components/Typography/Heading2";
import { modalHelper, truncateString } from "@/helper";
import BasicButton from "@/Elements/Buttons/BasicButton";
import IconHoverSpan from "@/Elements/Span/IconHoverSpan";
import route from "ziggy-js";


export default function Admin({ pastEvents = [] }: { pastEvents: PastEventCardProps[] }) {
    const [idToDelete, setIdToDelete] = useState<number>();
    const [nameToDelete, setNameToDelete] = useState<string>();
    const { dialogRef, showModal, closeModal } = modalHelper();


    const tableDataMemo = useMemo(() => pastEvents, [pastEvents]);

    const columnHelper = createColumnHelper<PastEventCardProps>();

    const defaultColumns = [
        columnHelper.accessor(row => row.id + "", {
            header: 'ID',
        }),
        columnHelper.display({
            id: 'image',
            header: 'Thumbnail',
            cell: ({ row }) => (
                <img className="w-40" src={route('images.show', row.original.imageLink)} alt={"Image for " + row.original.title} />
            )
        }),
        columnHelper.accessor(row => row.title, {
            header: 'Title',
        }),
        columnHelper.accessor(row => row.date, {
            header: 'Date',
        }),
        columnHelper.display({
            id: 'description',
            header: 'Description',
            cell: ({ row }) => (
                <p title={row.original.description} className="w-40 font-normal whitespace-normal lg:w-80">{truncateString(row.original.description, 40)}</p>
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
                        <ButtonLink size="xsmall" hierarchy="transparent" href={route('events.step.past.show', row.original.id)}><Eye className="w-6 h-6" /> View</ButtonLink>
                    </IconHoverSpan>
                    <IconHoverSpan>
                        <BasicButton dataTest={"step_past_delete_icon" + row.id} hierarchy="transparent" size="xsmall" onClick={() => {
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
    ];

    return (
        <WrapperLayout>
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
            <ContentWrapper title="Step Management" >
                <Heading2>Past Events</Heading2>
                <div className="flex justify-end w-full">
                    <ButtonLink href={route('events.step.past.create')}>Add video</ButtonLink>
                </div>

                {pastEvents.length === 0 ?
                    <div className="w-full">No videos added</div>
                    :
                    <div className="w-full overflow-x-auto">
                        <AdvancedTable data={tableDataMemo} columns={defaultColumns} />
                    </div>
                }
            </ContentWrapper>
        </WrapperLayout>
    )
}