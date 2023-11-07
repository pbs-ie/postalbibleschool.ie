import StepEventCardComponent from "@/Components/Cards/StepEventCardComponent";
import StepWrapper from "@/Layouts/StepWrapper";

export default function PastGallery() {
    return (
        <StepWrapper heading="Past Events" title="Past Events">
            <StepEventCardComponent />
        </StepWrapper>
    )
}