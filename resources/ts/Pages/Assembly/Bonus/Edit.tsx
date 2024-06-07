import BonusAssemblyWrapper from "@/Layouts/BonusAssemblyWrapper";
import route from "ziggy-js";
import { BonusVideoProps } from "./Index";
import BonusVideoForm from "@/Components/Forms/BonusVideoForm";

export default function Edit({ videoData }: { videoData: BonusVideoProps }) {

    return (
        <BonusAssemblyWrapper title={"Edit - Bonus Assembly Video"} navBackText={"Back to Bonus Gallery"} navBackRoute={route('assembly.bonus.index')}>
            <BonusVideoForm videoData={videoData} />
        </BonusAssemblyWrapper>
    )
}