import BasicTable, { BasicTableData } from "@/Components/Tables/BasicTable";
import Paragraph from "@/Components/Typography/Paragraph";
import ParagraphContainer from "@/Components/Typography/ParagraphContainer";

import { StepEventsProps } from "@/Pages/Events/Step/Edit";

import StepWrapper from "@/Layouts/StepWrapper";

import ButtonLink from "@/Elements/Buttons/ButtonLink";
import ChevronRight from "@/Elements/Icons/ChevronRight";

import route from "ziggy-js";
import { getDateRangeLongString } from "@/helper";

export default function Signup({ activeEvent, stepSettings }: { activeEvent?: StepEventsProps, stepSettings: StepSettingsProps }) {

    const tableData: BasicTableData[] = [
        {
            heading: "Topic",
            content: <><p className="font-normal">{activeEvent?.topic}</p></>
        },
        {
            heading: "Speaker",
            content: <>{activeEvent?.speaker}</>
        },
        {
            heading: "Dates",
            content: <> {activeEvent ? getDateRangeLongString(activeEvent.startDate, activeEvent.endDate) : ""}</>
        },
        {
            heading: "Cost",
            content: <p className="text-base">Standard - €{stepSettings.standardCost}<br />Student - €{stepSettings.concessionCost}</p>
        }
    ]
    return (
        <StepWrapper heading="Registration" title={"Sign Up"}>
            {activeEvent &&
                <div className="flex flex-col items-center justify-center gap-4 mb-8 md:flex-row">
                    <BasicTable tableData={tableData}></BasicTable>
                    <img className="object-contain max-h-64 md:max-h-72 aspect-video" src={route('images.show', activeEvent?.imageLink)} alt={`Step ${activeEvent.startDate} banner - ${activeEvent.topic}`} />
                </div>
            }
            <ParagraphContainer>
                <Paragraph>{stepSettings.description}</Paragraph>

                <Paragraph>You can sign up using the form below. To cover the cost of your stay, the price for the weekend will be €{stepSettings.standardCost} for regular attendees and €{stepSettings.concessionCost} for students. Please fill in the form first before making payment. You can either pay using your card by clicking the button below or at the venue when you arrive.</Paragraph>

                <ButtonLink Icon={ChevronRight} href={route('payment.step')}>Make Payment</ButtonLink>

            </ParagraphContainer>
            <div className="flex items-stretch justify-center my-10">
                <iframe className="w-full md:w-3/4 max-w-7xl h-[35rem]" src={stepSettings.embedLink}>Loading…</iframe>
            </div>
        </StepWrapper>
    )
}