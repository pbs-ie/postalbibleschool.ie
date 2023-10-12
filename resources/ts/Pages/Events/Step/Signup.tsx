import ButtonLink from "@/Components/Buttons/ButtonLink";
import PopoutWindow from "@/Components/Icons/PopoutWindow";
import BasicTable, { TableData } from "@/Components/Tables/BasicTable";
import Heading1 from "@/Components/Typography/Heading1";
import Paragraph from "@/Components/Typography/Paragraph";
import ParagraphContainer from "@/Components/Typography/ParagraphContainer";

import StepWrapper from "@/Layouts/StepWrapper";

export default function Signup() {
    const tableData: TableData[] = [
        {
            heading: "Topic",
            content: <><p className="font-normal">Study on the book of Job</p></>
        },
        {
            heading: "Speaker",
            content: "John Hewitt"
        },
        {
            heading: "Dates",
            content: "17th November - 19th November, 2023"
        },
        {
            heading: "Cost",
            content: <p className="text-base">Regular - €65<br />Student - €50</p>
        }
    ]
    return (
        <StepWrapper title={"Sign Up"}>
            <section className="py-12 mx-auto text-center shadow-sm max-w-7xl sm:px-6 lg:px-8 ">
                <Heading1>Registration</Heading1>
                <div className="flex justify-center mb-8">
                    <BasicTable tableData={tableData}></BasicTable>
                </div>
                <ParagraphContainer>
                    <Paragraph>Join us for the upcoming STEP in November 2023 where we take a deeper look at the book of Job. We would encourage you to read/study chapters in the book of Job beforehand. As always, new faces are welcome!</Paragraph>

                    <Paragraph>This event will take place from the 17th - 19th November 2023. Sign up using the form below. To cover the cost of your stay, the price for the weekend will be €65 for regular attendees and €50 for students. Please fill in the form first before making payment. You can either pay using your card by following the link below or at the venue when you arrive.</Paragraph>

                    <ButtonLink href={route('payment.step')}>Make Payment <PopoutWindow className="w-5 h-5 ml-2" /></ButtonLink>

                </ParagraphContainer>
                <div className="flex items-stretch justify-center my-10">
                    <iframe className="w-full md:w-3/4 max-w-7xl h-[35rem]" src="https://docs.google.com/forms/d/e/1FAIpQLSdYvzFVJEJ6TKU-NdC8DlnJL21o1fQaMSgBbi5gSmh8Epdygw/viewform">Loading…</iframe>
                </div>
            </section>
        </StepWrapper>
    )
}