import Heading2 from "@/Components/Typography/Heading2";
import ParagraphContainer from "@/Components/Typography/ParagraphContainer";
import EventWrapper from "@/Layouts/EventWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";

import { CampSettingProps } from "@/Pages/Settings/Camp";

import SecondaryButton from "@/Elements/Buttons/SecondaryButton";
import ButtonLink from "@/Elements/Buttons/ButtonLink";
import ExternalLink from "@/Elements/Icons/ExternalLink";

import CampBanner from "@images/camp/camp_header.png";

import route from "ziggy-js";

export default function ReunionSignup({ campSettings }: { campSettings: CampSettingProps }) {
    return (
        <WrapperLayout>
            <div className="absolute w-full h-full -z-30">
                <img src={CampBanner} alt="" className="fixed w-full pointer-events-none aspect-auto -z-20 md:-mt-40" />
                <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full overflow-hidden bg-fixed bg-white opacity-50"></div>
            </div>
            <EventWrapper title={"Camp Reunion Signup"} className="bg-white bg-opacity-90">
                <ParagraphContainer>
                    <Heading2>Register to book your spot!</Heading2>
                    <div className="text-left">
                        <p>We are excited to invite you to join us this October for a Reunion weekend with all those who attended camp in the summer! The camp will be held in Castledaly Manor, Moate, Athlone, Co. Westmeath. You may pay the bus fees along with your registration fee.</p>
                        <p>Online registrations may be paid for by following the button below. Payments are made through Paypal.</p>
                    </div>
                    <ButtonLink hierarchy="primary" href={route('payment.camp')} Icon={ExternalLink}>Make Payment</ButtonLink>

                </ParagraphContainer>

                <div className="flex items-stretch justify-center my-10">
                    <iframe className="w-full md:w-3/4 max-w-7xl h-[35rem]" src={campSettings.reunionFormEmbedLink}>Loading…</iframe>
                </div>
                <ParagraphContainer className="text-right">
                    <SecondaryButton onClick={() => window.history.back()}>Go Back</SecondaryButton>
                </ParagraphContainer>
            </EventWrapper>
        </WrapperLayout >
    )
}