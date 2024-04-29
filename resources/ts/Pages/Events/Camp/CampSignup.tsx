import SecondaryButton from "@/Elements/Buttons/SecondaryButton";
import Heading2 from "@/Components/Typography/Heading2";
import Paragraph from "@/Components/Typography/Paragraph";
import ParagraphContainer from "@/Components/Typography/ParagraphContainer";
import EventWrapper from "@/Layouts/EventWrapper";

import CampBanner from "@images/camp/camp_header.png";
import ButtonLink from "@/Elements/Buttons/ButtonLink";
import CampWrapper from "@/Layouts/CampWrapper";
import ExternalLink from "@/Elements/Icons/ExternalLink";


export default function Signup() {
    return (
        <CampWrapper title="">
            <div className="absolute w-full h-full -z-30">
                <img src={CampBanner} alt="" className="fixed w-full pointer-events-none aspect-auto -z-20 md:-mt-40" />
                <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full overflow-hidden bg-fixed bg-white opacity-50"></div>
            </div>
            <EventWrapper title={"Summer Bible Camp 2024"} className="bg-white bg-opacity-90">
                <ParagraphContainer>
                    <Heading2>Rules for Application</Heading2>
                    <p className="text-left">In the past demand for places has been so high that many students have been disappointed. So that we can be fair to everyone, the following rules will be strictly applied.</p>
                    <ul className="mb-5 ml-5 text-left list-disc">
                        <li>The age limit of 10 or over by the 1st January, 2024 will strictly apply. Campers should not be over 17 years old by the end of camp.</li>
                        <li>Places are only available for those who are, and have been, regularly returning PBS lessons for the year 2024</li>
                        <li>Registration may be completed by post, delivery to our office or via the links online. Please do this as soon as possible since priority will be given to those who send their application early.</li>
                        <li>Online registrations may be paid for by following the button below. Payments are made through Paypal.</li>
                    </ul>
                    <ButtonLink hierarchy="primary" href={route('payment.camp')} Icon={ExternalLink}>Make Payment</ButtonLink>


                </ParagraphContainer>
                <ParagraphContainer className="mt-5">
                    <Paragraph className="text-left text-black">If you don't know anyone coming to camp, don't worry, we will do our best to introduce you to groups your own age, but if you do know others coming please don't forget to name on the Booking Form one person (not a leader) you would like to share a room with. If you list any more than one, it can make arranging the rooms very difficult. Further details about Holiday Week will be sent to you nearer the time, and you will be sent a receipt for your deposit.</Paragraph>
                </ParagraphContainer>
                <div className="flex items-stretch justify-center my-10">
                    <iframe className="w-full md:w-3/4 max-w-7xl h-[35rem]" src="https://docs.google.com/forms/d/e/1FAIpQLSdEmA2nUyNVz6Lzb5RxUctJLt3bOBPHp1PG7O-RoP3OCWnCVg/viewform">Loading…</iframe>
                </div>
                <ParagraphContainer className="text-right">
                    <ButtonLink hierarchy="secondary" href={route('events.camp.index')}>Go Back</ButtonLink>
                </ParagraphContainer>
            </EventWrapper>
        </CampWrapper >
    )
}