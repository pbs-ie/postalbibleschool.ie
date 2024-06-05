import ButtonLink from "@/Elements/Buttons/ButtonLink";
import GalleryAssembly from "@/Components/Gallery/GalleryAssembly";
import BonusAssemblyWrapper from "@/Layouts/BonusAssemblyWrapper";
import route from "ziggy-js";

export default function Index({ bbwList = [], bbooksList = [], canEdit }: { bbwList: VideoListMeta[], bbooksList: VideoListMeta[], canEdit: boolean }) {
    return (
        <BonusAssemblyWrapper title={"Bonus Videos"} navBackText={"Back to Assembly Videos"} navBackRoute={route('assembly.index')}>
            {canEdit &&
                <div className="flex justify-end w-full gap-2">
                    <ButtonLink href={route('assembly.bonus.admin')}>Admin Panel</ButtonLink>
                    <ButtonLink href={route('assembly.bonus.create')}>Add New Video</ButtonLink>
                </div>
            }
            <GalleryAssembly headingText="Big Bible Words" videoList={bbwList}></GalleryAssembly>
            <GalleryAssembly headingText="Bible Books Explained" videoList={bbooksList}></GalleryAssembly>
        </BonusAssemblyWrapper>
    )
}