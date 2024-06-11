import WrapperLayout from "@/Layouts/WrapperLayout";
import { Head, Link } from "@inertiajs/react";

import SecondaryButton from "@/Elements/Buttons/SecondaryButton";
import VideoPlayerComponent from "@/Components/Video/VideoPlayerComponent";

import route from "ziggy-js";
import { AssemblyVideoProps } from "./Index";

export default function Show({ videoData }: { videoData: AssemblyVideoProps }) {
    return (
        <WrapperLayout>
            <Head title="School Assembly" />
            <VideoPlayerComponent title={videoData.title} imageLink={route('images.show', videoData.imageLink)} content={videoData.videoContent} />
            <div className="flex justify-center w-full px-5 mt-5 md:mt-10 md:px-10">
                <Link href={route('assembly.index')}><SecondaryButton>Go Back to Assembly Gallery</SecondaryButton></Link>
            </div>
        </WrapperLayout>
    )
}