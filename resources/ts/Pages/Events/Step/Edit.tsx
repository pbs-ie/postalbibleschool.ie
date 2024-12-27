
import NewStepEventForm from "@/Components/Forms/NewStepEventForm";
import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";


export interface StepEventsProps {
    id: number,
    startDate: string,
    endDate: string,
    description: string,
    topic: string,
    speaker: string,
    imageFile?: File | null,
    imageLink: string,
    videoContent: VideoMeta[],
    fileContent: FileMeta[],
    showDetails: boolean;
}


export default function Edit({ currentEvent }: { currentEvent: StepEventsProps }) {

    return (
        <WrapperLayout>
            <ContentWrapper title="Edit STEP event">
                <NewStepEventForm currentEvent={currentEvent} />
            </ContentWrapper>
        </WrapperLayout>
    )
}