import { BonusVideoProps } from "@/Pages/Assembly/Bonus/Index";
import Heading2 from "@/Components/Typography/Heading2";
import BonusVideoGalleryCard from "@/Components/Cards/BonusVideoGalleryCard";
import route from "ziggy-js";
import VideoGalleryCard from "../Cards/VideoGalleryCard";
import DetailsSummary from "@/Elements/Sections/DetailsSummary";
import Heading2Alt from "../Typography/Heading2Alt";

export default function BonusVideoGallery({ headingText, videoList = [], defaultOpen = false }: { headingText: string, videoList: BonusVideoProps[], defaultOpen?: boolean }) {
    const totalVideos = videoList.length;
    return (
        <DetailsSummary summaryElement={<Heading2Alt>{headingText}</Heading2Alt>} defaultOpen={defaultOpen}>
            <>
                {totalVideos !== 0 ? (
                    <div className="flex justify-center w-full">
                        <div className="flex flex-wrap gap-2 lg:grid lg:gap-4 lg:grid-cols-4 w-fit lg:max-w-6xl">
                            {
                                videoList.map(({ title, imageLink, id, category, duration, externalUrl, videoTitle }, index) => (
                                    <VideoGalleryCard key={title + index} clickLink={route('assembly.bonus.show', id)} month="" active={false} title={title} total={totalVideos} imageLink={imageLink} idx={index} />
                                ))
                            }
                        </div>
                    </div>
                ) : (
                    <div className="italic text-gray-500">No videos found</div>
                )
                }
            </>
        </DetailsSummary>

    )
}