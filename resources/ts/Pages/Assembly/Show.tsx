import WrapperLayout from "@/Layouts/WrapperLayout";
import { Head, Link } from "@inertiajs/react";

import SecondaryButton from "@/Elements/Buttons/SecondaryButton";
import VideoPlayerComponent from "@/Components/Video/VideoPlayerComponent";


export default function Show({ videoData }: { videoData: { title: string, imageId: string, content: VideoMeta[] } }) {
    return (
        <WrapperLayout>
            <Head title="School Assembly" />
            <VideoPlayerComponent title={videoData.title} imageLink={"/assembly/image/" + videoData.imageId} content={videoData.content} />
            <div className="flex justify-center w-full px-5 mt-5 md:mt-10 md:px-10">
                <Link href={route('assembly.index')}><SecondaryButton>Go Back to Assembly Gallery</SecondaryButton></Link>
            </div>
        </WrapperLayout>
    )
}