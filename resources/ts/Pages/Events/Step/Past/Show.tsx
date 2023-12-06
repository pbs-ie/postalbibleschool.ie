import ButtonLink from "@/Components/Buttons/ButtonLink";
import LessonDownloadButton from "@/Components/Buttons/LessonDownloadButton";
import { PastEventCardProps } from "@/Components/Cards/StepEventCard";
import VideoCarousalCard from "@/Components/Cards/VideoCarousalCard";
import Heading1Alt from "@/Components/Typography/Heading1Alt";
import Heading2Alt from "@/Components/Typography/Heading2Alt";
import Heading3 from "@/Components/Typography/Heading3";
import StepWrapper from "@/Layouts/StepWrapper";

export default function Show({ event }: { event: PastEventCardProps }) {
    const videos = [
        {
            title: "Titl;e 1",
            duration: "23 min",
            imageLink: "",
            idx: 0
        },
        {
            title: "TItle 2",
            duration: "24 min",
            imageLink: "",
            idx: 1
        }
    ]
    const worksheets = [{ title: "title" }, { title: "title2" }];
    const slides = [];
    return (
        <StepWrapper title={event.heading} heading={event.date}>
            <Heading2Alt>{event.heading}</Heading2Alt>
            <div className="grid justify-start max-w-5xl grid-cols-2 gap-4 mx-auto mb-5 text-left">
                <div className="col-span-2">
                    <Heading3>Individual Talks</Heading3>
                    <div className="flex gap-5 p-2 overflow-x-auto bg-slate-50 justify-items-center">
                        {videos.map(({ title, duration, imageLink, idx }) => (
                            <VideoCarousalCard title={title} duration={duration} total={videos.length} imageLink={imageLink} idx={idx} />
                        ))}
                    </div>
                </div>
                <div>
                    <Heading3>Worksheets</Heading3>
                    <div className="flex flex-col w-3/4 gap-2">
                        {worksheets.length !== 0 && worksheets.map((item) =>
                            <LessonDownloadButton title={item.title} downloadLink="abcd" />
                        )}
                    </div>
                </div>
                <div>
                    <Heading3>Slides</Heading3>
                    <div className="flex flex-col w-3/4 gap-2">
                        <LessonDownloadButton title={"Slides 1"}></LessonDownloadButton>
                    </div>
                </div>
            </div>
            <ButtonLink type="secondary" href={route('events.step.past.gallery')}>Back to All</ButtonLink>
        </StepWrapper>
    )
}