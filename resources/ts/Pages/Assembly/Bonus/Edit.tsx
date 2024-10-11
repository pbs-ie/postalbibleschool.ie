import route from "ziggy-js";

import { BonusVideoProps } from "@/Pages/Assembly/Bonus/Index";
import BonusVideoForm from "@/Components/Forms/BonusVideoForm";
import SettingSidebarWithNavbackLayout from "@/Layouts/SettingsSidebarWithNavbackLayout";

export default function Edit({ videoData }: { videoData: BonusVideoProps }) {

    return (
        <SettingSidebarWithNavbackLayout title={"Edit - Bonus Assembly Video"} navBackText={"Back to Bonus Admin"} navBackRoute={route('assembly.bonus.admin')} >
            <BonusVideoForm videoData={videoData} />
        </SettingSidebarWithNavbackLayout>
    )
}