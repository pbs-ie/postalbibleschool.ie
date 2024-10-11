import route from "ziggy-js";

import AssemblyVideoForm from "@/Components/Forms/AssemblyVideoForm";
import SettingSidebarWithNavbackLayout from "@/Layouts/SettingsSidebarWithNavbackLayout";

export default function Create() {
    return (
        <SettingSidebarWithNavbackLayout title="Create New Assembly" navBackText={"Back to Admin"} navBackRoute={route('assembly.admin')}>
            <AssemblyVideoForm />
        </SettingSidebarWithNavbackLayout>
    )
}