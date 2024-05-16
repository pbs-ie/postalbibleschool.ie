import SettingsSidebar from "@/Components/Navigation/SettingsSidebar";
import Heading2Alt from "@/Components/Typography/Heading2Alt";
import SettingsLayout from "@/Layouts/SettingsLayout";

export default function Step() {
    return (
        <SettingsLayout title={"STEP Settings"}>
            <SettingsSidebar />
            <section className="px-4 py-4 sm:px-6 lg:px-12">
                <Heading2Alt>STEP Settings Page</Heading2Alt>
                <hr />


            </section>
        </SettingsLayout>
    )
}