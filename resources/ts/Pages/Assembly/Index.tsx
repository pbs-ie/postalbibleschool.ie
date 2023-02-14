import Heading1Alt from "@/Components/Typography/Heading1Alt";
import Paragraph from "@/Components/Typography/Paragraph";
import HeroCard from "@/Components/Video/HeroCard";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { Head } from "@inertiajs/inertia-react";



export default function Index({ videoList }: { videoList: VideoListMeta[] }) {


    return (
        <WrapperLayout>
            <Head title="School Assembly" />
            <section className="flex flex-col items-center px-10 my-20 sm:px-20">
                <div className="mb-5 md:max-w-4xl">
                    <Heading1Alt>School Assembly Videos</Heading1Alt>
                    <Paragraph>
                        You will find additional video content for the year 2022/2023 down below. These videos will parallel the BibleTime lessons students are doing for each month of the coming school year. We hope you will find these additional videos helpful.
                    </Paragraph>
                </div>

                <div className="mx-auto">
                    <ul className="flex flex-col gap-4 md:gap-2 md:flex-row">
                        {videoList.map((value, index) => (
                            <li key={index}>
                                <HeroCard buttonLink={route('assembly.show', { 'series': value.routename })} title={value.title === "" ? value.month : value.title} series={value.series} imageLink={value.routename} idx={value.id}></HeroCard>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </WrapperLayout>
    )
}