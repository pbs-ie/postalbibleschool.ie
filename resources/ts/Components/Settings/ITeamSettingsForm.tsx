import { useForm } from "@inertiajs/react"
import { FormEvent } from "react";
import TextInput from "@/Elements/Forms/TextInput";
import InputLabel2 from "@/Elements/Forms/InputLabel2";
import PrimaryButton from "@/Elements/Buttons/PrimaryButton";
import InputError from "@/Components/Forms/InputError";
import SelectInput from "@/Elements/Forms/SelectInput";
import FileInput from "@/Elements/Forms/FileInput";
import { ITeamSettingProps } from "@/Pages/Events/ITeam";

export default function ITeamSettingsForm({ iteamSettings }: { iteamSettings: ITeamSettingProps }) {
    const defaultData = {
        "dates": iteamSettings.dates,
        "embedLink": iteamSettings.embedLink,
        "isActive": iteamSettings.isActive,
        "eventImage": iteamSettings.eventImage,
        "eventImageLink": iteamSettings.eventImageLink
    }
    const { data, setData, post, errors } = useForm(defaultData);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        switch (event.target.name) {
            case "dates":
            case "embedLink":
            case "isActive":
                setData(event.target.name, event.target.value);
                break;
        }
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === "eventImage" && event.target.files) {
            setData(event.target.name, event.target.files[0]);
        }
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(route('settings.iteam.update'));
    }
    return (
        <form name="iteamSettingsForm" aria-label="iTeam Settings form" onSubmit={handleSubmit} method="post" className="max-w-screen-md">
            <hr />
            <div className=" my-4">
                <div className=" grid grid-cols-2">

                    <div>
                        <InputLabel2 forInput={"dates"} value={"Dates"} />
                        <TextInput name={"dates"} id={"dates"} value={data.dates + ""} handleChange={handleChange} />
                        <InputError message={errors.dates} />
                    </div>

                    <div>
                        <InputLabel2 forInput={"embedLink"} value={"Google Form Embed Link"} />
                        <TextInput name={"embedLink"} id={"embedLink"} value={data.embedLink} handleChange={handleChange} />
                        <InputError message={errors.embedLink} />
                    </div>
                    <div>
                        <InputLabel2 forInput={"isActive"} value={"Is Registration Active?"} />
                        <SelectInput name="isActive" id="isActive" handleChange={handleChange} defaultValue={data.isActive + ""}>
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </SelectInput>
                        <InputError message={errors.isActive} />
                    </div>
                </div>
                <div className="inline-flex gap-2 mt-4">
                    <InputLabel2 forInput={"eventImage"} value={"Banner Image"} />
                    <FileInput name={"eventImage"} id={"eventImage"} className={""} handleChange={handleFileChange} accept="image/png, image/jpeg" />
                    <InputError message={errors.eventImage} />
                </div>
                <img className="w-60" src={data.eventImage ? URL.createObjectURL(data.eventImage) : route('images.show', data.eventImageLink)} />
            </div>
            <div>
                <PrimaryButton>Update</PrimaryButton>
            </div>
        </form>
    )
}