import ButtonLink from "@/Elements/Buttons/ButtonLink";
import VideoAdditionalFilesComponent from "@/Components/Video/VideoAdditionalFilesComponent";
import VideoPlayerComponent from "@/Components/Video/VideoPlayerComponent";
import StepWrapper from "@/Layouts/StepWrapper";
import route from "ziggy-js";
import { StepEventsProps } from "@/Pages/Events/Step/Edit";

export default function Show({ currentEvent }: { currentEvent: StepEventsProps }) {
    let worksheetFiles = currentEvent.fileContent?.filter((fileData) => fileData.type === "document");
    let slideFiles = currentEvent.fileContent?.filter((fileData) => fileData.type === "slide");
    return (
        <StepWrapper title={currentEvent.topic} heading={currentEvent.topic}>
            <VideoPlayerComponent title={currentEvent.topic} imageLink={route('images.show', currentEvent.imageLink)} content={currentEvent.videoContent} />
            <VideoAdditionalFilesComponent worksheetFiles={worksheetFiles} slideFiles={slideFiles} />
            <div className="mt-4">
                <ButtonLink hierarchy="secondary" href={route('events.step.past.gallery')}>Back to All</ButtonLink>
            </div>
        </StepWrapper>
    )
}