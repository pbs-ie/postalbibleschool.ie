import CardBlock from "@/Components/CardBlock";
import CardContainer from "@/Components/CardContainer";
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

export default function Shed() {
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
    ]
    const descriptionText = <ParagraphContainer className="w-fit"><Paragraph className="mb-2 text-center">Postal Bible School - 049 555 2915</Paragraph><Paragraph className="mb-2 text-center">Gareth McMeekin - 047 56969/086 8519047</Paragraph><Paragraph className="mt-10 text-center">If you need directions or a lift, give us a call</Paragraph></ParagraphContainer>
    return (
        <WrapperLayout>
            <EventWrapper title="The SHED">
                <ParagraphContainer className="mb-10">
                    <Paragraph>The Shed is a Christian youth group for young people (age 11+). It is run in association with Postal Bible School. It is usually run on the last Saturday of every month. Those involved in organising the Shed aim to teach the Bible and its importance to young people.</Paragraph>
                </ParagraphContainer>
                <ExtendScreenWrapper>
                    <GalleryBasic images={images}></GalleryBasic>
                </ExtendScreenWrapper>
                <CardContainer type="shed" />
                <div className="mb-10">
                    <CardBlock title="Contact" description={descriptionText} buttonText="Consent Form" />
                </div>
            </EventWrapper>
        </WrapperLayout>
    )
}