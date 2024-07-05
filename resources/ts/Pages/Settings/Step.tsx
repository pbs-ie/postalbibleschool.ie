import SettingsSidebar from "@/Components/Navigation/SettingsSidebar";
import StepRegistrationSettingsForm from "@/Components/Settings/Step/StepRegistrationSettingsForm";
import Heading2Alt from "@/Components/Typography/Heading2Alt";
import ButtonLink from "@/Elements/Buttons/ButtonLink";
import SettingsSection from "@/Elements/Sections/SettingsSection";
import SettingsLayout from "@/Layouts/SettingsLayout";
import route from "ziggy-js";

export default function Step({ stepSettings }: { stepSettings: StepSettingsProps }) {
    return (
        <SettingsLayout title={"STEP Settings"}>
            <SettingsSection>
                <div>
                    <Heading2Alt>Active Event</Heading2Alt>
                    <hr />
                    <StepRegistrationSettingsForm stepSettings={stepSettings} />
                </div>

                <div>
                    <Heading2Alt>Past Events Management</Heading2Alt>
                    <hr />
                    <ButtonLink href={route('events.step.past.admin')}>Go to management page</ButtonLink>
                </div>
            </SettingsSection>
        </SettingsLayout>
    )
}