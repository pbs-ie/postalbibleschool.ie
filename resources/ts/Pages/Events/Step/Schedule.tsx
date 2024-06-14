import Paragraph from "@/Components/Typography/Paragraph";
import ParagraphContainer from "@/Components/Typography/ParagraphContainer";
import StepWrapper from "@/Layouts/StepWrapper";
import route from "ziggy-js";

export default function Schedule({ stepSettings }: { stepSettings: StepSettingsProps }) {
    return (
        <StepWrapper title="Schedule" heading="Schedule">
            <ParagraphContainer className="mt-5">
                <Paragraph>Find the schedule for the current STEP ({stepSettings.dates}) below.</Paragraph>

            </ParagraphContainer>
            {stepSettings.scheduleFileLink &&
                <div className="flex items-stretch justify-center my-10">
                    <iframe className="w-full md:w-3/4 max-w-7xl h-[35rem]" src={route('assets.show', stepSettings.scheduleFileLink)}>Loading…</iframe>
                </div>
            }
        </StepWrapper>
    )
}