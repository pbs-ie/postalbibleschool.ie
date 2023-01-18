import CardContainer from "@/Components/CardContainer";
import GalleryAdvanced from "@/Components/Gallery/GalleryAdvanced";
import GalleryBasic from "@/Components/Gallery/GalleryBasic";
import Heading2 from "@/Components/Typography/Heading2";
import Paragraph from "@/Components/Typography/Paragraph";
import EventWrapper from "@/Layouts/EventWrapper";
import ExtendScreenWrapper from "@/Layouts/ExtendScreenWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";

import CampTeaching from "@images/camp/camp-teaching-min.jpg";
import CampFriends from "@images/camp/camp-friends-min.jpg";
import CampBeach from "@images/camp/camp-beach-min.jpg";
import CampFire from "@images/camp/camp-fire-min.jpg";
import CampSinging from "@images/camp/camp-singing-min.jpg";
import CampGames from "@images/camp/camp-games-min.jpg";
import CampCraft from "@images/camp/camp-craft-min.jpg";
import CampAdventure from "@images/camp/camp-adventure-min.jpg";

export default function Camp() {
    const images: Gallery[] = [
        {
            title: "Bible Teaching",
            imageLink: CampTeaching
        },
        {
            title: "New Friends",
            imageLink: CampFriends
        },
        {
            title: "Beach Day",
            imageLink: CampBeach
        },
        {
            title: "Camp Fire",
            imageLink: CampFire
        },
        {
            title: "Singing",
            imageLink: CampSinging
        },
        {
            title: "Team Games",
            imageLink: CampGames
        },
        {
            title: "Craft",
            imageLink: CampCraft
        },
        {
            title: "Adventure",
            imageLink: CampAdventure
        }
    ]
    return (
        <WrapperLayout>
            <EventWrapper title="Summer Camp">
                <ExtendScreenWrapper>
                    <GalleryBasic images={images}></GalleryBasic>
                </ExtendScreenWrapper>
                <CardContainer type="camp" />
                <Heading2>Camp</Heading2>
                <div className="w-3/4 mb-20 mx-auto">
                    <Paragraph>Camp is held each summer in mid-July and generally fills up extremely quickly after the forms go out in mid-May. Camp is held at Ovoca Manor just outside the village of Avoca and near Arklow in Co. Wicklow. Ovoca Manor is an outdoor adventure centre owned by Scripture Union. It offers accommodation and a whole range of activities. Our week at camp will typically involve some time in activities at the centre and several trips off site for other activities.</Paragraph>
                    <Paragraph>During the week campers can, among other things, participate in team sports, water sports, craft, activities, shop and visit the beach. Besides activity there is the opportunity to make new friends, explore new places and eat good food. Each day at camp we meet twice to learn from the Bible and have a speaker who seeks to make the messages relevant to young people, this is what we feel is the most important aspect of camp.</Paragraph>
                    <Paragraph>Camp is open to PBS students who are actively completing and returning lessons, and are over the age of 10 on the 1st January of the year in which camp takes place.</Paragraph>
                </div>
                <Heading2>Gallery</Heading2>

                <GalleryAdvanced></GalleryAdvanced>

                <Heading2>History</Heading2>
                <div className="w-3/4 mb-20 mx-auto">
                    <Paragraph>Summer camp is something that is very special to many of the young people who have had the opportunity for a week of “summer adventure”. PBS camp began in 1963 in Co. Cork and has visited a few locations down through the years. Most recently the Camp has been held at Ovoca Manor in Co. Wicklow. Some of the young people who have attended camp in recent years have parents who also attended PBS camps. Much has changed from some of those early camps. We have proper toilets, showers and dining halls. When we are travelling it's one person to a seat, instead of “how many can you get in”, but the central purpose of camp remains the same. That purpose is the teaching of the Bible to young people.</Paragraph>
                </div>
            </EventWrapper>
        </WrapperLayout>
    )
}