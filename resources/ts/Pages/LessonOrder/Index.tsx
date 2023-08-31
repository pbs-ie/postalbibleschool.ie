import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import DeleteIcon from "@/Components/Icons/DeleteIcon";
import EditIcon from "@/Components/Icons/EditIcon";
import ViewIcon from "@/Components/Icons/ViewIcon";
import ModalComponent from "@/Components/ModalComponent";
import ListingTable, { TableData } from "@/Components/Tables/ListingTable";
import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import { useState } from "react";

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
            Inertia.delete(route('orders.destroy', idToDelete));
        } else {
            console.error('Could not find that entry. Please contact administrator');
        }
        setToggleModal(false);
    }

    const tableData: TableData = {
        'headings':
            <>
                <th className="w-1/12 p-4 min-w-[50px]">#</th>
                <th className="w-3/12 p-4 min-w-[100px]">School Name</th>
                <th className="w-1/12 p-4 min-w-[50px] text-white bg-bibletime-pink">Level 0</th>
                <th className="w-1/12 p-4 min-w-[50px] text-white bg-bibletime-orange">Level 1</th>
                <th className="w-1/12 p-4 min-w-[50px] text-white bg-bibletime-red">Level 2</th>
                <th className="w-1/12 p-4 min-w-[50px] text-white bg-bibletime-green">Level 3</th>
                <th className="w-1/12 p-4 min-w-[50px] text-white bg-bibletime-blue">Level 4</th>
                <th className="w-1/12 p-4 min-w-[50px]">TLP </th>
                <th className="w-1/12 p-4 min-w-[50px]"></th>
            </>,
        'content':
            lessonOrders.map((order, index) =>
                <>
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">{order.schoolName}</td>
                    <td className="p-4">{order.level0Order}</td>
                    <td className="p-4">{order.level1Order}</td>
                    <td className="p-4">{order.level2Order}</td>
                    <td className="p-4">{order.level3Order}</td>
                    <td className="p-4">{order.level4Order}</td>
                    <td className="p-4">{order.tlpOrder}</td>
                    <td className="flex gap-2 p-4">
                        <Link className="text-blue-500 underline hover:no-underline" href={"/orders/" + order.id + "/edit"}><EditIcon className="w-6 h-6" /> Edit</Link>
                        <Link className="text-blue-500 underline hover:no-underline" href={"/orders/" + order.id}><ViewIcon className="w-6 h-6" /> View</Link>
                        <button className="text-blue-500 underline hover:no-underline" onClick={() => showModal(order.id)}><DeleteIcon className="w-6 h-6" /> Delete</button>
                    </td >
                </>)
    }

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
                    <div className="w-full overflow-x-auto">
                        <ListingTable tableData={tableData} />
                    </div>
                </div>
            </ContentWrapper>
        </WrapperLayout>
    )
}