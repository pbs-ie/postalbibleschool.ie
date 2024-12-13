import FileUploadDropzone from "@/Components/Forms/FileUploadDropzone";
import AnchorLink from "@/Components/Navigation/AnchorLink";
import SettingsSidebar from "@/Components/Navigation/SettingsSidebar";
import ITeamSettingsForm from "@/Components/Settings/ITeamSettingsForm";
import Heading2Alt from "@/Components/Typography/Heading2Alt";
import LabelSpan from "@/Components/Typography/LabelSpan";
import BasicButton from "@/Elements/Buttons/BasicButton";
import PrimaryButton from "@/Elements/Buttons/PrimaryButton";
import InputError from "@/Elements/Forms/InputError";
import InputLabel2 from "@/Elements/Forms/InputLabel2";
import NumberInput from "@/Elements/Forms/NumberInput";
import SelectInput from "@/Elements/Forms/SelectInput";
import TextAreaInput from "@/Elements/Forms/TextAreaInput";
import TextInput from "@/Elements/Forms/TextInput";
import Download from "@/Elements/Icons/Download";
import Trash from "@/Elements/Icons/Trash";
import SettingsSection from "@/Elements/Sections/SettingsSection";
import SettingsLayout from "@/Layouts/SettingsLayout";
import { router, useForm } from "@inertiajs/react";
import { useState, useEffect, FormEvent } from "react";
import route from "ziggy-js";

