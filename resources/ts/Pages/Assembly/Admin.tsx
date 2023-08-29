import GalleryAssembly from "@/Components/Gallery/GalleryAssembly";
import DeleteIcon from "@/Components/Icons/DeleteIcon";
import EditIcon from "@/Components/Icons/EditIcon";
import ViewIcon from "@/Components/Icons/ViewIcon";
import ListingTable, { TableData } from "@/Components/Tables/ListingTable";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { sortArrayById } from "@/helper";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link } from "@inertiajs/inertia-react";
import { useState } from "react";

export default function Admin({ videoList }: { videoList: VideoListMeta[] }) {
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
    
    const tableData:TableData = {
        'headings':
            <>
                <th className="w-1/12 p-4 min-w-[50px]">#</th>
                <th className="w-1/12 p-4 min-w-[50px]">ID</th>
                <th className="w-3/12 p-4 min-w-[100px]">Image</th>
                <th className="w-3/12 p-4 min-w-[100px]">Title</th>
                <th className="w-1/12 p-4 min-w-[50px]">Month</th>
                <th className="w-1/12 p-4 min-w-[50px]">Series</th>
                <th className="w-1/12 p-4 min-w-[50px]">Routename</th>
                <th className="w-1/12 p-4 min-w-[50px]">Actions</th>
            </>,
        'content':
            videoList.map((video, index) =>
                <>
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">{video.id}</td>
                    <td className="p-4">{video.imageLink}</td>
                    <td className="p-4">{video.title}</td>
                    <td className="p-4">{video.month}</td>
                    <td className="p-4">{video.series}</td>
                    <td className="p-4">{video.routename}</td>
                    <td className="flex gap-2 p-4">
                        <Link className="text-blue-500 underline hover:no-underline" href={"/orders/" + video.id + "/edit"}><EditIcon className="w-6 h-6" /> Edit</Link>
                        <Link className="text-blue-500 underline hover:no-underline" href={"/orders/" + video.id}><ViewIcon className="w-6 h-6" /> View</Link>
                        <button className="text-blue-500 underline hover:no-underline" onClick={() => showModal(video.id)}><DeleteIcon className="w-6 h-6" /> Delete</button>
                    </td >
                </>)
    }

    return (
        <WrapperLayout>
            <Head title="Admin | School Assembly" />

            <div className="w-full overflow-x-auto">
                <ListingTable tableData={tableData} />
            </div>
        </WrapperLayout>
    )
}