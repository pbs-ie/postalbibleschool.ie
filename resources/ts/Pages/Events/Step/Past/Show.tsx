import ButtonLink from "@/Elements/Buttons/ButtonLink";
import VideoAdditionalFilesComponent from "@/Components/Video/VideoAdditionalFilesComponent";
import VideoPlayerComponent from "@/Components/Video/VideoPlayerComponent";
import StepWrapper from "@/Layouts/StepWrapper";

export default function Show({ pastEvent }: { pastEvent: { title: string, date: string, imageLink: string, videoContent: VideoMeta[], fileContent?: FileMeta[] } }) {
    let worksheetFiles = pastEvent.fileContent?.filter((fileData) => fileData.type === "document");
    let slideFiles = pastEvent.fileContent?.filter((fileData) => fileData.type === "slide");
    return (
        <StepWrapper title={pastEvent.title} heading={pastEvent.date}>
            <VideoPlayerComponent title={pastEvent.title} imageLink={route('images.show', pastEvent.imageLink)} content={pastEvent.videoContent} />
            <VideoAdditionalFilesComponent worksheetFiles={worksheetFiles} slideFiles={slideFiles} />
            <div className="mt-4">
                <ButtonLink hierarchy="secondary" href={route('events.step.past.gallery')}>Back to All</ButtonLink>
            </div>
        </StepWrapper>
    )
}