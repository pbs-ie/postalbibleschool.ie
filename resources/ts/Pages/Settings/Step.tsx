import SettingsSidebar from "@/Components/Navigation/SettingsSidebar";
import StepRegistrationSettingsForm from "@/Components/Settings/Step/StepRegistrationSettingsForm";
import StepEventSettingsForm from "@/Components/Settings/Step/StepEventSettingsForm";
import Heading2Alt from "@/Components/Typography/Heading2Alt";
import SettingsLayout from "@/Layouts/SettingsLayout";

export default function Step() {
    return (
        <SettingsLayout title={"STEP Settings"}>
            <SettingsSidebar />
            <section className="px-4 py-4 sm:px-6 lg:px-12 space-y-8">
                <div>
                    <Heading2Alt>Event Details</Heading2Alt>
                    <hr />
                    <StepEventSettingsForm />
                </div>

                <div>
                    <Heading2Alt>Registration Details</Heading2Alt>
                    <hr />
                    <StepRegistrationSettingsForm />
                </div>
            </section>
        </SettingsLayout>
    )
}