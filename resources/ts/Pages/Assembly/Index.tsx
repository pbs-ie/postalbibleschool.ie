import Heading1Alt from "@/Components/Typography/Heading1Alt";
import Paragraph from "@/Components/Typography/Paragraph";
import VideoHeroCard from "@/Components/Cards/VideoHeroCard";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { Head, usePage } from "@inertiajs/react";
import { getLastElementsOfArray, sortArrayById } from "@/helper";
import GalleryAssembly from "@/Components/Gallery/GalleryAssembly";



export default function Index({ videoList }: { videoList: VideoListMeta[] }) {
    const { auth } = usePage<PassedProps>().props;


    return (
        <WrapperLayout>
            <Head title="School Assembly" />
            <main className="flex flex-col items-center px-10 md:my-20 sm:px-20">
                <div className="mb-5 md:max-w-4xl">
                    <Heading1Alt>School Assembly Videos</Heading1Alt>
                    <Paragraph>
                        You will find additional video content for the year 2022/2023 down below. These videos will parallel the BibleTime lessons students are doing for each month of the coming school year. We hope you will find these additional videos helpful.
                    </Paragraph>
                </div>

                <div className="mx-auto">
                    <ul className="flex flex-col gap-4 md:gap-2 md:flex-row">
                        {getLastElementsOfArray(sortArrayById(videoList), 2).map((value, index) => (
                            <li key={index}>
                                <VideoHeroCard buttonLink={route('assembly.show', { 'series': value.routename })} title={(value.monthTitle && value.monthTitle !== "") ? value.monthTitle : value.month} series={value.series} imageLink={value.routename} idx={value.id}></VideoHeroCard>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>

            {auth && auth.user &&
                <GalleryAssembly videoList={sortArrayById(videoList)}></GalleryAssembly>
            }

        </WrapperLayout>
    )
}