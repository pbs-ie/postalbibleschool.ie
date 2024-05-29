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
import { Link } from "@inertiajs/react";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import Heading2 from "@/Components/Typography/Heading2";
import { truncateString } from "@/helper";


export default function Admin({ pastEvents = [] }: { pastEvents: PastEventCardProps[] }) {
    const [toggleModal, setToggleModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState<null | number>(null);
    const [nameToDelete, setNameToDelete] = useState<null | string>(null);


    const showModal = (id: number, heading: string) => {
        setIdToDelete(id);
        setNameToDelete(heading);
        setToggleModal(true);
    }

    const handleOnClose = () => {
        setIdToDelete(null);
        setToggleModal(false);
    }

    const handleSubmit = () => {
        if (idToDelete) {
            router.delete(route('events.step.past.destroy', idToDelete));
        } else {
            console.error('Could not find that entry. Please contact administrator');
        }
        setToggleModal(false);
    }

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
                <p title={row.original.description} className="font-normal whitespace-normal w-40 lg:w-80">{truncateString(row.original.description, 40)}</p>
            )
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex w-full gap-2 py-2">
                    <Link className="text-blue-500 underline hover:no-underline" href={route('events.step.past.edit', row.original.id)}><EditIcon className="w-6 h-6" /> Edit</Link>
                    <Link className="text-blue-500 underline hover:no-underline" href={route('events.step.past.show', row.original.id)}><Eye className="w-6 h-6" /> View</Link>
                    <button className="text-blue-500 underline hover:no-underline" onClick={() => showModal(row.original.id, row.original.title)}><Trash className="w-6 h-6" /> Delete</button>
                </div>
            )
        })
    ];

    return (
        <WrapperLayout>
            <DeleteDialogCard isOpen={toggleModal} message={`Are you sure you want to delete "${nameToDelete}?"`} onClose={handleOnClose} onSubmit={handleSubmit} hasCloseButton={true} />
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