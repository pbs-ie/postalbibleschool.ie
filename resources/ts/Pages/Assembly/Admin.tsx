import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import GalleryAssembly from "@/Components/Gallery/GalleryAssembly";
import DeleteIcon from "@/Components/Icons/DeleteIcon";
import EditIcon from "@/Components/Icons/EditIcon";
import ViewIcon from "@/Components/Icons/ViewIcon";
import ModalComponent from "@/Components/ModalComponent";
import ListingTable, { TableData } from "@/Components/Tables/ListingTable";
import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { sortArrayById } from "@/helper";
import { router } from "@inertiajs/core";
import { Head, Link } from "@inertiajs/react";
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
            router.delete(route('assembly.destroy', idToDelete));
        } else {
            console.error('Could not find that entry. Please contact administrator');
        }
        setToggleModal(false);
    }

    const tableData: TableData = {
        'headings':
            <>
                <th className="w-1/12 p-4 min-w-[50px]">#</th>
                <th className="w-3/12 p-4 min-w-[80px]">Image</th>
                <th className="w-2/12 p-4 min-w-[80px]">Title</th>
                <th className="w-1/12 p-4 min-w-[50px]">Month</th>
                <th className="w-1/12 p-4 min-w-[50px]">Series</th>
                <th className="w-1/12 p-4 min-w-[50px]">Routename</th>
                <th className="w-1/12 p-4 min-w-[50px]">Actions</th>
            </>,
        'content':
            videoList.map((video) =>
                <>
                    <td className="p-4">{video.id}</td>
                    <td className="p-4"><img className="h-15" src={video.imageLink} alt={"Image for " + video.title} /></td>
                    <td className="p-4">{video.title}</td>
                    <td className="p-4">{video.month}</td>
                    <td className="p-4">{video.series}</td>
                    <td className="p-4">{video.routename}</td>
                    <td className="p-4">
                        <div className="flex gap-2 p-4">
                            <Link className="text-blue-500 underline hover:no-underline" href={"/assembly/" + video.id + "/edit"}><EditIcon className="w-6 h-6" /> Edit</Link>
                            <Link className="text-blue-500 underline hover:no-underline" href={"/assembly/" + video.routename}><ViewIcon className="w-6 h-6" /> View</Link>
                            <button className="text-blue-500 underline hover:no-underline" onClick={() => showModal(video.id)}><DeleteIcon className="w-6 h-6" /> Delete</button>
                        </div>
                    </td >
                </>)
    }

    return (
        <WrapperLayout>
            {toggleModal &&
                <ModalComponent message="Are you sure you want to delete this month?" handleOnClose={handleOnClose} handleSubmit={handleSubmit} />
            }
            <ContentWrapper title="Admin" >
                <div className="flex justify-end w-full">
                    <Link href={route('assembly.create')}><PrimaryButton className="w-44">Add video</PrimaryButton></Link>
                </div>

                <div className="w-full overflow-x-auto">
                    <ListingTable tableData={tableData} />
                </div>
            </ContentWrapper>
        </WrapperLayout>
    )
}