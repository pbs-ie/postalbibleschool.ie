import WrapperSidebarWithNavback from "@/Layouts/WrapperSidebarWithNavback";
import route from "ziggy-js";
import { BonusVideoProps } from "./Index";
import BonusVideoForm from "@/Components/Forms/BonusVideoForm";

export default function Edit({ videoData, canEdit }: { videoData: BonusVideoProps, canEdit?: boolean }) {

    return (
        <WrapperSidebarWithNavback title={"Edit - Bonus Assembly Video"} navBackText={"Back to Bonus Gallery"} navBackRoute={route('assembly.bonus.index')} canEdit={canEdit}>
            <BonusVideoForm videoData={videoData} />
        </WrapperSidebarWithNavback>
    )
}