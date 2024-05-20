import SettingsSidebar from "@/Components/Navigation/SettingsSidebar";
import StepRegistrationSettingsForm from "@/Components/Settings/Step/StepRegistrationSettingsForm";
import Heading2Alt from "@/Components/Typography/Heading2Alt";
import SettingsLayout from "@/Layouts/SettingsLayout";


export default function Step({ stepSettings }: { stepSettings: StepSettingsProps }) {
    return (
        <SettingsLayout title={"STEP Settings"}>
            <SettingsSidebar />
            <section className="px-4 py-4 sm:px-6 lg:px-12 space-y-8">

                <div>
                    <Heading2Alt>Registration Details</Heading2Alt>
                    <hr />
                    <StepRegistrationSettingsForm stepSettings={stepSettings} />
                </div>
            </section>
        </SettingsLayout>
    )
}