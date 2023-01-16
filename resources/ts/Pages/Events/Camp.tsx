import CardContainer from "@/Components/CardContainer";
import GalleryAdvanced from "@/Components/Gallery/GalleryAdvanced";
import GalleryBasic from "@/Components/Gallery/GalleryBasic";
import Heading2 from "@/Components/Typography/Heading2";
import EventWrapper from "@/Layouts/EventWrapper";
import ExtendScreenWrapper from "@/Layouts/ExtendScreenWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";

export default function Camp() {
    return (
        <WrapperLayout>
            <EventWrapper title="Summer Camp">
                <ExtendScreenWrapper>
                    <GalleryBasic></GalleryBasic>
                </ExtendScreenWrapper>
                <CardContainer type="camp" />
                <Heading2>Camp</Heading2>
                <div className="w-full text-center ">
                    <p className="w-3/4 my-20 mx-auto text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut ea corporis minus qui amet velit deserunt fuga impedit quaerat quasi! Consequatur distinctio fugiat aspernatur, illum libero eligendi optio praesentium. Officia?<br />
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat inventore dolores minus corrupti est, ad odit sequi? Debitis illo velit ad, blanditiis, laboriosam officiis reiciendis sunt ex aperiam nisi beatae.<br />
                        Quo repudiandae delectus quae, sint dolor impedit! Similique corrupti tempora nisi vitae deleniti eum? Blanditiis commodi quidem nostrum vitae, earum maiores illo in obcaecati magni, fugit pariatur sunt similique cumque?</p>
                </div>
                <Heading2>Gallery</Heading2>

                <GalleryAdvanced></GalleryAdvanced>

                <Heading2>History</Heading2>
                <div className="w-full text-center ">
                    <p className="w-3/4 my-20 mx-auto text-center">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus necessitatibus cupiditate eos. Delectus, cumque! Itaque, iusto vero. Quisquam unde ea modi ullam quam sit quibusdam, qui a, veritatis, ipsa quo?<br />
                        Nemo voluptatem illum odio sint ipsa voluptate dolorem! Eligendi, illo. Autem reprehenderit maiores sed, quam ipsa in tempore eum nam! Incidunt quod possimus nisi libero similique mollitia repellat suscipit est.<br />
                        Maxime nisi tempora omnis eos consequuntur nostrum. Incidunt doloremque, laborum esse consequatur fugit eaque ex repellat? Aperiam autem fugit earum accusamus quae vitae minus rerum sapiente dolores, dolorem dolor quibusdam.</p>
                </div>
            </EventWrapper>
        </WrapperLayout>
    )
}