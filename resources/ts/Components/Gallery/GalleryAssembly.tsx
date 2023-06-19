import Heading1Alt from "@/Components/Typography/Heading1Alt";
import VideoGalleryCard from "@/Components/Cards/VideoGalleryCard";

export default function GalleryAssembly({ videoList }: { videoList: VideoListMeta[] }) {
    const totalVideos = videoList.length;
    return (
        <section>
            <Heading1Alt>Previous Assembly Videos</Heading1Alt>
            <div className="flex justify-center w-full">

                <div className="grid grid-cols-2 gap-2 md:gap-4 md:grid-cols-4 w-fit md:max-w-6xl">
                    {
                        videoList.map(({ title, month, routename, imageLink, id, series }, index) => (
                            <VideoGalleryCard key={title + index} clickLink={route('assembly.show', { 'series': routename })} active={false} title={title} series={series} month={month} total={totalVideos} imageLink={routename} idx={index} ></VideoGalleryCard>
                        ))
                    }
                </div>
            </div>
        </section>

    )
}