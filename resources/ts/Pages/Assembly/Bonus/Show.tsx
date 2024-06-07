import VideoPlayerComponent from "@/Components/Video/VideoPlayerComponent";

import route from "ziggy-js";
import BonusAssemblyWrapper from "@/Layouts/BonusAssemblyWrapper";
import { BonusVideoProps } from "./Index";

export default function Show({ videoData }: { videoData: BonusVideoProps }) {
    const content: VideoMeta[] = [
        {
            externalUrl: videoData.externalUrl,
            title: videoData.videoTitle,
            duration: videoData.duration,
            id: 0
        }
    ]
    return (
        <BonusAssemblyWrapper title={"Bonus Videos"} navBackText={"Back to Bonus Gallery"} navBackRoute={route('assembly.bonus.index')}>
            <VideoPlayerComponent title={videoData.title} imageLink={route('images.show', videoData.imageLink)} content={content} />
            <div className="flex justify-center w-full px-5 mt-5 md:mt-10 md:px-10">
            </div>
        </BonusAssemblyWrapper>
    )
}