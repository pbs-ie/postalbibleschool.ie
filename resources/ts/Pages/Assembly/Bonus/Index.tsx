import GalleryAssembly from "@/Components/Gallery/GalleryAssembly";
import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";

export default function Index({ videoList = [], canEdit }: { videoList: VideoListMeta[], canEdit: boolean }) {
    return (
        <WrapperLayout>
            <ContentWrapper title="Bonus Videos">
                <GalleryAssembly canEdit={canEdit} headingText="Big Bible Words" videoList={videoList}></GalleryAssembly>
            </ContentWrapper>
        </WrapperLayout>
    )
}