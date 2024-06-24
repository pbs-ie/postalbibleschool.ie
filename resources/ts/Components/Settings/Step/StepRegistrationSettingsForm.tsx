import { useForm } from "@inertiajs/react"
import { FormEvent, useEffect, useState } from "react";
import TextInput from "@/Elements/Forms/TextInput";
import InputLabel2 from "@/Elements/Forms/InputLabel2";
import PrimaryButton from "@/Elements/Buttons/PrimaryButton";
import InputError from "@/Elements/Forms/InputError";
import SelectInput from "@/Elements/Forms/SelectInput";
import FileInput from "@/Elements/Forms/FileInput";
import route from "ziggy-js";
import TextAreaInput from "@/Elements/Forms/TextAreaInput";
import PdfViewerComponent from "@/Components/PdfViewerComponent";
import NumberInput from "@/Elements/Forms/NumberInput";

export default function StepRegistrationSettingsForm({ stepSettings }: { stepSettings: StepSettingsProps }) {
    const [localScheduleFileLink, setLocalScheduleFileLink] = useState<string>();
    const [defaultData, setDefaultData] = useState({
        "topic": stepSettings.topic,
        "speaker": stepSettings.speaker,
        "description": stepSettings.description,
        "dates": stepSettings.dates,
        "standardCost": stepSettings.standardCost,
        "concessionCost": stepSettings.concessionCost,
        "embedLink": stepSettings.embedLink,
        "isActive": stepSettings.isActive,
        "eventImage": stepSettings.eventImage,
        "eventImageLink": stepSettings.eventImageLink,
        "scheduleFile": stepSettings.scheduleFile,
        "scheduleFileLink": stepSettings.scheduleFileLink
    });
    useEffect(() => {
        setDefaultData({
            "topic": stepSettings.topic,
            "speaker": stepSettings.speaker,
            "description": stepSettings.description,
            "dates": stepSettings.dates,
            "standardCost": stepSettings.standardCost,
            "concessionCost": stepSettings.concessionCost,
            "embedLink": stepSettings.embedLink,
            "isActive": stepSettings.isActive,
            "eventImage": stepSettings.eventImage,
            "eventImageLink": stepSettings.eventImageLink,
            "scheduleFile": stepSettings.scheduleFile,
            "scheduleFileLink": stepSettings.scheduleFileLink
        });

    }, [stepSettings])

    const { data, setData, post, errors } = useForm<StepSettingsProps>(defaultData);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        switch (event.target.name) {
            case "topic":
            case "speaker":
            case "description":
            case "dates":
            case "standardCost":
            case "concessionCost":
            case "embedLink":
            case "isActive":
                setData(event.target.name, event.target.value);
                break;
        }
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if ((event.target.name === "eventImage" || event.target.name === "scheduleFile") && event.target.files) {
            setData(event.target.name, event.target.files[0]);
        }
    }

    const handleLocalFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if ((event.target.name === "scheduleFile") && event.target.files) {
            setData(event.target.name, event.target.files[0]);
            setLocalScheduleFileLink(URL.createObjectURL(event.target.files[0]));
        }
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(route('settings.step.update'));
    }
    return (
        <form name="stepRegistrationSettingsForm" aria-label="STEP Settings form" onSubmit={handleSubmit} method="post" className="max-w-screen-md">
            <hr />
            <div className="my-4 ">
                <div className="grid grid-cols-1 md:grid-cols-2">
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
                    <div className="md:col-span-2">
                        <InputLabel2 forInput={"description"} value={"Description"} />
                        <TextAreaInput rows={4} className="w-full" name={"description"} id={"description"} value={data.description} handleChange={handleChange} />
                        <InputError message={errors.description} />
                    </div>
                    <div>
                        <InputLabel2 forInput={"dates"} value={"Dates"} />
                        <TextInput name={"dates"} id={"dates"} value={data.dates + ""} handleChange={handleChange} />
                        <InputError message={errors.dates} />
                    </div>
                    <div>
                        <InputLabel2 forInput={"standardCost"} value={"Standard Cost"} />
                        <NumberInput name={"standardCost"} id={"standardCost"} value={data.standardCost + ""} handleChange={handleChange} />
                        <InputError message={errors.standardCost} />
                    </div>

                    <div>
                        <InputLabel2 forInput={"concessionCost"} value={"Concession/Student Cost"} />
                        <NumberInput name={"concessionCost"} id={"concessionCost"} value={data.concessionCost + ""} handleChange={handleChange} />
                        <InputError message={errors.concessionCost} />
                    </div>
                    <div>
                        <InputLabel2 forInput={"embedLink"} value={"Google Form Embed Link"} />
                        <TextInput name={"embedLink"} id={"embedLink"} value={data.embedLink} handleChange={handleChange} />
                        <InputError message={errors.embedLink} />
                    </div>
                    <div>
                        <InputLabel2 forInput={"isActive"} value={"Is Event Active?"} />
                        <SelectInput name="isActive" id="isActive" handleChange={handleChange} defaultValue={data.isActive + ""}>
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </SelectInput>
                        <InputError message={errors.isActive} />
                    </div>

                </div>
                <div>
                    <div className="inline-flex gap-2 mt-4">
                        <InputLabel2 forInput={"eventImage"} value={"Thumbnail Image"} />
                        <FileInput name={"eventImage"} id={"eventImage"} onChange={handleFileChange} accept="image/png, image/jpeg" />
                        <InputError message={errors.eventImage} />
                    </div>
                    <img className="w-60" src={data.eventImage ? URL.createObjectURL(data.eventImage) : route('images.show', data.eventImageLink)} />
                </div>
                <div className="h-full">
                    <div className="inline-flex gap-2 mt-4">
                        <InputLabel2 forInput={"scheduleFile"} value={"Schedule File (PDF)"} />
                        <FileInput name={"scheduleFile"} id={"scheduleFile"} onChange={handleFileChange} accept="application/pdf" />
                        <InputError message={errors.scheduleFile} />
                    </div>
                </div>
            </div>
            <div>
                <PrimaryButton>Update</PrimaryButton>
            </div>
        </form >
    )
}