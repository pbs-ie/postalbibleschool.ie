import ButtonLink from "@/Elements/Buttons/ButtonLink";
import DeleteDialogCard from "@/Components/Cards/DeleteDialogCard";
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

export default function BonusAdmin({ videoList }: { videoList: VideoListMeta[] }) {
    const [toggleModal, setToggleModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState<null | number>(null);
    const [nameToDelete, setNameToDelete] = useState<null | string>(null);


    const showModal = (id: number) => {
        setIdToDelete(id);
        setToggleModal(true);
        setNameToDelete(videoList[id].monthTitle);
    }

    const handleOnClose = () => {
        setIdToDelete(null);
        setToggleModal(false);
    }

    const handleSubmit = () => {
        if (idToDelete !== null) {
            router.delete(route('assembly.bonus.destroy', idToDelete));
        } else {
            console.error('Could not find that entry. Please contact administrator');
        }
        setToggleModal(false);
    }

    const tableDataMemo = useMemo(() => videoList, [videoList]);

    const columnHelper = createColumnHelper<VideoListMeta>();

    const defaultColumns = [
        columnHelper.display({
            id: 'Image',
            header: 'Thumbnail',
            cell: ({ row }) => (
                <img className="w-40" src={row.original.imageLink} alt={"Image for " + row.original.monthTitle} />
            )
        }),
        columnHelper.accessor(row => row.monthTitle, {
            header: 'Title',
        }),

        columnHelper.accessor(row => row.routename, {
            header: 'Routename',
        }),
        columnHelper.accessor(row => row.category, {
            header: 'Category',
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex w-full gap-2 py-2">
                    <Link className="text-blue-500 underline hover:no-underline" href={route('assembly.bonus.edit', row.original.id)}><EditIcon className="w-6 h-6" /> Edit</Link>
                    <Link className="text-blue-500 underline hover:no-underline" href={route('assembly.show', row.original.routename)}><Eye className="w-6 h-6" /> View</Link>
                    <button className="text-blue-500 underline hover:no-underline" onClick={() => showModal(row.original.id)}><Trash className="w-6 h-6" /> Delete</button>
                </div>
            )
        })
    ]

    return (
        <WrapperLayout>
            <DeleteDialogCard isOpen={toggleModal} message={`Are you sure you want to delete "${nameToDelete}?"`} onClose={handleOnClose} onSubmit={handleSubmit} hasCloseButton={true} />
            <ContentWrapper title="Admin - Bonus Videos" >
                <div className="flex justify-end w-full">
                    <ButtonLink href={route('assembly.bonus.create')}>Add video</ButtonLink>
                </div>

                <div className="w-full overflow-x-auto">
                    <AdvancedTable data={tableDataMemo} columns={defaultColumns} />
                </div>
            </ContentWrapper>
        </WrapperLayout>
    )
}