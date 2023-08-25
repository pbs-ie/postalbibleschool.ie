import AnchorLink from "@/Components/Navigation/AnchorLink";
import Heading2 from "@/Components/Typography/Heading2";
import Paragraph from "@/Components/Typography/Paragraph";
import ParagraphContainer from "@/Components/Typography/ParagraphContainer";
import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";

export default function NotFound() {
    return (
        <WrapperLayout>
            <ContentWrapper title="Monthly Lesson Order">
                <Heading2>No Record</Heading2>
                <ParagraphContainer>
                    <Paragraph className="text-left">We do not have a record of your order with Postal Bible School. If this is a mistake or you wish to place a new order for lessons please <AnchorLink href={route('contactus')}>contact us</AnchorLink>.</Paragraph>
                </ParagraphContainer>
            </ContentWrapper>
        </WrapperLayout>
    )
}