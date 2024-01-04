import ButtonLink from "@/Elements/Buttons/ButtonLink";
import VideoAdditionalFilesComponent from "@/Components/Video/VideoAdditionalFilesComponent";
import VideoPlayerComponent from "@/Components/Video/VideoPlayerComponent";
import StepWrapper from "@/Layouts/StepWrapper";

export default function Show({ videoData }: { videoData: { title: string, date: string, imageId: string, content: VideoMeta[], fileContent?: FileMeta[] } }) {
    let worksheetFiles = videoData.fileContent?.filter((fileData) => fileData.type === "document");
    let slideFiles = videoData.fileContent?.filter((fileData) => fileData.type === "slide");
    return (
        <StepWrapper title={videoData.title} heading={videoData.date}>
            <VideoPlayerComponent title={videoData.title} imageLink={route('events.step.image', videoData.imageId)} content={videoData.content} />
            <VideoAdditionalFilesComponent worksheetFiles={worksheetFiles} slideFiles={slideFiles} />
            <div className="mt-4">
                <ButtonLink type="secondary" href={route('events.step.past.gallery')}>Back to All</ButtonLink>
            </div>
        </StepWrapper>
    )
}