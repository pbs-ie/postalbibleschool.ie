import ButtonLink from "@/Elements/Buttons/ButtonLink";
import BonusAssemblyWrapper from "@/Layouts/BonusAssemblyWrapper";
import route from "ziggy-js";
import BonusVideoGallery from "@/Components/Gallery/BonusVideoGallery";

export interface BonusVideoProps {
    id: number,
    title: string,
    imageFile?: File | null,
    imageLink: string,
    videoTitle: string,
    externalUrl: string,
    duration: string,
    category: string
}

export default function Index({ bbwList = [], bbooksList = [], canEdit }: { bbwList: BonusVideoProps[], bbooksList: BonusVideoProps[], canEdit: boolean }) {
    return (
        <BonusAssemblyWrapper title={"Bonus Videos"} navBackText={"Back to Assembly Videos"} navBackRoute={route('assembly.index')}>
            {canEdit &&
                <div className="flex justify-end w-full gap-2">
                    <ButtonLink dataTest="bonus_admin_button" href={route('assembly.bonus.admin')}>Admin Panel</ButtonLink>
                    <ButtonLink dataTest="add_new_bonus_button" href={route('assembly.bonus.create')}>Add New Video</ButtonLink>
                </div>
            }
            <BonusVideoGallery headingText="Big Bible Words" videoList={bbwList}></BonusVideoGallery>
            <BonusVideoGallery headingText="Bible Books Explained" videoList={bbooksList}></BonusVideoGallery>
        </BonusAssemblyWrapper>
    )
}