import Heading1Alt from "@/Components/Typography/Heading1Alt";
import VideoGalleryCard from "@/Components/Cards/VideoGalleryCard";

export default function GalleryAssembly({ headingText, videoList }: { headingText?: string, videoList: VideoListMeta[] }) {
    const totalVideos = videoList.length;
    return (
        <section>
            <Heading1Alt>{headingText ? headingText : "Previous Assembly Videos"}</Heading1Alt>
            <div className="flex justify-center w-full">

                <div className="grid grid-cols-2 gap-2 md:gap-4 md:grid-cols-4 w-fit md:max-w-6xl">
                    {
                        videoList.map(({ monthTitle, month, routename, imageLink, id, series }, index) => (
                            <VideoGalleryCard key={monthTitle + index} clickLink={route('assembly.show', { 'series': routename })} active={false} title={monthTitle} series={series} month={month} total={totalVideos} imageLink={routename} idx={index} ></VideoGalleryCard>
                        ))
                    }
                </div>
            </div>
        </section>

    )
}