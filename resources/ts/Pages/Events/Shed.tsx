import CardBlock from "@/Components/CardBlock";
import CardContainer from "@/Components/CardContainer";
import GalleryBasic from "@/Components/Gallery/GalleryBasic";
import EventWrapper from "@/Layouts/EventWrapper";
import ExtendScreenWrapper from "@/Layouts/ExtendScreenWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";

export default function Shed() {
    const descriptionText = <p className="text-lg">
        Postal Bible School - 000 0000000<br />Gareth McMeekin- 000 000000 <br /><br />If you need directions or a lift, give us a call
    </p>
    return (
        <WrapperLayout>
            <EventWrapper title="The SHED">
                <div className="w-full">
                    <p className="w-3/4 my-20 mx-auto text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, numquam culpa. Esse sunt similique repellendus aspernatur, excepturi impedit dolore architecto unde? Facere ad numquam exercitationem, sint est ea quas excepturi.</p>
                </div>
                <ExtendScreenWrapper>
                    <GalleryBasic></GalleryBasic>
                </ExtendScreenWrapper>
                <CardContainer type="shed" />
                <div className="mb-10">
                    <CardBlock title="Contact" description={descriptionText} buttonText="Consent Form" />
                </div>
            </EventWrapper>
        </WrapperLayout>
    )
}