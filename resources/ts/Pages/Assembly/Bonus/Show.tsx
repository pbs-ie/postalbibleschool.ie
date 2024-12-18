import VideoPlayerComponent from "@/Components/Video/VideoPlayerComponent";

import route from "ziggy-js";
import WrapperSidebarWithNavback from "@/Layouts/WrapperSidebarWithNavback";
import { BonusVideoProps } from "@/Pages/Assembly/Bonus/Index";

export default function Show({ videoData, canEdit }: { videoData: BonusVideoProps, canEdit?: boolean }) {
    const content: VideoMeta[] = [
        {
            externalUrl: videoData.externalUrl,
            title: videoData.videoTitle,
            duration: videoData.duration,
            id: 0
        }
    ]
    return (
        <WrapperSidebarWithNavback title={"Bonus Videos"} canEdit={canEdit} navBackText={"Back to Bonus Gallery"} navBackRoute={route('assembly.bonus.index')}>
            <VideoPlayerComponent title={videoData.title} imageLink={route('images.show', videoData.imageLink)} content={content} />
        </WrapperSidebarWithNavback>
    )
}