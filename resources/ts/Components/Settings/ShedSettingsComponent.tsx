import Heading2 from "@/Components/Typography/Heading2";
import Logo from "@images/shed/shed-logo.png";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import InputLabel2 from "../Forms/InputLabel2";
import RadioInput from "../Forms/RadioInput";
import PrimaryButton from "@/Elements/Buttons/PrimaryButton";

export default function ShedSettingsComponent({ eventSettings }: { eventSettings: SettingProps[] }) {
    const initialFormObject = {} as Record<SettingKeys, string | undefined>;
    eventSettings.forEach(({ key, value }) => {
        initialFormObject[key] = value;
    });
    const { data, setData, post } = useForm(initialFormObject);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        switch (event.target.name) {
            case "shed_upcoming_card":
                setData(event.target.name, event.target.value);
        }
    };
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(route('events.settings.store'));
    }

    return (
        <div className="w-full">
            <div className="w-full flex ">
                <img src={Logo} alt="The SHED Logo" className="w-32" />
                <Heading2>The SHED</Heading2>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col mx-4 items-end">
                <div className="flex justify-center border border-gray-200 w-3/4 p-5 rounded-md mb-2">
                    <fieldset className="inline-flex justify-between items-center gap-10 w-full">
                        <legend className="float-left font-bold">Show SHED Upcoming Card</legend>
                        <div className="inline-flex">
                            <InputLabel2 className="mr-2" forInput="true">
                                <RadioInput name={"shed_upcoming_card"} id={"true"} value={"1"} handleChange={handleChange} checked={data.shed_upcoming_card === "1"} />
                                Show
                            </InputLabel2>
                            <InputLabel2 className="mr-2" forInput="false">
                                <RadioInput name={"shed_upcoming_card"} id={"false"} value={"0"} handleChange={handleChange} checked={data.shed_upcoming_card === "0"} />
                                Hide
                            </InputLabel2>
                        </div>
                    </fieldset>
                </div>
                <div className="w-full flex justify-end">
                    <PrimaryButton>Submit</PrimaryButton>
                </div>
            </form>
        </div>

    )
}