export interface EventsSettingsProps {
    shed_dates: string,
    shed_location: string,
    shed_year: string,
    shed_embedLink: string,
    shed_isActive: boolean,
    shed_consentForm?: File | null,
    shed_consentFormLink?: string,
    prizegivings_scheduleFile?: File | null,
    prizegivings_scheduleFileLink?: string,
    prizegivings_year: string,
    prizegivings_isActive: boolean,
}
export default function Events({ eventsSettings }: { eventsSettings: EventsSettingsProps }) {
    const [defaultData, setDefaultData] = useState({
        "shed_dates": eventsSettings.shed_dates,
        "shed_location": eventsSettings.shed_location,
        "shed_year": eventsSettings.shed_year,
        "shed_embedLink": eventsSettings.shed_embedLink,
        "shed_isActive": eventsSettings.shed_isActive,
        "shed_consentForm": eventsSettings.shed_consentForm,
        "shed_consentFormLink": eventsSettings.shed_consentFormLink,
        "prizegivings_scheduleFile": eventsSettings.prizegivings_scheduleFile,
        "prizegivings_scheduleFileLink": eventsSettings.prizegivings_scheduleFileLink,
        "prizegivings_year": eventsSettings.prizegivings_year,
        "prizegivings_isActive": eventsSettings.prizegivings_isActive,
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
            "prizegivings_scheduleFile": eventsSettings.prizegivings_scheduleFile,
            "prizegivings_scheduleFileLink": eventsSettings.prizegivings_scheduleFileLink,
            "prizegivings_year": eventsSettings.prizegivings_year,
            "prizegivings_isActive": eventsSettings.prizegivings_isActive,
        });

    }, [eventsSettings])

    const { data, setData, post, errors } = useForm<EventsSettingsProps>(defaultData);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        switch (event.target.name) {
            case "shed_dates":
            case "shed_location":
            case "shed_year":
            case "shed_embedLink":
            case "shed_isActive":
            case "shed_consentForm":
            case "shed_consentFormLink":
            case "prizegivings_scheduleFile":
            case "prizegivings_scheduleFileLink":
            case "prizegivings_year":
            case "prizegivings_isActive":
                setData(event.target.name, event.target.value);
                break;
        }
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if ((event.target.name === "prizegivings_scheduleFile" || event.target.name === "shed_consentForm") && event.target.files) {
            setData(event.target.name, event.target.files[0]);
        }
    }
    const handleDrop = (event: React.DragEvent, name: string) => {
        event.preventDefault();
        const droppedFiles = event.dataTransfer.files;
        if ((name === "prizegivings_scheduleFile" || name === "shed_consentForm") && (droppedFiles.length > 0)) {
            setData(name, droppedFiles[0]);
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(route('settings.events.update'));
    }
    return (
        <SettingsLayout title={"Other Events Settings"}>
            <SettingsSection>

                <div>
                    <form name="eventsSettingsForm" aria-label="Events Settings form" onSubmit={handleSubmit} method="post" className="max-w-screen-md mb-5">
                        <Heading2Alt>Prizegivings event details</Heading2Alt>
                        <hr />
                        <div className="my-4 ">
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div>
                                    <InputLabel2 forInput={"prizegivings_year"} value={"Year"} />
                                    <TextInput name={"prizegivings_year"} id={"prizegivings_year"} value={data.prizegivings_year} handleChange={handleChange} />
                                    <InputError message={errors.prizegivings_year} />
                                </div>
                                <div>
                                    <InputLabel2 forInput={"prizegivings_isActive"} value={"Is Event Active?"} />
                                    <SelectInput name="prizegivings_isActive" id="prizegivings_isActive" handleChange={handleChange} defaultValue={data.prizegivings_isActive + ""}>
                                        <option value="true">True</option>
                                        <option value="false">False</option>
                                    </SelectInput>
                                    <InputError message={errors.prizegivings_isActive} />
                                </div>

                            </div>
                            <div className="flex flex-col items-start h-full w-fit">
                                <FileUploadDropzone name={"prizegivings_scheduleFile"} labelText="Schedule File (PDF)" onDrop={(e) => handleDrop(e, 'prizegivings_scheduleFile')} onChange={handleFileChange} accept="application/pdf" />
                                <InputError message={errors.prizegivings_scheduleFile} />
                                {data.prizegivings_scheduleFile &&
                                    <div><span className="font-bold">Selected File :</span> {data.prizegivings_scheduleFile.name}</div>
                                }
                                {eventsSettings.prizegivings_scheduleFileLink &&
                                    <div className="flex gap-2 w-fit">
                                        <AnchorLink Icon={Download} href={route('assets.download', eventsSettings.prizegivings_scheduleFileLink)}>Download Schedule File</AnchorLink>
                                        <BasicButton size="small" hierarchy="delete" onClick={() => router.delete(route('settings.events.destroyFile'), { preserveScroll: true })}>
                                            <span className="flex items-center gap-2"><Trash />Remove File</span>
                                        </BasicButton>
                                    </div>
                                }
                            </div>
                        </div>
                        <Heading2Alt>SHED event details</Heading2Alt>
                        <hr />
                        <div className="my-4 ">
                            <div className="grid grid-cols-1 md:grid-cols-2">
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
                                <div>
                                    <InputLabel2 forInput={"shed_isActive"} value={"Is Event Active?"} />
                                    <SelectInput name="shed_isActive" id="shed_isActive" handleChange={handleChange} defaultValue={data.shed_isActive + ""}>
                                        <option value="true">True</option>
                                        <option value="false">False</option>
                                    </SelectInput>
                                    <InputError message={errors.shed_isActive} />
                                </div>

                            </div>
                            <div className="flex flex-col items-start h-full w-fit">
                                <FileUploadDropzone name={"shed_consentForm"} labelText="Consent Form File (PDF)" onDrop={(e) => handleDrop(e, 'shed_consentForm')} onChange={handleFileChange} accept="application/pdf" />
                                <InputError message={errors.shed_consentForm} />
                                {data.shed_consentForm &&
                                    <div><span className="font-bold">Selected File :</span> {data.shed_consentForm.name}</div>
                                }
                                {eventsSettings.shed_consentFormLink &&
                                    <div className="flex gap-2 w-fit">
                                        <AnchorLink Icon={Download} href={route('assets.download', eventsSettings.shed_consentFormLink)}>Download Schedule File</AnchorLink>
                                        <BasicButton size="small" hierarchy="delete" onClick={() => router.delete(route('settings.events.destroyFile'), { preserveScroll: true })}>
                                            <span className="flex items-center gap-2"><Trash />Remove File</span>
                                        </BasicButton>
                                    </div>
                                }
                            </div>
                        </div>
                        <div>
                            <PrimaryButton>Update</PrimaryButton>
                        </div>
                    </form>
                </div>
            </SettingsSection>
        </SettingsLayout>
    )
}