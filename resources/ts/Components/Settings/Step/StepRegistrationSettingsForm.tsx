import { router, useForm } from "@inertiajs/react"
import { FormEvent, useEffect, useState } from "react";
import TextInput from "@/Elements/Forms/TextInput";
import InputLabel2 from "@/Elements/Forms/InputLabel2";
import InputError from "@/Elements/Forms/InputError";
import SelectInput from "@/Elements/Forms/SelectInput";
import route from "ziggy-js";
import TextAreaInput from "@/Elements/Forms/TextAreaInput";
import NumberInput from "@/Elements/Forms/NumberInput";
import Download from "@/Elements/Icons/Download";
import FileUploadDropzone from "@/Components/Forms/FileUploadDropzone";
import LabelSpan from "@/Components/Typography/LabelSpan";
import Trash from "@/Elements/Icons/Trash";
import BasicButton from "@/Elements/Buttons/BasicButton";
import AnchorLink from "@/Components/Navigation/AnchorLink";
import UpdateFormButton from "@/Elements/Buttons/UpdateFormButton";
import YesNoRadio from "@/Elements/Forms/YesNoRadio";

export default function StepRegistrationSettingsForm({ stepSettings }: { stepSettings: StepSettingsProps }) {
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

    const { data, setData, post, errors, isDirty, setDefaults } = useForm<StepSettingsProps>(defaultData);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        switch (event.target.name) {
            case "topic":
            case "speaker":
            case "description":
            case "dates":
            case "standardCost":
            case "concessionCost":
            case "embedLink":
                setData(event.target.name, event.target.value);
                break;
            case "isActive":
                setData(event.target.name, Boolean(+event.target.value));
                break;
        }
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if ((event.target.name === "eventImage" || event.target.name === "scheduleFile") && event.target.files) {
            setData(event.target.name, event.target.files[0]);
        }
    }
    const handleDrop = (event: React.DragEvent, name: string) => {
        event.preventDefault();
        const droppedFiles = event.dataTransfer.files;
        if ((name === "eventImage" || name === "scheduleFile") && (droppedFiles.length > 0)) {
            setData(name, droppedFiles[0]);
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(route('settings.step.update'), {
            onSuccess: () => setDefaults()
        });
    }
    return (
        <form name="stepRegistrationSettingsForm" aria-label="STEP Settings form" onSubmit={handleSubmit} method="post" className="max-w-screen-md">
            <hr />
            <div className="my-4 ">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="w-fit">
                        <YesNoRadio title="Is Registration Active?" name="isActive" value={data.isActive ? 1 : 0} handleChange={handleChange} />
                        <InputError message={errors.isActive} />
                    </div>
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

                </div>
                <div className="flex flex-col items-start gap-2 my-2 lg:flex-row">
                    <div className="inline-flex flex-col gap-2">
                        <FileUploadDropzone name={"eventImage"} labelText={"Thumbnail Image"} onDrop={(e) => handleDrop(e, 'eventImage')} onChange={handleFileChange} accept="image/png, image/jpeg" />
                        <InputError message={errors.eventImage} />
                    </div>
                    <div>
                        <LabelSpan>Preview</LabelSpan>
                        <img className="w-60" src={data.eventImage ? URL.createObjectURL(data.eventImage) : route('images.show', data.eventImageLink)} />
                    </div>
                </div>
                <div className="flex flex-col h-full w-fit">
                    <FileUploadDropzone name={"scheduleFile"} labelText="Schedule File (PDF)" onDrop={(e) => handleDrop(e, 'scheduleFile')} onChange={handleFileChange} accept="application/pdf" />
                    <InputError message={errors.scheduleFile} />
                    {data.scheduleFile &&
                        <div><span className="font-bold">Selected File :</span> {data.scheduleFile.name}</div>
                    }
                    {stepSettings.scheduleFileLink &&
                        <div className="flex items-center gap-2 w-fit">
                            <AnchorLink Icon={Download} href={route('assets.download', stepSettings.scheduleFileLink)}>Download Schedule File</AnchorLink>
                            <BasicButton size="small" hierarchy="delete" onClick={() => router.delete(route('settings.step.destroyFile'), { preserveScroll: true })}>
                                <span className="flex items-center gap-2"><Trash />Remove File</span>
                            </BasicButton>
                        </div>
                    }
                </div>
            </div>
            <UpdateFormButton isDirty={isDirty} />
        </form >
    )
}