import VideoGalleryCard from "@/Components/Cards/VideoGalleryCard";
import Heading2 from "@/Components/Typography/Heading2";
import { AssemblyVideoProps } from "@/Pages/Assembly/Index";
import route from "ziggy-js";

export default function AssemblyGallery({ headingText, videoList = [] }: { headingText: string, videoList: AssemblyVideoProps[] }) {
    const totalVideos = videoList.length;
    return (
        <section className="w-full">
            <Heading2>{headingText}</Heading2>
            {totalVideos !== 0 ? (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:max-w-6xl">
                    {
                        videoList.map(({ title, month, imageLink, id, series }, index) => (
                            <VideoGalleryCard key={title + index} clickLink={route('assembly.show', +id)} active={false} title={title} series={series} month={month} total={totalVideos} imageLink={imageLink} idx={index} ></VideoGalleryCard>
                        ))
                    }
                </div>
            ) : (
                <div className="italic text-gray-500">No videos found</div>
            )
            }
        </section>

    )
}