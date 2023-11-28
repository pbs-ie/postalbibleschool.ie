import ButtonLink from "@/Components/Buttons/ButtonLink";
import LessonDownloadButton from "@/Components/Buttons/LessonDownloadButton";
import { EventCardProps } from "@/Components/Cards/StepEventCard";
import VideoCarousalCard from "@/Components/Cards/VideoCarousalCard";
import Heading1Alt from "@/Components/Typography/Heading1Alt";
import Heading2Alt from "@/Components/Typography/Heading2Alt";
import Heading3 from "@/Components/Typography/Heading3";
import StepWrapper from "@/Layouts/StepWrapper";

export default function Event({ event }: { event: EventCardProps }) {
    const worksheets = [{ title: "title" }, { title: "title2" }];
    const slides = [];
    return (
        <StepWrapper title={event.heading} heading={event.date}>
            <Heading2Alt>{event.heading}</Heading2Alt>
            <div className="grid justify-start max-w-5xl grid-cols-2 gap-4 mx-auto mb-5 text-left">
                <div className="col-span-2">
                    <Heading3>Individual Talks</Heading3>
                    <div className="flex gap-5 p-2 overflow-x-auto bg-slate-50 justify-items-center">
                        <VideoCarousalCard title={"Test title"} duration={"23 min"} total={2} imageLink={""} idx={0} />
                        <VideoCarousalCard title={"Test title 2"} duration={"23 min"} total={2} imageLink={""} idx={1} />
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