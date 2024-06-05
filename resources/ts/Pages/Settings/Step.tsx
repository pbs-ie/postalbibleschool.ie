import SettingsSidebar from "@/Components/Navigation/SettingsSidebar";
import StepRegistrationSettingsForm from "@/Components/Settings/Step/StepRegistrationSettingsForm";
import Heading2Alt from "@/Components/Typography/Heading2Alt";
import ButtonLink from "@/Elements/Buttons/ButtonLink";
import SettingsLayout from "@/Layouts/SettingsLayout";
import route from "ziggy-js";

export default function Step({ stepSettings }: { stepSettings: StepSettingsProps }) {
    return (
        <SettingsLayout title={"STEP Settings"}>
            <SettingsSidebar />
            <section className="px-4 py-4 space-y-8 sm:px-6 lg:px-12">

                <div>
                    <Heading2Alt>Registration Details</Heading2Alt>
                    <hr />
                    <StepRegistrationSettingsForm stepSettings={stepSettings} />
                </div>

                <div>
                    <Heading2Alt>Past Events Management</Heading2Alt>
                    <hr />
                    <ButtonLink href={route('events.step.past.admin')}>Go to management page</ButtonLink>
                </div>
            </section>
        </SettingsLayout>
    )
}