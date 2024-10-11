import WrapperWithNavback from "@/Layouts/WrapperWithNavback";
import route from "ziggy-js";
import BonusVideoForm from "@/Components/Forms/BonusVideoForm";


export default function Create() {

    return (
        <WrapperWithNavback title={"Create New Bonus Assembly Video"} navBackText={"Back to Bonus Gallery"} navBackRoute={route('assembly.bonus.index')}>
            <BonusVideoForm />
        </WrapperWithNavback>
    )
}