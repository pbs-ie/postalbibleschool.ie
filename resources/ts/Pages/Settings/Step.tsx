import SettingsSidebar from "@/Components/Navigation/SettingsSidebar";
import StepRegistrationSettingsForm from "@/Components/Settings/Step/StepRegistrationSettingsForm";
import Heading2Alt from "@/Components/Typography/Heading2Alt";
import ButtonLink from "@/Elements/Buttons/ButtonLink";
import SettingsSection from "@/Elements/Sections/SettingsSection";
import SettingsLayout from "@/Layouts/SettingsLayout";
import route from "ziggy-js";

export interface EventSelectOption {
    id: number,
    topic: string
}

export default function Step({ stepSettings, eventOptions }: { stepSettings: StepSettingsProps, eventOptions: EventSelectOption[] }) {
    return (
        <SettingsLayout title={"STEP Settings"}>
            <SettingsSection>
                <StepRegistrationSettingsForm stepSettings={stepSettings} eventOptions={eventOptions} />

                <div>
                    <Heading2Alt>Event Manager</Heading2Alt>
                    <hr />
                    <ButtonLink href={route('events.step.past.admin')}>Go to management page</ButtonLink>
                </div>
            </SettingsSection>
        </SettingsLayout>
    )
}