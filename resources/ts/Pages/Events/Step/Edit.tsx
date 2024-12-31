
import NewStepEventForm from "@/Components/Forms/NewStepEventForm";
import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";


export default function Edit({ currentEvent }: { currentEvent: StepEventsProps }) {

    return (
        <WrapperLayout>
            <ContentWrapper title="Edit STEP event">
                <NewStepEventForm currentEvent={currentEvent} />
            </ContentWrapper>
        </WrapperLayout>
    )
}