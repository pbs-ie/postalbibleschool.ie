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
import { EventSelectOption } from "@/Pages/Settings/Step";
import Heading2Alt from "@/Components/Typography/Heading2Alt";
import Heading3 from "@/Components/Typography/Heading3";

export default function StepRegistrationSettingsForm({ stepSettings, eventOptions }: { stepSettings: StepSettingsProps, eventOptions: EventSelectOption[] }) {

    const [defaultData, setDefaultData] = useState({
        "description": stepSettings.description,
        "standardCost": stepSettings.standardCost,
        "concessionCost": stepSettings.concessionCost,
        "embedLink": stepSettings.embedLink,
        "isRegistrationActive": stepSettings.isRegistrationActive,
        "activeId": stepSettings.activeId ?? "",
        "upcomingId1": stepSettings.upcomingId1 ?? "",
        "upcomingId2": stepSettings.upcomingId2 ?? "",
        "upcomingId3": stepSettings.upcomingId3 ?? "",
        "scheduleFile": stepSettings.scheduleFile,
        "scheduleFileLink": stepSettings.scheduleFileLink,
    });
    useEffect(() => {
        setDefaultData({
            "description": stepSettings.description,
            "standardCost": stepSettings.standardCost,
            "concessionCost": stepSettings.concessionCost,
            "isRegistrationActive": stepSettings.isRegistrationActive,
            "embedLink": stepSettings.embedLink,
            "activeId": stepSettings.activeId ?? "",
            "upcomingId1": stepSettings.upcomingId1 ?? "",
            "upcomingId2": stepSettings.upcomingId2 ?? "",
            "upcomingId3": stepSettings.upcomingId3 ?? "",
            "scheduleFile": stepSettings.scheduleFile,
            "scheduleFileLink": stepSettings.scheduleFileLink,
        });

    }, [stepSettings])

    const { data, setData, post, errors, isDirty, setDefaults } = useForm<StepSettingsProps>(defaultData);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        switch (event.target.name) {
            case "description":
            case "standardCost":
            case "concessionCost":
            case "activeId":
            case "upcomingId1":
            case "upcomingId2":
            case "upcomingId3":
                setData(event.target.name, event.target.value);
                break;
            case "isRegistrationActive":
                setData(event.target.name, Boolean(+event.target.value));
                break;
        }
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === "scheduleFile" && event.target.files) {
            setData(event.target.name, event.target.files[0]);
        }
    }
    const handleDrop = (event: React.DragEvent, name: string) => {
        event.preventDefault();
        const droppedFiles = event.dataTransfer.files;
        if (name === "scheduleFile" && (droppedFiles.length > 0)) {
            setData(name, droppedFiles[0]);
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(route('settings.step.update'), {
            onSuccess: () => setDefaults()
        });
    }
    const EventSelectInput = (props: { name: string, value?: string }) => {
        return (
            <SelectInput name={props.name} defaultValue={props.value} id={props.name} handleChange={handleChange}>
                <option key="disabled-option" value="" className="border-b-2 border-black">None selected</option>
                {eventOptions.map((event) => (
                    <option key={event.id} value={event.id}>#{event.id} - {event.topic}</option>
                ))}
            </SelectInput>
        )
    }
    return (
        <form name="stepRegistrationSettingsForm" aria-label="STEP Settings form" onSubmit={handleSubmit} method="post" className="max-w-screen-md">
            <Heading2Alt>Active Event</Heading2Alt>
            <hr />
            <div className="my-4 ">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="w-fit">
                        <YesNoRadio title="Is Registration Active?" name="isRegistrationActive" value={data.isRegistrationActive ? 1 : 0} handleChange={handleChange} />
                        <InputError message={errors.isRegistrationActive} />
                    </div>
                    <div className="md:col-span-2">
                        <InputLabel2 forInput={"description"} value={"Description"} />
                        <TextAreaInput rows={4} className="w-full" name={"description"} id={"description"} value={data.description} handleChange={handleChange} />
                        <InputError message={errors.description} />
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
                        <InputLabel2 forInput={"activeId"} value={"Active ID"} />
                        {/* <TextInput name={"activeId"} id={"activeId"} value={data.activeId} handleChange={handleChange} /> */}
                        <EventSelectInput name={"activeId"} value={data.activeId} />
                        <InputError message={errors.activeId} />
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
            </div>
            <Heading3>Upcoming Events</Heading3>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div>
                    <InputLabel2 forInput={"upcomingId1"} value={"Upcoming ID 1"} />
                    {/* <TextInput name={"upcomingId1"} id={"upcomingId1"} value={data.upcomingId1} handleChange={handleChange} /> */}
                    <EventSelectInput name={"upcomingId1"} value={data.upcomingId1} />
                    <InputError message={errors.upcomingId1} />
                </div>
                <div>
                    <InputLabel2 forInput={"upcomingId2"} value={"Upcoming ID 2"} />
                    {/* <TextInput name={"upcomingId2"} id={"upcomingId2"} value={data.upcomingId2} handleChange={handleChange} /> */}
                    <EventSelectInput name={"upcomingId2"} value={data.upcomingId2} />
                    <InputError message={errors.upcomingId2} />
                </div>
                <div>
                    <InputLabel2 forInput={"upcomingId3"} value={"Upcoming ID 3"} />
                    {/* <TextInput name={"upcomingId3"} id={"upcomingId3"} value={data.upcomingId3} handleChange={handleChange} /> */}
                    <EventSelectInput name={"upcomingId3"} value={data.upcomingId3} />
                    <InputError message={errors.upcomingId3} />
                </div>
            </div>
            <UpdateFormButton isDirty={isDirty} />
        </form >
    )
}