import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";
import StepPastForm from "@/Components/Forms/StepPastForm";

export default function Create() {

    return (
        <WrapperLayout>
            <ContentWrapper title="Create New STEP event">
                <StepPastForm />
            </ContentWrapper>
        </WrapperLayout>
    )
}