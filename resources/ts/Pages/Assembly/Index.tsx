import Heading1Alt from "@/Components/Typography/Heading1Alt";
import Paragraph from "@/Components/Typography/Paragraph";
import VideoHeroCard from "@/Components/Cards/VideoHeroCard";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { Head, usePage } from "@inertiajs/react";
import { getLastElementsOfArray, sortArrayById } from "@/helper";
import ButtonLink from "@/Elements/Buttons/ButtonLink";
import route from "ziggy-js";
import AssemblyGallery from "@/Components/Gallery/AssemblyGallery";

export interface AssemblyVideoProps {
    id: number,
    title: string,
    month: string,
    series: string,
    imageFile?: File | null,
    imageLink: string,
    videoContent: VideoMeta[]
}

export default function Index({ videoList, canViewGallery = false, canEdit = false }: { videoList: AssemblyVideoProps[], canViewGallery: boolean, canEdit?: boolean }) {
    const { auth } = usePage<PassedProps>().props;


    return (
        <WrapperLayout>
            <Head title="School Assembly" />
            <section className="flex flex-col items-center px-10 md:mb-10 sm:px-20">
                <div className="mb-5 md:max-w-4xl">
                    <Heading1Alt>School Assembly Videos</Heading1Alt>
                    {canEdit &&
                        <div className="flex justify-end w-full mb-5">
                            <div className="inline-flex gap-2 rounded-md">
                                <ButtonLink href={route('assembly.admin')}>Admin Panel</ButtonLink>
                                <ButtonLink href={route('assembly.create')}>Add New Video</ButtonLink>
                            </div>
                        </div>
                    }
                    {canViewGallery &&
                        <div className="flex justify-end w-full mb-5">
                            <div className="inline-flex gap-2 rounded-md">
                                <ButtonLink dataTest="link_bonus_gallery" href={route('assembly.bonus.index')}>View Bonus Videos</ButtonLink>
                            </div>
                        </div>
                    }
                    <Paragraph>
                        You will find additional video content for the year 2023/2024 down below. These videos will parallel the BibleTime lessons students are doing for each month of the coming school year. We hope you will find these additional videos helpful.
                    </Paragraph>
                </div>

                <div className="mx-auto">
                    <ul className="flex flex-col gap-4 md:gap-2 md:flex-row">
                        {getLastElementsOfArray(sortArrayById(videoList), 2).map((value: AssemblyVideoProps, index) => (
                            <li key={index}>
                                <VideoHeroCard buttonLink={route('assembly.show', value.id)} title={(value.title && value.title !== "") ? value.title : value.month} series={value.series} imageLink={value.imageLink} idx={value.id}></VideoHeroCard>
                            </li>
                        ))}
                    </ul>
                </div>

                {auth && auth.user && canViewGallery &&
                    <AssemblyGallery headingText="Previous Assembly Videos" videoList={sortArrayById(videoList)}></AssemblyGallery>
                }
            </section>

        </WrapperLayout>
    )
}