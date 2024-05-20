import { useForm } from "@inertiajs/react"
import { FormEvent } from "react";
import TextInput from "@/Elements/Forms/TextInput";
import InputLabel2 from "@/Elements/Forms/InputLabel2";
import PrimaryButton from "@/Elements/Buttons/PrimaryButton";
import InputError from "@/Components/Forms/InputError";

export default function StepRegistrationSettingsForm({ stepSettings }: { stepSettings: StepSettingsProps }) {
    const defaultData = {
        "topic": stepSettings.topic,
        "speaker": stepSettings.speaker,
        "dates": stepSettings.dates,
        "standardCost": stepSettings.standardCost,
        "concessionCost": stepSettings.concessionCost,
        "embedLink": stepSettings.embedLink,
        "isActive": stepSettings.isActive,
    }
    const { data, setData, put, errors } = useForm(defaultData);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch (event.target.name) {
            case "topic":
            case "speaker":
            case "dates":
            case "standardCost":
            case "concessionCost":
            case "embedLink":
            case "isActive":
                setData(event.target.name, event.target.value);
                break;
        }
    };


    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(data);
        put(route('settings.step.update'));
    }
    return (
        <form name="stepRegistrationSettingsForm" aria-label="STEP Settings form" onSubmit={handleSubmit} method="post" className="max-w-screen-md">
            <hr />
            <div className=" my-4">
                <div className=" grid grid-cols-2">
                    <div>
                        <InputLabel2 forInput={"topic"} value={"Topic"} />
                        <TextInput name={"topic"} id={"topic"} value={data.topic} handleChange={handleChange} />
                        <InputError message={errors.topic} />
                    </div>
                    <div>
                        <InputLabel2 forInput={"speaker"} value={"Speaker"} />
                        <TextInput name={"speaker"} id={"speaker"} value={data.speaker} handleChange={handleChange} />
                        <InputError message={errors.speaker} />
                    </div>
                    <div>
                        <InputLabel2 forInput={"dates"} value={"Dates"} />
                        <TextInput name={"dates"} id={"dates"} value={data.dates + ""} handleChange={handleChange} />
                        <InputError message={errors.dates} />
                    </div>
                    <div>
                        <InputLabel2 forInput={"standardCost"} value={"Standard Cost"} />
                        <TextInput name={"standardCost"} id={"standardCost"} value={data.standardCost + ""} handleChange={handleChange} />
                        <InputError message={errors.standardCost} />
                    </div>

                    <div>
                        <InputLabel2 forInput={"concessionCost"} value={"Concession/Student Cost"} />
                        <TextInput name={"concessionCost"} id={"concessionCost"} value={data.concessionCost + ""} handleChange={handleChange} />
                        <InputError message={errors.concessionCost} />
                    </div>
                    <div>
                        <InputLabel2 forInput={"embedLink"} value={"Google Form Embed Link"} />
                        <TextInput name={"embedLink"} id={"embedLink"} value={data.embedLink} handleChange={handleChange} />
                        <InputError message={errors.embedLink} />
                    </div>
                    <div>
                        <InputLabel2 forInput={"isActive"} value={"Is Registration Active?"} />
                        <TextInput name={"isActive"} id={"isActive"} value={data.isActive + ""} handleChange={handleChange} />
                        <InputError message={errors.isActive} />
                    </div>
                </div>
            </div>
            <div>
                <PrimaryButton>Update</PrimaryButton>
            </div>
        </form>
    )
}