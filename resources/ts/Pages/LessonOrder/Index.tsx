import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import DeleteIcon from "@/Components/Icons/DeleteIcon";
import EditIcon from "@/Components/Icons/EditIcon";
import ViewIcon from "@/Components/Icons/ViewIcon";
import ModalComponent from "@/Components/ModalComponent";
import AdvancedTable from "@/Components/Tables/AdvancedTable";
import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { router } from "@inertiajs/core";
import { Link } from "@inertiajs/react";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";

export default function Index({ lessonOrders }: { lessonOrders: LessonOrder[] }) {
    const [toggleModal, setToggleModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState<null | number>(null);

    const showModal = (id: number) => {
        setIdToDelete(id);
        setToggleModal(true);
    }

    const handleOnClose = () => {
        setIdToDelete(null);
        setToggleModal(false);
    }

    const handleSubmit = () => {
        if (idToDelete) {
            router.delete(route('orders.destroy', idToDelete));
        } else {
            console.error('Could not find that entry. Please contact administrator');
        }
        setToggleModal(false);
    }

    const tableDataMemo = useMemo(() => lessonOrders, []);


    const columnHelper = createColumnHelper<LessonOrder>();

    const defaultColumns = [
        columnHelper.accessor(row => row.schoolName, {
            header: 'School Name',
            minSize: 100
        }),
        columnHelper.accessor(row => row.level0Order, {
            id: 'level0Order',
            header: () => <span className="p-2 text-white bg-bibletime-pink">Level 0</span>,
        }),
        columnHelper.accessor(row => row.level1Order, {
            id: 'level1Order',
            header: () => <span className="p-2 text-white bg-bibletime-orange">Level 1</span>,
        }),
        columnHelper.accessor(row => row.level2Order, {
            id: 'level2Order',
            header: () => <span className="p-2 text-white bg-bibletime-red">Level 2</span>,
        }),
        columnHelper.accessor(row => row.level3Order, {
            id: 'level3Order',
            header: () => <span className="p-2 text-white bg-bibletime-green">Level 3</span>,
        }),
        columnHelper.accessor(row => row.level4Order, {
            id: 'level4Order',
            header: () => <span className="p-2 text-white bg-bibletime-blue">Level 4</span>,
        }),
        columnHelper.accessor(row => row.tlpOrder, {
            header: 'TLP',
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex w-full gap-2 py-2">
                    <Link className="text-blue-500 underline hover:no-underline" href={"/orders/" + row.id + "/edit"}><EditIcon className="w-6 h-6" /> Edit</Link>
                    <Link className="text-blue-500 underline hover:no-underline" href={"/orders/" + row.id}><ViewIcon className="w-6 h-6" /> View</Link>
                    <button className="text-blue-500 underline hover:no-underline" onClick={() => showModal(+row.id)}><DeleteIcon className="w-6 h-6" /> Delete</button>
                </div>
            )
        })
    ];




    return (
        <WrapperLayout>
            {toggleModal &&
                <ModalComponent message="Are you sure you want to delete this school?" handleOnClose={handleOnClose} handleSubmit={handleSubmit} />
            }
            <ContentWrapper title="Monthly Lesson Order">
                <div className="flex flex-col items-start gap-4 px-2 py-5 border md:px-10">
                    <div className="flex justify-between w-full mb-2">
                        <h2 className="p-0 text-xl font-bold text-black">View Schools</h2>
                        <Link href={"/orders/create"}><PrimaryButton className="w-52">Add school</PrimaryButton></Link>

                    </div>
                    <AdvancedTable data={tableDataMemo} columns={defaultColumns} />

                </div>
            </ContentWrapper>
        </WrapperLayout>
    )
}