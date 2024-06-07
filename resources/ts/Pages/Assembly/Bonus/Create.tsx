import BonusAssemblyWrapper from "@/Layouts/BonusAssemblyWrapper";
import route from "ziggy-js";
import BonusVideoForm from "@/Components/Forms/BonusVideoForm";


export default function Create() {

    return (
        <BonusAssemblyWrapper title={"Create New Bonus Assembly Video"} navBackText={"Back to Bonus Gallery"} navBackRoute={route('assembly.bonus.index')}>
            <BonusVideoForm />
        </BonusAssemblyWrapper>
    )
}