import SettingsRow from "@/Components/Settings/SettingsRow";
import EventWrapper from "@/Layouts/EventWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Elements/Buttons/PrimaryButton";
import { FormEvent } from "react";
import Heading2Nospace from "@/Components/Typography/Heading2Nospace";

export default function Settings({ eventSettings }: { eventSettings: { [K in SettingKeys]: SettingProps } }) {
    const initialFormObject = eventSettings;

    const { data, setData, post } = useForm(initialFormObject);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        switch (event.target.name) {
            case "shed_upcoming_card":
            case "camp_upcoming_card":
                const computedValue = eventSettings[event.target.name];
                computedValue.value = event.target.value;
                setData(event.target.name, computedValue);
                break;
        }
    };
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(route('events.settings.store'));
    }

    return (
        <WrapperLayout>
            <EventWrapper title="Event Settings">
                <form onSubmit={handleSubmit} >
                    <div className="grid grid-cols-[auto_1fr] gap-2 text-left items-center">
                        <Heading2Nospace>The SHED</Heading2Nospace>
                        <SettingsRow value={data.shed_upcoming_card.value} title={"Show SHED Upcoming Card"} name={data.shed_upcoming_card.key} handleChange={handleChange} />
                        <Heading2Nospace>Summer Camp</Heading2Nospace>
                        <SettingsRow value={data.camp_upcoming_card.value} title={"Show Camp Upcoming Card"} name={data.camp_upcoming_card.key} handleChange={handleChange} />
                    </div>
                    <div className="flex justify-end">
                        <PrimaryButton>Submit</PrimaryButton>
                    </div>
                </form>

            </EventWrapper>
        </WrapperLayout >
    )
}