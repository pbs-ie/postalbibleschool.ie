import WrapperSidebarWithNavback from "@/Layouts/WrapperSidebarWithNavback";
import route from "ziggy-js";
import BonusVideoForm from "@/Components/Forms/BonusVideoForm";


export default function Create({ canEdit }: { canEdit?: boolean }) {

    return (
        <WrapperSidebarWithNavback title={"Create New Bonus Assembly Video"} navBackText={"Back to Bonus Gallery"} navBackRoute={route('assembly.bonus.index')} canEdit={canEdit}>
            <BonusVideoForm />
        </WrapperSidebarWithNavback>
    )
}