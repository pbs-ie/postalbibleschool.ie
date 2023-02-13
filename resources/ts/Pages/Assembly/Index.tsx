import PrimaryButton from "@/Components/PrimaryButton";
import Heading1 from "@/Components/Typography/Heading1";
import Heading2 from "@/Components/Typography/Heading2";
import Paragraph from "@/Components/Typography/Paragraph";
import HeroCard from "@/Components/Video/HeroCard";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { hrefToUrl } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";


interface VideoListMeta {
    title: string,
    month: string,
    id: number,
    series: string,
    routename: string,
    imageLink: string
}

export default function Index({ videoList }: { videoList: VideoListMeta[] }) {


    return (
        <WrapperLayout>
            <Head title="School Assembly" />
            <section className="flex flex-col px-10 my-20 sm:px-20">
                <Heading2>School Assembly Videos</Heading2>
                <Paragraph>
                    You will find additional video content for the year 2022/2023 down below. These videos will parallel the BibleTime lessons students are doing for each month of the coming school year. We hope you will find these additional videos helpful.
                </Paragraph>

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