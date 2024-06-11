
import StepPastForm from "@/Components/Forms/StepPastForm";
import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";


export interface StepPastProps {
    id: number,
    date: string,
    description: string,
    title: string,
    imageFile?: File | null,
    imageLink: string,
    videoContent: VideoMeta[],
    fileContent: FileMeta[],
    showDetails: boolean;
}


export default function Edit({ pastEvent }: { pastEvent: StepPastProps }) {

    return (
        <WrapperLayout>
            <ContentWrapper title="Edit STEP event">
                <StepPastForm pastEvent={pastEvent} />
            </ContentWrapper>
        </WrapperLayout>
    )
}