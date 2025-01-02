import route from "ziggy-js";

import WrapperSidebarWithNavback from "@/Layouts/WrapperSidebarWithNavback";
import { BonusVideoProps } from "@/Pages/Assembly/Bonus/Index";
import VideoPlayerComponent from "@/Components/Video/VideoPlayerComponent";
import AnchorLink from "@/Components/Navigation/AnchorLink";
import Heading2Alt from "@/Components/Typography/Heading2Alt";
import Download from "@/Elements/Icons/Download";
import List from "@/Elements/Lists/List";
import ListItem from "@/Elements/Lists/ListItem";
import ChevronRight from "@/Elements/Icons/ChevronRight";

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
            {videoData.downloadLink &&
                <div className="text-left lg:mt-5">
                    <Heading2Alt>Extra Content</Heading2Alt>
                    <List type="unordered">
                        <ListItem Icon={ChevronRight}>
                            <AnchorLink href={route('assets.download', videoData.downloadLink)} Icon={Download}>Download "{videoData.downloadTitle}"</AnchorLink>
                        </ListItem>
                    </List>
                </div>
            }
        </WrapperSidebarWithNavback>
    )
}