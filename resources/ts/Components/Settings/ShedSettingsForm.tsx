import { EventsSettingsProps } from "@/Pages/Settings/Events";
import FileUploadDropzone from "@/Components/Forms/FileUploadDropzone";
import AnchorLink from "@/Components/Navigation/AnchorLink";
import Heading2Alt from "@/Components/Typography/Heading2Alt";
import BasicButton from "@/Elements/Buttons/BasicButton";
import InputError from "@/Elements/Forms/InputError";
import InputLabel2 from "@/Elements/Forms/InputLabel2";
import TextInput from "@/Elements/Forms/TextInput";
import Download from "@/Elements/Icons/Download";
import Trash from "@/Elements/Icons/Trash";
import { useForm } from "@inertiajs/react";
import { useState, useEffect, FormEvent } from "react";
import route from "ziggy-js";
import UpdateFormButton from "@/Elements/Buttons/UpdateFormButton";
import YesNoRadio from "@/Elements/Forms/YesNoRadio";

export default function shedSettingsForm({ eventsSettings }: { eventsSettings: EventsSettingsProps }) {
    const [defaultData, setDefaultData] = useState({
        "shed_dates": eventsSettings.shed_dates,
        "shed_location": eventsSettings.shed_location,
        "shed_year": eventsSettings.shed_year,
        "shed_embedLink": eventsSettings.shed_embedLink,
        "shed_isActive": eventsSettings.shed_isActive,
        "shed_consentForm": eventsSettings.shed_consentForm,
        "shed_consentFormLink": eventsSettings.shed_consentFormLink,
    });
    useEffect(() => {
        setDefaultData({
            "shed_dates": eventsSettings.shed_dates,
            "shed_location": eventsSettings.shed_location,
            "shed_year": eventsSettings.shed_year,
            "shed_embedLink": eventsSettings.shed_embedLink,
            "shed_isActive": eventsSettings.shed_isActive,
            "shed_consentForm": eventsSettings.shed_consentForm,
            "shed_consentFormLink": eventsSettings.shed_consentFormLink,
        });

    }, [eventsSettings])

    const { data, setData, post, errors, delete: destroy, isDirty, setDefaults } = useForm<Omit<EventsSettingsProps, "prizegivings_isActive" | "prizegivings_scheduleFile" | "prizegivings_scheduleFileLink" | "prizegivings_year">>(defaultData);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        switch (event.target.name) {
            case "shed_dates":
            case "shed_location":
            case "shed_year":
            case "shed_embedLink":
            case "shed_consentForm":
            case "shed_consentFormLink":
                setData(event.target.name, event.target.value);
                break;
            case "shed_isActive":
                setData(event.target.name, Boolean(+event.target.value));
        }
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if ((event.target.name === "shed_consentForm") && event.target.files) {
            setData(event.target.name, event.target.files[0]);
        }
    }
    const handleDrop = (event: React.DragEvent, name: string) => {
        event.preventDefault();
        const droppedFiles = event.dataTransfer.files;
        if ((name === "shed_consentForm") && (droppedFiles.length > 0)) {
            setData(name, droppedFiles[0]);
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(route('settings.events.update'), {
            preserveScroll: true,
            onSuccess: () => setDefaults()
        });
    }
    return (
        <form name="shedSettingsForm" aria-label="SHED Settings form" onSubmit={handleSubmit} method="post" className="max-w-screen-md mb-5">
            <Heading2Alt>SHED event details</Heading2Alt>
            <hr />
            <div className="my-4 ">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="w-fit">
                        <YesNoRadio title="Is Event Active?" name="shed_isActive" handleChange={handleChange} value={data.shed_isActive ? 1 : 0} />
                        <InputError message={errors.shed_isActive} />

                    </div>
                    <div>
                        <InputLabel2 forInput={"shed_dates"} value={"Dates"} />
                        <TextInput name={"shed_dates"} id={"shed_dates"} value={data.shed_dates} handleChange={handleChange} />
                        <InputError message={errors.shed_dates} />
                    </div>
                    <div>
                        <InputLabel2 forInput={"shed_location"} value={"Location"} />
                        <TextInput name={"shed_location"} id={"shed_location"} value={data.shed_location} handleChange={handleChange} />
                        <InputError message={errors.shed_location} />
                    </div>
                    <div>
                        <InputLabel2 forInput={"shed_year"} value={"Year"} />
                        <TextInput name={"shed_year"} id={"shed_year"} value={data.shed_year} handleChange={handleChange} />
                        <InputError message={errors.shed_year} />
                    </div>
                    <div>
                        <InputLabel2 forInput={"shed_embedLink"} value={"Google Form Embed Link"} />
                        <TextInput name={"shed_embedLink"} id={"shed_embedLink"} value={data.shed_embedLink} handleChange={handleChange} />
                        <InputError message={errors.shed_embedLink} />
                    </div>


                </div>
                <hr className="my-4" />
                <div className="flex flex-col items-start h-full w-fit">
                    <FileUploadDropzone name={"shed_consentForm"} labelText="Consent Form File (PDF)" onDrop={(e) => handleDrop(e, 'shed_consentForm')} onChange={handleFileChange} accept="application/pdf" />
                    <InputError message={errors.shed_consentForm} />
                    {data.shed_consentForm &&
                        <div><span className="font-bold">Selected File :</span> {data.shed_consentForm.name}</div>
                    }
                    {eventsSettings.shed_consentFormLink &&
                        <div className="flex items-center gap-2 w-fit">
                            <AnchorLink Icon={Download} href={route('assets.download', eventsSettings.shed_consentFormLink)}>Download Consent Form (PDF)</AnchorLink>
                            <BasicButton size="small" hierarchy="delete" onClick={() => destroy(route('settings.events.destroyFile'), { preserveScroll: true })}>
                                <span className="flex items-center gap-2"><Trash />Remove File</span>
                            </BasicButton>
                        </div>
                    }
                </div>
            </div>
            <UpdateFormButton isDirty={isDirty} />
        </form>
    )
}