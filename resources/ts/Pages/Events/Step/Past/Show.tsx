import ButtonLink from "@/Components/Buttons/ButtonLink";
import VideoPlayerComponent from "@/Components/VideoPlayerComponent";
import StepWrapper from "@/Layouts/StepWrapper";

export default function Show({ videoData }: { videoData: { title: string, date: string, imageId: string, content: VideoMeta[] } }) {
    return (
        <StepWrapper title={videoData.title} heading={videoData.date}>
            <VideoPlayerComponent title={videoData.title} imageLink={route('events.step.image', videoData.imageId)} content={videoData.content} />
            {/* <div className="grid justify-start max-w-5xl grid-cols-2 gap-4 mx-auto my-5 text-left">
                * Section for worksheets and slides *
            </div> */}
            <div className="mt-4">
                <ButtonLink type="secondary" href={route('events.step.past.gallery')}>Back to All</ButtonLink>
            </div>
        </StepWrapper>
    )
}