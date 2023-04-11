import AnchorLink from "@/Components/Navigation/AnchorLink";
import BasicTable, { TableData } from "@/Components/Tables/BasicTable";
import Heading1 from "@/Components/Typography/Heading1";
import Paragraph from "@/Components/Typography/Paragraph";
import ParagraphContainer from "@/Components/Typography/ParagraphContainer";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { Head } from "@inertiajs/inertia-react";

import LogoWhite from "@images/step/step_logo.png";

export default function Signup() {
    const tableData: TableData[] = [
        {
            heading: "Topic",
            content: <><p className="font-normal">Biblical and Practical training for Christian services</p><p className="text-sm text-gray-700 md:text-base">Special focus - Mark's Gospel</p></>
        },
        {
            heading: "Speaker",
            content: "David Wilson"
        },
        {
            heading: "Dates",
            content: "16th June - 18th June, 2023"
        },
        {
            heading: "Cost",
            content: <p className="text-base">Regular - €65<br />Student - €50</p>
        }
    ]
    return (
        <WrapperLayout showSecondaryNav extraLogo={LogoWhite}>
            {/* @ts-ignore  */}
            <Head>
                <title>Events - STEP - Sign Up</title>
                <link head-key="favicon" rel="shortcut icon" href={LogoWhite} />
            </Head>
            <section className="py-12 mx-auto text-center shadow-sm max-w-7xl sm:px-6 lg:px-8 ">
                <Heading1>Registration</Heading1>
                <div className="flex justify-center mb-8">
                    <BasicTable tableData={tableData}></BasicTable>
                </div>
                <ParagraphContainer>
                    <Paragraph>Join us for the upcoming step in June 2023 where we look at Biblical and Practical training for Christian services through the Gospel according to Mark. We would encourage you to read/study chapters in the book of Mark beforehand. As always, new faces are welcome!</Paragraph>

                    <Paragraph>This event will take place from the 16th - 18th June 2023. Sign up using the form below. To cover the cost of your stay, the price for the weekend will be €65 for regular attendees and €50 for students. You can either pay using your card by following the PayPal link below or at the venue when you arrive.</Paragraph>

                    <AnchorLink href={"https://www.paypal.com/donate/?hosted_button_id=9W8MFQ599K4UQ"} newTab={true}></AnchorLink>

                </ParagraphContainer>
                <div className="flex items-stretch justify-center my-10">
                    <iframe className="w-full md:w-3/4 max-w-7xl h-[35rem]" src="https://docs.google.com/forms/d/e/1FAIpQLSdV8flGeG04g6nVwoo-D88fuDNCOEAhD_EzGZWHNoAmmEMrKA/viewform">Loading…</iframe>
                </div>
            </section>
        </WrapperLayout>
    )
}