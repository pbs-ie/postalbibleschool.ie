import CardContainer from "@/Components/CardContainer";
import GalleryBasic from "@/Components/Gallery/GalleryBasic";
import Paragraph from "@/Components/Typography/Paragraph";
import EventWrapper from "@/Layouts/EventWrapper";
import ExtendScreenWrapper from "@/Layouts/ExtendScreenWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";

export default function Prizegivings() {
    const images: Gallery[] = [
        {
            title: "Prizes",
            imageLink: ""
        },
        {
            title: "Stories",
            imageLink: ""
        },
        {
            title: "Quizzes",
            imageLink: ""
        },
        {
            title: "Songs",
            imageLink: ""
        },
        {
            title: "Friends",
            imageLink: ""
        },
        {
            title: "Events",
            imageLink: ""
        },
        {
            title: "Schools",
            imageLink: ""
        },
        {
            title: "Team",
            imageLink: ""
        }
    ]
    return (
        <WrapperLayout>
            <EventWrapper title="Prizegivings">
                <ExtendScreenWrapper>
                    <GalleryBasic images={images}></GalleryBasic>
                </ExtendScreenWrapper>
                <div className="w-3/4 mx-auto my-20">
                    <Paragraph>Throughout the year those who returns lessons for marking are allocated marks for their work. The total marks accumulated from January to December each year is totalled and converted to a percentage. This percentage then entitles the student to one of four levels of prize. Each student is invited to attend a prizegiving of their choice to select their prize. A prizegiving will generally take between an hour and an hour and a half depending on the number attending. The evening will begin by students selecting their prizes. This will be followed by a short time of singing songs based on the Bible and an explanation of the Bible for young people. The evening will be concluded by the presentation of the prizes and refreshments.</Paragraph>
                    <Paragraph>Prizegivings are a special time for the staff of Postal Bible School as they get an opportunity to meet students and their families across Ireland.</Paragraph>
                </div>
                <CardContainer type="prizegivings" />
            </EventWrapper>
        </WrapperLayout>
    )
}