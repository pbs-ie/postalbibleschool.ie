import EventCardContainer from "@/Components/Cards/EventCardContainer";
import GalleryBasic from "@/Components/Gallery/GalleryBasic";
import Paragraph from "@/Components/Typography/Paragraph";
import ParagraphContainer from "@/Components/Typography/ParagraphContainer";

import EventWrapper from "@/Layouts/EventWrapper";
import ExtendScreenWrapper from "@/Layouts/ExtendScreenWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";

import { EventsSettingsProps } from "@/Pages/Settings/Events";

import PrizesImage from "@images/prizegivings/prizegiving-prizes.jpg";
import StoriesImage from "@images/prizegivings/prizegiving-stories.jpg";
import QuizImage from "@images/prizegivings/prizegiving-quiz.jpg";
import SongsImage from "@images/prizegivings/prizegiving-songs.jpg";
import EventsImage from "@images/prizegivings/prizegiving-events.jpg";
import SchoolsImage from "@images/prizegivings/prizegiving-schools.jpg";
import TeamImage from "@images/prizegivings/prizegiving-team.jpg";
import CoffeeImage from "@images/prizegivings/prizegiving-tea-and-coffee.jpg";
import { useScrollTo } from "@/helper";

import Calendar from "@/Elements/Icons/Calendar";
import Location from "@/Elements/Icons/Location";
import route from "ziggy-js";


export default function Prizegivings({ eventsSettings, queryParams }: { eventsSettings: EventsSettingsProps, queryParams?: any }) {

    const images: Gallery[] = [
        {
            title: "Prizes",
            imageLink: PrizesImage
        },
        {
            title: "Stories",
            imageLink: StoriesImage
        },
        {
            title: "Quizzes",
            imageLink: QuizImage
        },
        {
            title: "Songs",
            imageLink: SongsImage
        },
        {
            title: "Tea and Coffee",
            imageLink: CoffeeImage
        },
        {
            title: "Events",
            imageLink: EventsImage
        },
        {
            title: "Schools",
            imageLink: SchoolsImage
        },
        {
            title: "Team",
            imageLink: TeamImage
        }
    ]

    useScrollTo(queryParams?.type ?? "", {
        duration: 1000,
        delay: 100,
        smooth: true,
        offset: -50
    });

    const prizegivingCards: CardBlock[] = [
        {
            Icon: Calendar,
            title: "When",
            description: "Prizegivings are held each year in a large number of venues across Ireland. They are generally held in the month of February, March and April",
            buttonText: "Download " + eventsSettings.prizegivings_year + " Schedule (PDF)",
            buttonLink: route('assets.download', eventsSettings.prizegivings_scheduleFileLink),
            isExternal: true
        },
        {
            Icon: Location,
            title: "Where",
            description: "We seek to make prizegiving easily accessible to as many of our students as possible. It is also possible that prizegivings be held in schools during school hours. Please contact us if you wish to discuss this",
            buttonText: "Contact Us",
            buttonLink: route('contactus')
        },
    ];

    return (
        <WrapperLayout>
            <EventWrapper title="Prizegivings">
                <ExtendScreenWrapper>
                    <GalleryBasic images={images}></GalleryBasic>
                </ExtendScreenWrapper>
                <ParagraphContainer className="mt-20">
                    <Paragraph>Throughout the year those who return lessons for marking are allocated marks for their work. The total marks accumulated from January to December each year is totalled and converted to a percentage. This percentage then entitles the student to one of four levels of prize. Each student is invited to attend a prizegiving of their choice to select their prize. A prizegiving will generally take between an hour and an hour and a half depending on the number attending. The evening will begin by students selecting their prizes. This will be followed by a short time of singing songs based on the Bible and an explanation of the Bible for young people. The evening will be concluded by the presentation of the prizes and refreshments.</Paragraph>
                    <Paragraph>Prizegivings are a special time for the staff of Postal Bible School as they get an opportunity to meet students and their families across Ireland.</Paragraph>
                </ParagraphContainer>
                {eventsSettings.prizegivings_isActive &&
                    <div id="prizegivings">
                        <EventCardContainer cards={prizegivingCards} />
                    </div>
                }
            </EventWrapper>
        </WrapperLayout>
    )
}