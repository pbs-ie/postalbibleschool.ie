import CardContainer from "@/Components/CardContainer";
import GalleryBasic from "@/Components/Gallery/GalleryBasic";
import EventWrapper from "@/Layouts/EventWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";

export default function Step() {
    return (
        <WrapperLayout>
            <EventWrapper title="STEP">
                <div className="w-screen relative right-1/2 left-1/2 -mx-[50vw] px-5 py-3">
                    <GalleryBasic></GalleryBasic>
                </div>
                <CardContainer type="step" />
            </EventWrapper>
        </WrapperLayout>
    )
}