import CardContainer from "@/Components/CardContainer";
import GalleryBasic from "@/Components/Gallery/GalleryBasic";
import EventWrapper from "@/Layouts/EventWrapper";
import ExtendScreenWrapper from "@/Layouts/ExtendScreenWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";

export default function Step() {
    return (
        <WrapperLayout>
            <EventWrapper title="STEP">
                <ExtendScreenWrapper>
                    <GalleryBasic></GalleryBasic>
                </ExtendScreenWrapper>
                <CardContainer type="step" />
            </EventWrapper>
        </WrapperLayout>
    )
}