import ButtonLink from "@/Elements/Buttons/ButtonLink";
import BasicTable, { TableData } from "@/Components/Tables/BasicTable";
import Paragraph from "@/Components/Typography/Paragraph";
import ParagraphContainer from "@/Components/Typography/ParagraphContainer";

import StepWrapper from "@/Layouts/StepWrapper";
import ChevronRight from "@/Elements/Icons/ChevronRight";
import route from "ziggy-js";

export default function Signup({ stepSettings }: { stepSettings: StepSettingsProps }) {
    const tableData: TableData[] = [
        {
            heading: "Topic",
            content: <><p className="font-normal">{stepSettings.topic}</p></>
        },
        {
            heading: "Speaker",
            content: <>{stepSettings.speaker}</>
        },
        {
            heading: "Dates",
            content: <>{stepSettings.dates}</>
        },
        {
            heading: "Cost",
            content: <p className="text-base">Standard - €{stepSettings.standardCost}<br />Student - €{stepSettings.concessionCost}</p>
        }
    ]
    return (
        <StepWrapper heading="Registration" title={"Sign Up"}>
            <div className="flex flex-col items-center justify-center w-full gap-4 mb-8 md:flex-row">
                <BasicTable tableData={tableData}></BasicTable>
                <img className="max-h-64 md:max-h-72 aspect-video" src={route('images.show', stepSettings.eventImageLink)} alt="Step June 2024 banner - Nehemiah" />
            </div>
            <ParagraphContainer>
                <Paragraph>Join us for the upcoming STEP in June 2024 where we go through the book of Nehemiah led by Noel McMeekin. We would encourage you to read/study chapters in the book of Nehemiah beforehand. As always, new faces are welcome!</Paragraph>

                <Paragraph>You can sign up using the form below. To cover the cost of your stay, the price for the weekend will be €65 for regular attendees and €50 for students. Please fill in the form first before making payment. You can either pay using your card by clicking the button below or at the venue when you arrive.</Paragraph>

                <ButtonLink Icon={ChevronRight} href={route('payment.step')}>Make Payment</ButtonLink>

            </ParagraphContainer>
            <div className="flex items-stretch justify-center my-10">
                <iframe className="w-full md:w-3/4 max-w-7xl h-[35rem]" src={stepSettings.embedLink}>Loading…</iframe>
            </div>
        </StepWrapper>
    )
}