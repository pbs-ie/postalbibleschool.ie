import StepEventCardComponent from "@/Components/Cards/StepEventCardComponent";
import SvgImagePlaceholder from "@/Components/SvgImagePlaceholder";
import Heading2 from "@/Components/Typography/Heading2";
import Heading2Alt from "@/Components/Typography/Heading2Alt";
import StepWrapper from "@/Layouts/StepWrapper";

export default function Past() {
    return (
        <StepWrapper heading="Past Events" title="Past Events">
            <div className="">
                <StepEventCardComponent />
            </div>
        </StepWrapper>
    )
}