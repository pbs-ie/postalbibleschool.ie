import ShedSettingsComponent from "@/Components/EventAdmin/ShedAdminComponent";
import EventWrapper from "@/Layouts/EventWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";

export default function Settings({ eventSettings }: { eventSettings: Setting[] }) {
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