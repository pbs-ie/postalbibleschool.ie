import { PastEventCardProps } from "@/Components/Cards/StepEventCard";
import EventManagementTable from "@/Components/Settings/Step/StepManagementTable";
import StepRegistrationSettingsForm from "@/Components/Settings/Step/StepRegistrationSettingsForm";
import SettingsSection from "@/Elements/Sections/SettingsSection";
import SettingsLayout from "@/Layouts/SettingsLayout";

export interface EventSelectOption {
    id: number,
    topic: string
}

export default function Step({ stepSettings, eventOptions, allEvents = [] }: { stepSettings: StepSettingsProps, eventOptions: EventSelectOption[], allEvents: PastEventCardProps[] }) {
    return (
        <SettingsLayout title={"STEP Settings"}>
            <SettingsSection>
                <StepRegistrationSettingsForm stepSettings={stepSettings} eventOptions={eventOptions} />

                <EventManagementTable allEvents={allEvents} />
            </SettingsSection>
        </SettingsLayout>
    )
}