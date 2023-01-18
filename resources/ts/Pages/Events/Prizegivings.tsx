import CardContainer from "@/Components/CardContainer";
import GalleryBasic from "@/Components/Gallery/GalleryBasic";
import Paragraph from "@/Components/Typography/Paragraph";
import EventWrapper from "@/Layouts/EventWrapper";
import ExtendScreenWrapper from "@/Layouts/ExtendScreenWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";

export default function Prizegivings() {
    return (
        <WrapperLayout>
            <EventWrapper title="Prizegivings">
                <ExtendScreenWrapper>
                    <GalleryBasic></GalleryBasic>
                </ExtendScreenWrapper>
                <div className="w-full">
                    <Paragraph className="w-3/4 my-20 mx-auto text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempus eget sagittis dignissim sodales porta ullamcorper condimentum etiam euismod. Magna sapien interdum magnis vel sociosqu magna parturient condimentum faucibus aenean. Curae vitae lacinia sed nulla ipsum vitae ultricies aliquet tincidunt et. Phasellus ridiculus luctus est molestie primis elit adipiscing quam rutrum eu. Mauris mi convallis massa quam ad fringilla curae lobortis velit ligula.<br />
                        Sit mattis duis fusce nascetur sollicitudin in sollicitudin mi dolor dictum. Lorem quis vel curabitur nam dictumst tortor condimentum diam quis sit. Penatibus lacinia aptent praesent nam porttitor pretium natoque penatibus nec massa. Mus lacinia vestibulum gravida mauris dolor nunc platea vivamus lectus nascetur. Eu nostra etiam vestibulum tincidunt cubilia platea potenti primis blandit donec. Mi eros commodo elit leo venenatis conubia tortor proin maecenas nec.</Paragraph>
                </div>
                <CardContainer type="prizegivings" />
            </EventWrapper>
        </WrapperLayout>
    )
}