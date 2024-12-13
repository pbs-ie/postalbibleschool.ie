import CardBlock from "@/Components/Cards/EventCardBlock";
import CardContainer from "@/Components/Cards/EventCardContainer";
import GalleryBasic from "@/Components/Gallery/GalleryBasic";
import Paragraph from "@/Components/Typography/Paragraph";
import ParagraphContainer from "@/Components/Typography/ParagraphContainer";

import EventWrapper from "@/Layouts/EventWrapper";
import ExtendScreenWrapper from "@/Layouts/ExtendScreenWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";

import ShedGames from "@images/shed/shed-games.jpg";
import ShedFriends from "@images/shed/shed-friends.jpg";
import ShedTeaching from "@images/shed/shed-teaching.jpg";
import ShedFun from "@images/shed/shed-fun.jpg";
import ShedFood from "@images/shed/shed-food.jpg";
import ShedActivities from "@images/shed/shed-activities.jpg";
import ShedSkills from "@images/shed/shed-skills.jpg";
import ShedChallenges from "@images/shed/shed-challenges.jpg";

import ShedLogo from "@images/shed/shed-logo.png";

import ConsentForm from "@images/SHED_Consent-form_2022-23.pdf";
import ExternalLink from "@/Elements/Icons/ExternalLink";
import Calendar from "@/Elements/Icons/Calendar";
import Group from "@/Elements/Icons/Group";
import QuestionMarkCircle from "@/Elements/Icons/QuestionMarkCircle";
import School from "@/Elements/Icons/SchoolIcon";
import Location from "@/Elements/Icons/Location";
import AnchorLink from "@/Components/Navigation/AnchorLink";
import { EventsSettingsProps } from "../Settings/Events";

export default function Shed({ eventsSettings }: { eventsSettings: EventsSettingsProps }) {

    const images: Gallery[] = [
        {
            title: "Games",
            imageLink: ShedGames
        },
        {
            title: "Friends",
            imageLink: ShedFriends
        },
        {
            title: "Bible Teaching",
            imageLink: ShedTeaching
        },
        {
            title: "Fun",
            imageLink: ShedFun
        },
        {
            title: "Food",
            imageLink: ShedFood
        },
        {
            title: "Activities",
            imageLink: ShedActivities
        },
        {
            title: "Skills",
            imageLink: ShedSkills
        },
        {
            title: "Challenges",
            imageLink: ShedChallenges
        }
    ];

    const shedCards: CardBlock[] = [
        {
            Icon: School,
            title: "What",
            description: "SHED Weekend",
            buttonText: "",
            buttonLink: ""
        },
        {
            Icon: Location,
            title: "Where",
            description: eventsSettings.shed_location,
            buttonText: "",
            buttonLink: ""
        },
        {
            Icon: Calendar,
            title: "When",
            description: eventsSettings.shed_dates,
            buttonText: "",
            buttonLink: ""
        },
        {
            Icon: Group,
            title: "Activities",
            description: <p>Sports, Games, Good Food, Time with friends, Bible Talks</p>,
            buttonText: "",
            buttonLink: ""
        },
        {
            Icon: QuestionMarkCircle,
            title: "Join",
            description: <p>Click the button below and fill in the form to sign up for this event!</p>,
            buttonText: "",
            buttonLink: ""
        },
    ];

    const descriptionText = <ParagraphContainer className="w-fit"><Paragraph className="mb-2 text-center">Postal Bible School - 049 555 2915</Paragraph><Paragraph className="mb-2 text-center">Gareth McMeekin - 047 56969/086 8519047</Paragraph><Paragraph className="mt-10 text-center">If you need directions or a lift, give us a call</Paragraph></ParagraphContainer>
    return (
        <WrapperLayout>
            <img src={ShedLogo} alt="The SHED logo" className="float-left w-40 mt-5 ml-5" />
            <EventWrapper title="The SHED">
                <ParagraphContainer className="mb-10">
                    <Paragraph>The Shed is a Christian youth group for young people (age 11+). It is run in association with Postal Bible School. It is usually run on the last Saturday of every month. Those involved in organising the Shed aim to teach the Bible and its importance to young people.</Paragraph>
                </ParagraphContainer>
                <ExtendScreenWrapper>
                    <GalleryBasic images={images}></GalleryBasic>
                </ExtendScreenWrapper>
                {eventsSettings.shed_isActive &&
                    <CardContainer cards={shedCards} >
                        <div className="flex justify-center">
                            <AnchorLink href={eventsSettings.shed_embedLink} newTab Icon={ExternalLink}>Sign up Google Form</AnchorLink>
                        </div>
                    </CardContainer>
                }
                {eventsSettings.shed_consentFormLink !== "" &&
                    <div className="mb-10">
                        <CardBlock buttonLink={eventsSettings.shed_consentFormLink} title="Contact" description={descriptionText} buttonText={`Download Consent Form ${eventsSettings.shed_year} (PDF)`} isExternal={true} />
                    </div>
                }
            </EventWrapper>
        </WrapperLayout>
    )
}