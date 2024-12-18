import route from "ziggy-js";

import AssemblyVideoForm from "@/Components/Forms/AssemblyVideoForm";
import { AssemblyVideoProps } from "@/Pages/Assembly/Index";
import SettingSidebarWithNavbackLayout from "@/Layouts/SettingsSidebarWithNavbackLayout";

export default function Edit({ videoData }: { videoData: AssemblyVideoProps }) {

    return (
        <SettingSidebarWithNavbackLayout title="Edit Assembly" navBackText={"Back to Admin"} navBackRoute={route('assembly.admin')}>
            <AssemblyVideoForm videoData={videoData} />
        </SettingSidebarWithNavbackLayout>
    )
}