import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";
import NewStepEventForm from "@/Components/Forms/NewStepEventForm";

export default function Create() {

    return (
        <WrapperLayout>
            <ContentWrapper title="Create New STEP event">
                <NewStepEventForm />
            </ContentWrapper>
        </WrapperLayout>
    )
}