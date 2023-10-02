import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import GalleryAssembly from "@/Components/Gallery/GalleryAssembly";
import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { Link } from "@inertiajs/react";

export default function Index({ videoList = [], canEdit }: { videoList: VideoListMeta[], canEdit: boolean }) {
    return (
        <WrapperLayout>
            <ContentWrapper title="Bonus Videos">
                {canEdit &&
                    <div className="flex justify-end w-full gap-2">
                        <Link href={"/assembly/bonus/create"}><PrimaryButton>Add New</PrimaryButton></Link>
                    </div>
                }
                <GalleryAssembly headingText="Big Bible Words" videoList={videoList}></GalleryAssembly>
            </ContentWrapper>
        </WrapperLayout>
    )
}