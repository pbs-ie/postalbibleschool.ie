import ShedSettingsComponent from "@/Components/Settings/ShedSettingsComponent";
import EventWrapper from "@/Layouts/EventWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";

export default function Settings({ eventSettings }: { eventSettings: Record<SettingKeys, SettingProps> }) {
    return (
        <WrapperLayout>
            <EventWrapper title="Event Settings">
                <div className="flex">
                    <ShedSettingsComponent eventSettings={eventSettings} />

                </div>
            </EventWrapper>
        </WrapperLayout>
    )
}