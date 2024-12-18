import route from "ziggy-js";

import BonusVideoForm from "@/Components/Forms/BonusVideoForm";
import SettingSidebarWithNavbackLayout from "@/Layouts/SettingsSidebarWithNavbackLayout";


export default function Create() {

    return (
        <SettingSidebarWithNavbackLayout title={"Create New Bonus Assembly Video"} navBackText={"Back to Bonus Admin"} navBackRoute={route('assembly.bonus.admin')}>
            <BonusVideoForm />
        </SettingSidebarWithNavbackLayout>
    )
}