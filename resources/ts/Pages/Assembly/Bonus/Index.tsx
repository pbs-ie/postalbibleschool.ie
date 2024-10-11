import WrapperSidebarWithNavback from "@/Layouts/WrapperSidebarWithNavback";
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
        <WrapperSidebarWithNavback title={"Bonus Videos"} canEdit={canEdit}>
            <div>
                <BonusVideoGallery headingText="Big Bible Words" videoList={bbwList}></BonusVideoGallery>
                <BonusVideoGallery headingText="Bible Books Explained" videoList={bbooksList}></BonusVideoGallery>
            </div>
        </WrapperSidebarWithNavback>
    )
}