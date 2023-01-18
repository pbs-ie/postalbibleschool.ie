import CardBlock from "@/Components/CardBlock";
import CardContainer from "@/Components/CardContainer";
import GalleryBasic from "@/Components/Gallery/GalleryBasic";
import Paragraph from "@/Components/Typography/Paragraph";
import EventWrapper from "@/Layouts/EventWrapper";
import ExtendScreenWrapper from "@/Layouts/ExtendScreenWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";

import ShedGames from "@images/shed/shed-games.jpg";
import ShedFriends from "@images/shed/shed-friends.jpg";
import ShedTeaching from "@images/shed/shed-teaching.jpg";
import ShedFun from "@images/shed/shed-fun.jpg";
import ShedFood from "@images/shed/shed-food.jpg";
import ShedActivities from "@images/shed/shed-activities.jpg";
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
            imageLink: ""
        },
        {
            title: "Challenges",
            imageLink: ShedChallenges
        }
    ]
    const descriptionText = <><Paragraph className="text-base mb-2">Postal Bible School - 049 555 2915</Paragraph><Paragraph>Gareth McMeekin - 047 56969/086 8519047</Paragraph><Paragraph className="mt-10">If you need directions or a lift, give us a call</Paragraph></>
    return (
        <WrapperLayout>
            <EventWrapper title="The SHED">
                <div className="w-3/4 mx-auto my-10">
                    <Paragraph>The Shed is a Christian youth group for young people (age 11+). It is run in association with Postal Bible School. It is usually run on the last Saturday of every month. Those involved in organising the Shed aim to teach the Bible and its importance to young people.</Paragraph>
                </div>
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