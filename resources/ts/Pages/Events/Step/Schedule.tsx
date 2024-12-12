import Paragraph from "@/Components/Typography/Paragraph";
import ParagraphContainer from "@/Components/Typography/ParagraphContainer";
import StepWrapper from "@/Layouts/StepWrapper";
import route from "ziggy-js";
import Download from "@/Elements/Icons/Download";
import PdfViewerComponent from "@/Components/PdfViewerComponent";
import AnchorLink from "@/Components/Navigation/AnchorLink";

export default function Schedule({ stepSettings }: { stepSettings: StepSettingsProps }) {
    return (
        <StepWrapper title="Schedule" heading="Schedule">
            <ParagraphContainer className="mt-5">
                <Paragraph>The schedule for the current STEP ({stepSettings.dates}) will be shown below.</Paragraph>

            </ParagraphContainer>
            {stepSettings.scheduleFileLink &&
                <div className="flex flex-col items-center">
                    <AnchorLink Icon={Download} href={route('assets.download', stepSettings.scheduleFileLink)}>Download Schedule (PDF)</AnchorLink>
                    <div className="flex items-stretch justify-center py-2 my-5 text-white bg-gray-500 border">
                        <PdfViewerComponent file={route('assets.show', stepSettings.scheduleFileLink)} />
                    </div>
                </div>
            }
        </StepWrapper>
    )
}