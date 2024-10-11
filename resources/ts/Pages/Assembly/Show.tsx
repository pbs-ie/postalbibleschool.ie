import { Link } from "@inertiajs/react";
import route from "ziggy-js";

import SecondaryButton from "@/Elements/Buttons/SecondaryButton";
import VideoPlayerComponent from "@/Components/Video/VideoPlayerComponent";
import { AssemblyVideoProps } from "@/Pages/Assembly/Index";
import WrapperSidebarWithNavback from "@/Layouts/WrapperSidebarWithNavback";


export default function Show({ videoData, canEdit }: { videoData: AssemblyVideoProps, canEdit?: boolean }) {
    return (
        <WrapperSidebarWithNavback title="School Assembly" canEdit={canEdit} navBackText="Back to Assembly Gallery" navBackRoute={route('assembly.index')}>
            <VideoPlayerComponent title={videoData.title} imageLink={route('images.show', videoData.imageLink)} content={videoData.videoContent} />
        </WrapperSidebarWithNavback>
    )
}