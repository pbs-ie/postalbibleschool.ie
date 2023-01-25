import Paragraph from "@/Components/Typography/Paragraph";
import ParagraphContainer from "@/Components/Typography/ParagraphContainer";
import EventWrapper from "@/Layouts/EventWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";

export default function Signup() {
    return (
        <WrapperLayout showSecondaryNav>
            <EventWrapper title="STEP - Sign Up">
                <ParagraphContainer>
                    <Paragraph>Having covered a broad range of books at STEP in the previous years, we will shift our focus to characters looking at an emphasis on cultivation of the devotional relationship with God as well as the ideas of sacrifice and service. In the month of November, we took a look at 1 Samuel and will continue through the same themes in the book of 2 Samuel this month.</Paragraph>

                    <Paragraph>We would encourage you to read/study chapters in the book beforehand. As always, new faces are welcome!</Paragraph>

                    <Paragraph>This event will take place from the 13th - 15th January 2022. Sign up using the form below. To cover the cost of your stay, the price for the weekend will be €65 for regular attendees and €50 for students. You can either pay using your card by following the PayPal link below or at the venue when you arrive.</Paragraph>

                    <a className="text-blue-600 underline hover:text-blue-800 visited:text-purple-600" href="https://www.paypal.com/donate/?hosted_button_id=9W8MFQ599K4UQ" target="_blank">https://www.paypal.com/donate/?hosted_button_id=9W8MFQ599K4UQ
                    </a>
                </ParagraphContainer>
                <div className="flex items-stretch justify-center my-10">
                    <iframe className="w-full md:w-3/4 max-w-7xl h-96" src="https://docs.google.com/forms/d/e/1FAIpQLScne0SWWllcS3TmuXcOQV9Ko3f-A7fkv2rH_Fz1bLnZdyFhtw/viewform?embedded=true">Loading…</iframe>
                </div>
            </EventWrapper>
        </WrapperLayout>
    )
}