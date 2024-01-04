import ButtonLink from "@/Elements/Buttons/ButtonLink";
import PopoutWindow from "@/Components/Icons/PopoutWindow";
import BasicTable, { TableData } from "@/Components/Tables/BasicTable";
import Paragraph from "@/Components/Typography/Paragraph";
import ParagraphContainer from "@/Components/Typography/ParagraphContainer";
import StepBanner from "@images/step/step-current-banner.png";

import StepWrapper from "@/Layouts/StepWrapper";

export default function Signup() {
    const tableData: TableData[] = [
        {
            heading: "Topic",
            content: <><p className="font-normal"><b>1 John</b> - Light, Love and Truth</p></>
        },
        {
            heading: "Speaker",
            content: "Andrew McNeill"
        },
        {
            heading: "Dates",
            content: "19th January - 21st November, 2024"
        },
        {
            heading: "Cost",
            content: <p className="text-base">Standard - €65<br />Student - €50</p>
        }
    ]
    return (
        <StepWrapper heading="Registration" title={"Sign Up"}>
            <div className="flex flex-col items-center justify-center w-full gap-4 mb-8 md:flex-row">
                <BasicTable tableData={tableData}></BasicTable>
                <img className="h-64 md:h-72" src={StepBanner} alt="Step January 2024 banner - 1 John" />
            </div>
            <ParagraphContainer>
                <Paragraph>Join us for the upcoming STEP in January 2024 where we go through the book of 1 John led by Andrew McNeill. We would encourage you to read/study chapters in the book of 1 John beforehand. As always, new faces are welcome!</Paragraph>

                <Paragraph>You can sign up using the form below. To cover the cost of your stay, the price for the weekend will be €65 for regular attendees and €50 for students. Please fill in the form first before making payment. You can either pay using your card by clicking the button below or at the venue when you arrive.</Paragraph>

                <ButtonLink href={route('payment.step')}>Make Payment <PopoutWindow className="w-5 h-5 ml-2" /></ButtonLink>

            </ParagraphContainer>
            <div className="flex items-stretch justify-center my-10">
                <iframe className="w-full md:w-3/4 max-w-7xl h-[35rem]" src="https://docs.google.com/forms/d/e/1FAIpQLSdIoYzAOtd0yUyIDMBtxLk1UjX3ps9z_ACDE8UZ0mcMfmlxgA/viewform">Loading…</iframe>
            </div>
        </StepWrapper>
    )
}