import CardContainer from "@/Components/CardContainer";
import GalleryBasic from "@/Components/Gallery/GalleryBasic";
import Paragraph from "@/Components/Typography/Paragraph";
import EventWrapper from "@/Layouts/EventWrapper";
import ExtendScreenWrapper from "@/Layouts/ExtendScreenWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";

import TeachingImage from "@images/step/step-teaching.jpg";
import DiscussionImage from "@images/step/step-discussion.jpg";
import SingingImage from "@images/step/step-singing.jpg";
import FellowshipImage from "@images/step/step-fellowship.jpg";
import ReadingImage from "@images/step/step-reading.jpg";
import GamesImage from "@images/step/step-games.jpg";
import BunsImage from "@images/step/step-buns.jpg";
import StudyImage from "@images/step/step-study.jpg";
import ParagraphContainer from "@/Components/Typography/ParagraphContainer";
import { Link } from "@inertiajs/inertia-react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Step() {
    const images: Gallery[] = [
        {
            title: "Teaching",
            imageLink: TeachingImage
        },
        {
            title: "Group Discussions",
            imageLink: DiscussionImage
        },
        {
            title: "Singing",
            imageLink: SingingImage
        },
        {
            title: "Fellowship",
            imageLink: FellowshipImage
        },
        {
            title: "Reading",
            imageLink: ReadingImage
        },
        {
            title: "Games",
            imageLink: GamesImage
        },
        {
            title: "Tea and Buns",
            imageLink: BunsImage
        },
        {
            title: "Bible Study",
            imageLink: StudyImage
        }
    ]
    return (
        <WrapperLayout>
            <EventWrapper title="STEP">
                <ParagraphContainer className="mb-10">
                    <Paragraph>The name STEP comes from the idea of progress, something that is important in spiritual life. The name is also an acronym for Sharing Truth and Encouraging Practice. At the core of STEP is a community of God's people who come together 3 times in the year for a weekend of in depth Bible study and encouraging each other in their Christian walk. It is for teens and young adults age 16+.</Paragraph>
                    <Paragraph>STEP weekends are a part of the work of Postal Bible School Ireland</Paragraph>
                </ParagraphContainer>
                <ExtendScreenWrapper>
                    <GalleryBasic images={images}></GalleryBasic>
                </ExtendScreenWrapper>
                <CardContainer type="step" />
                <a href="https://sites.google.com/postalbibleschool.ie/step/register" target="_blank"><PrimaryButton className="w-3/4 text-base">Sign Up</PrimaryButton></a>
            </EventWrapper>
        </WrapperLayout>
    )
}