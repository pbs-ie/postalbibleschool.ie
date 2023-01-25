import TeachingImage from "@images/step/step-teaching.jpg";
import DiscussionImage from "@images/step/step-discussion.jpg";
import SingingImage from "@images/step/step-singing.jpg";
import FellowshipImage from "@images/step/step-fellowship.jpg";
import ReadingImage from "@images/step/step-reading.jpg";
import GamesImage from "@images/step/step-games.jpg";
import BunsImage from "@images/step/step-buns.jpg";
import StudyImage from "@images/step/step-study.jpg";

import CardContainer from "@/Components/CardContainer";
import GalleryBasic from "@/Components/Gallery/GalleryBasic";
import Paragraph from "@/Components/Typography/Paragraph";
import EventWrapper from "@/Layouts/EventWrapper";
import ExtendScreenWrapper from "@/Layouts/ExtendScreenWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";
import ParagraphContainer from "@/Components/Typography/ParagraphContainer";
import PrimaryButton from "@/Components/PrimaryButton";
import Heading2 from "@/Components/Typography/Heading2";

export default function About() {
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
        <WrapperLayout showSecondaryNav={true}>
            <EventWrapper title="STEP">
                <ParagraphContainer className="mb-10">
                    <Paragraph>The name STEP comes from the idea of progress, something that is important in spiritual life. The name is also an acronym for Sharing Truth and Encouraging Practice. At the core of STEP is a community of God's people who come together 3 times in the year for a weekend of in depth Bible study and encouraging each other in their Christian walk. It is for teens and young adults age 16+.</Paragraph>
                    <Paragraph>STEP weekends are a part of the work of Postal Bible School Ireland</Paragraph>
                </ParagraphContainer>
                <ExtendScreenWrapper>
                    <GalleryBasic images={images}></GalleryBasic>
                </ExtendScreenWrapper>
                <CardContainer type="step">
                    <a href="https://sites.google.com/postalbibleschool.ie/step/register" target="_blank"><PrimaryButton className="text-base">Sign Up</PrimaryButton></a>
                </CardContainer>
                <section>
                    <Heading2>What to expect</Heading2>
                    <ParagraphContainer>
                        <Paragraph>Over several years we covered a range of topics at STEP, but the weekends are study focused as opposed to centered on activities or entertainment. This is always plenty of time for fellowhip, but the main focus is Bible study.</Paragraph>
                        <Paragraph>Our teaching usually takes the form of teaching sessions, reflection time and discussion groups.</Paragraph>
                        <Paragraph>We regularly seek to unpack big Bible books in a single weekend as well as handle relecant topics. In recent years we have looked at books like Genesis, John, Isaiah and the Psalms as well as topics like the Tabernacle, Christian Service and Bible History.</Paragraph>
                    </ParagraphContainer>
                </section>
                <ExtendScreenWrapper>
                    <section className="pb-16 bg-stone-100">
                        <Heading2>Location</Heading2>
                        <div className="flex flex-col gap-10 mx-auto md:flex-row md:w-3/4">
                            <div id="castledaly-location">
                                <iframe className="border border-black" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2380.034969766731!2d-7.80367208441075!3d53.378423780009456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x485c4c9204f232b9%3A0x142951a650ea93b6!2sCastledaly%20Manor%20-%20BCM%20Ireland!5e0!3m2!1sen!2suk!4v1674635864862!5m2!1sen!2suk" width="500" height="400" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                            <div className="text-left">
                                <Paragraph className="text-black">Castledaly Manor is a Christian Camp and Conference Centre in the heart of Ireland.</Paragraph>
                                <Paragraph className="text-black">It is owned by Bible Centred Ministries (BCM) Ireland, who run camps throughout the year. It is also used as a retreat and conference centre by churches and other Christian organisations. To know more check out their Facebook page.</Paragraph>
                            </div>
                        </div>
                    </section>
                </ExtendScreenWrapper>
                <section>
                    <Heading2>History</Heading2>
                    <ParagraphContainer>
                        <Paragraph>For longer than we can remember Postal Bible School has been running Summer Camps where young people come together for fun, fellowship and learning the Word of God. At a few times over the years there have been attempts to continue to provide that experience for those who were too old for camp but only as one off events. In the Summer of 2012, as a group of teens left their final year of camp the idea of a weekend together for teens and young adults was reborn. Since January 2013 we have been holding 3 weekend events each year. In the early days it was just 12-20 each weekend but that has now grown to as many as 70. As friends have brought others over the years the group has expanded to reflect an Irish focus with an International flavour. As we moved online during the pandemic past attendees from several countries and continents were able to join in the teaching sessions. In November 2021 we returned to in person events with our largest attendance to date despite a few restrictions.</Paragraph>
                    </ParagraphContainer>
                </section>

            </EventWrapper>
        </WrapperLayout>
    )
}