import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import GalleryAssembly from "@/Components/Gallery/GalleryAssembly";
import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { Link } from "@inertiajs/react";

export default function Index({ bbwList = [], bbooksList = [], canEdit }: { bbwList: VideoListMeta[], bbooksList: VideoListMeta[], canEdit: boolean }) {
    return (
        <WrapperLayout>
            <ContentWrapper title="Bonus Videos">
                {canEdit &&
                    <div className="flex justify-end w-full gap-2">
                        <Link href={route('assembly.bonus.admin')}><PrimaryButton>Admin Panel</PrimaryButton></Link>
                        <Link href={route('assembly.bonus.create')}><PrimaryButton>Add New Video</PrimaryButton></Link>
                    </div>
                }
                <GalleryAssembly headingText="Big Bible Words" videoList={bbwList}></GalleryAssembly>
                <GalleryAssembly headingText="Bible Books Explained" videoList={bbooksList}></GalleryAssembly>
            </ContentWrapper>
        </WrapperLayout>
    )
}