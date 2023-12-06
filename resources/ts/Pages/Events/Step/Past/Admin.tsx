import ButtonLink from "@/Components/Buttons/ButtonLink";
import DeleteDialogCard from "@/Components/Cards/DeleteDialogCard";
import { PastEventCardProps } from "@/Components/Cards/StepEventCard";
import DeleteIcon from "@/Components/Icons/DeleteIcon";
import EditIcon from "@/Components/Icons/EditIcon";
import ViewIcon from "@/Components/Icons/ViewIcon";
import AdvancedTable from "@/Components/Tables/AdvancedTable";
import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { router } from "@inertiajs/core";
import { Link } from "@inertiajs/react";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";


export default function Admin({ videoList }: { videoList: PastEventCardProps[] }) {
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

    const tableDataMemo = useMemo(() => videoList, [videoList]);

    const columnHelper = createColumnHelper<PastEventCardProps>();

    const defaultColumns = [
        columnHelper.accessor(row => row.id, {
            header: 'ID'
        }),
        columnHelper.display({
            id: 'Image',
            header: 'Thumbnail',
            cell: ({ row }) => (
                <img className="w-40" src={row.original.imageLink} alt={"Image for " + row.original.heading} />
            )
        }),
        columnHelper.accessor(row => row.heading, {
            header: 'Title',
        }),
        columnHelper.accessor(row => row.date, {
            header: 'Date',
        }),
        columnHelper.accessor(row => row.description, {
            header: 'Description',
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex w-full gap-2 py-2">
                    <Link className="text-blue-500 underline hover:no-underline" href={route('events.step.past.show', row.original.routename)}><EditIcon className="w-6 h-6" /> Edit</Link>
                    <Link className="text-blue-500 underline hover:no-underline" href={route('events.step.past.show', row.original.routename)}><ViewIcon className="w-6 h-6" /> View</Link>
                    <button className="text-blue-500 underline hover:no-underline" onClick={() => showModal(row.original.id, row.original.heading)}><DeleteIcon className="w-6 h-6" /> Delete</button>
                </div>
            )
        })
    ]

    return (
        <WrapperLayout>
            <DeleteDialogCard isOpen={toggleModal} message={`Are you sure you want to delete "${nameToDelete}?"`} onClose={handleOnClose} onSubmit={handleSubmit} hasCloseButton={true} />
            <ContentWrapper title="Step Admin" >
                <div className="flex justify-end w-full">
                    <ButtonLink className="w-44" href={route('events.step.past.create')}>Add video</ButtonLink>
                </div>

                <div className="w-full overflow-x-auto">
                    <AdvancedTable data={tableDataMemo} columns={defaultColumns} />
                </div>
            </ContentWrapper>
        </WrapperLayout>
    )
}