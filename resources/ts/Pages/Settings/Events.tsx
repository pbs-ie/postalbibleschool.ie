import PrizegivingsSettingsForm from "@/Components/Settings/PrizegivingsSettingsForm";
import ShedSettingsForm from "@/Components/Settings/ShedSettingsForm";
import SettingsSection from "@/Elements/Sections/SettingsSection";
import SettingsLayout from "@/Layouts/SettingsLayout";

export interface EventsSettingsProps {
    shed_dates: string,
    shed_location: string,
    shed_year: string,
    shed_embedLink: string,
    shed_isActive: boolean,
    shed_consentForm?: File | null,
    shed_consentFormLink?: string,
    prizegivings_scheduleFile?: File | null,
    prizegivings_scheduleFileLink?: string,
    prizegivings_year: string,
    prizegivings_isActive: boolean,
}
export default function Events({ eventsSettings }: { eventsSettings: EventsSettingsProps }) {
    return (
        <SettingsLayout title={"Other Events Settings"}>
            <SettingsSection>

                <div>
                    <PrizegivingsSettingsForm eventsSettings={eventsSettings} />
                    <ShedSettingsForm eventsSettings={eventsSettings} />
                </div>
            </SettingsSection>
        </SettingsLayout>
    )
}