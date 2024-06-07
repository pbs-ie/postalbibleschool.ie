import { BonusVideoProps } from "@/Pages/Assembly/Bonus/Index";
import Heading2 from "@/Components/Typography/Heading2";
import VideoGalleryCard from "@/Components/Cards/VideoGalleryCard";
import route from "ziggy-js";
import BonusVideoGalleryCard from "@/Components/Cards/BonusVideoGalleryCard";

export default function BonusVideoGallery({ headingText, videoList = [] }: { headingText: string, videoList: BonusVideoProps[] }) {
    const totalVideos = videoList.length;
    console.debug(videoList);
    return (
        <section>
            <Heading2>{headingText}</Heading2>
            {totalVideos !== 0 ? (

                <div className="flex justify-center w-full">

                    <div className="flex flex-wrap gap-2 lg:grid lg:gap-4 lg:grid-cols-4 w-fit lg:max-w-6xl">
                        {
                            videoList.map(({ title, imageLink, id, category, duration, externalUrl, videoTitle }, index) => (
                                <BonusVideoGalleryCard key={title + index} clickLink={route('assembly.bonus.show', id)} month="" active={false} title={title} total={totalVideos} imageLink={imageLink} idx={index} />
                            ))
                        }
                    </div>
                </div>
            ) : (
                <div className="italic text-gray-500">No videos found</div>
            )
            }
        </section>

    )
}