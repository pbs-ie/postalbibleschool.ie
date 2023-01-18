import CardContainer from "@/Components/CardContainer";
import GalleryBasic from "@/Components/Gallery/GalleryBasic";
import Paragraph from "@/Components/Typography/Paragraph";
import EventWrapper from "@/Layouts/EventWrapper";
import ExtendScreenWrapper from "@/Layouts/ExtendScreenWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";

export default function Step() {
    const images: Gallery[] = [
        {
            title: "Teaching",
            imageLink: ""
        },
        {
            title: "Group Discussions",
            imageLink: ""
        },
        {
            title: "Singing",
            imageLink: ""
        },
        {
            title: "Fellowship",
            imageLink: ""
        },
        {
            title: "Reading",
            imageLink: ""
        },
        {
            title: "Games",
            imageLink: ""
        },
        {
            title: "Tea and Buns",
            imageLink: ""
        },
        {
            title: "Bible Study",
            imageLink: ""
        }
    ]
    return (
        <WrapperLayout>
            <EventWrapper title="STEP">
                <div className="w-3/4 mx-auto">
                    <Paragraph>The name STEP comes from the idea of progress, something that is important in spiritual life. The name is also an acronym for Sharing Truth and Encouraging Practice. At the core of STEP is a community of God's people who come together 3 times in the year for a weekend of in depth Bible study and encouraging each other in their Christian walk. It is for teens and young adults age 16+.</Paragraph>
                    <Paragraph>STEP weekends are a part of the work of Postal Bible School Ireland</Paragraph>
                </div>
                <ExtendScreenWrapper>
                    <GalleryBasic images={images}></GalleryBasic>
                </ExtendScreenWrapper>
                <CardContainer type="step" />
            </EventWrapper>
        </WrapperLayout>
    )
}