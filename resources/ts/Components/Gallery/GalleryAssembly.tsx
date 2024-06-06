import VideoGalleryCard from "@/Components/Cards/VideoGalleryCard";
import Heading2 from "@/Components/Typography/Heading2";
import route from "ziggy-js";

export default function GalleryAssembly({ headingText, videoList = [] }: { headingText: string, videoList: VideoListMeta[] }) {
    const totalVideos = videoList.length;
    return (
        <section>
            <Heading2>{headingText}</Heading2>
            {totalVideos !== 0 ? (

                <div className="flex justify-center w-full">

                    <div className="flex flex-wrap gap-2 lg:grid lg:gap-4 lg:grid-cols-4 w-fit lg:max-w-6xl">
                        {
                            videoList.map(({ monthTitle, month, routename, imageLink, id, series }, index) => (
                                <VideoGalleryCard key={monthTitle + index} clickLink={route('assembly.show', { 'series': routename })} active={false} title={monthTitle} series={series} month={month} total={totalVideos} imageLink={routename} idx={index} ></VideoGalleryCard>
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