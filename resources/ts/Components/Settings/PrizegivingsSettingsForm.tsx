import FileUploadDropzone from "@/Components/Forms/FileUploadDropzone";
import AnchorLink from "@/Components/Navigation/AnchorLink";
import Heading2Alt from "@/Components/Typography/Heading2Alt";
import BasicButton from "@/Elements/Buttons/BasicButton";
import PrimaryButton from "@/Elements/Buttons/PrimaryButton";
import InputError from "@/Elements/Forms/InputError";
import InputLabel2 from "@/Elements/Forms/InputLabel2";
import SelectInput from "@/Elements/Forms/SelectInput";
import TextInput from "@/Elements/Forms/TextInput";
import Download from "@/Elements/Icons/Download";
import Trash from "@/Elements/Icons/Trash";
import { EventsSettingsProps } from "@/Pages/Settings/Events";
import { useForm } from "@inertiajs/react";
import { useState, useEffect, FormEvent } from "react";
import route from "ziggy-js";

export default function PrizegivingsSettingsForm({ eventsSettings }: { eventsSettings: EventsSettingsProps }) {
    const [defaultData, setDefaultData] = useState({
        "prizegivings_scheduleFile": eventsSettings.prizegivings_scheduleFile,
        "prizegivings_scheduleFileLink": eventsSettings.prizegivings_scheduleFileLink,
        "prizegivings_year": eventsSettings.prizegivings_year,
        "prizegivings_isActive": eventsSettings.prizegivings_isActive,
    });
    useEffect(() => {
        setDefaultData({
            "prizegivings_scheduleFile": eventsSettings.prizegivings_scheduleFile,
            "prizegivings_scheduleFileLink": eventsSettings.prizegivings_scheduleFileLink,
            "prizegivings_year": eventsSettings.prizegivings_year,
            "prizegivings_isActive": eventsSettings.prizegivings_isActive,
        });

    }, [eventsSettings])

    const { data, setData, post, errors, delete: destroy, isDirty, processing } = useForm<Pick<EventsSettingsProps, "prizegivings_isActive" | "prizegivings_scheduleFile" | "prizegivings_scheduleFileLink" | "prizegivings_year">>(defaultData);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        switch (event.target.name) {
            case "prizegivings_scheduleFile":
            case "prizegivings_scheduleFileLink":
            case "prizegivings_year":
            case "prizegivings_isActive":
                setData(event.target.name, event.target.value);
                break;
        }
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === "prizegivings_scheduleFile" && event.target.files) {
            setData(event.target.name, event.target.files[0]);
        }
    }
    const handleDrop = (event: React.DragEvent, name: string) => {
        event.preventDefault();
        const droppedFiles = event.dataTransfer.files;
        if (name === "prizegivings_scheduleFile" && (droppedFiles.length > 0)) {
            setData(name, droppedFiles[0]);
        }
    };
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(route('settings.events.update'));
    }
    return (
        <form name="eventsSettingsForm" aria-label="Events Settings form" onSubmit={handleSubmit} method="post" className="max-w-screen-md mb-5">
            <Heading2Alt>Prizegivings event details</Heading2Alt>
            <hr />
            <div className="my-4 ">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div>
                        <InputLabel2 forInput={"prizegivings_isActive"} value={"Is Event Active?"} required />
                        <SelectInput name="prizegivings_isActive" id="prizegivings_isActive" handleChange={handleChange} defaultValue={data.prizegivings_isActive ? "1" : "0"} required>
                            <option value="1">True</option>
                            <option value="0">False</option>
                        </SelectInput>
                        <InputError message={errors.prizegivings_isActive} />
                    </div>
                    <div>
                        <InputLabel2 forInput={"prizegivings_year"} value={"Year"} />
                        <TextInput name={"prizegivings_year"} id={"prizegivings_year"} value={data.prizegivings_year} handleChange={handleChange} />
                        <InputError message={errors.prizegivings_year} />
                    </div>

                </div>
                <hr className="my-4" />
                <div className="flex flex-col items-start h-full w-fit">
                    <FileUploadDropzone name={"prizegivings_scheduleFile"} labelText="Schedule File (PDF)" onDrop={(e) => handleDrop(e, 'prizegivings_scheduleFile')} onChange={handleFileChange} accept="application/pdf" />
                    <InputError message={errors.prizegivings_scheduleFile} />
                    {data.prizegivings_scheduleFile &&
                        <div><span className="font-bold">Selected File :</span> {data.prizegivings_scheduleFile.name}</div>
                    }
                    {eventsSettings.prizegivings_scheduleFileLink &&
                        <div className="flex items-center gap-2 w-fit">
                            <AnchorLink Icon={Download} href={route('assets.download', eventsSettings.prizegivings_scheduleFileLink)}>Download Schedule File</AnchorLink>
                            <BasicButton size="small" hierarchy="delete" onClick={() => destroy(route('settings.events.destroyFile'), { preserveScroll: true })}>
                                <span className="flex items-center gap-2"><Trash />Remove File</span>
                            </BasicButton>
                        </div>
                    }
                </div>
            </div>
            <div>
                <PrimaryButton processing={processing || !isDirty}>Update</PrimaryButton>
                {isDirty && <span className="text-gray-500 ml-2 italic">You have unsaved changes.</span>}
            </div>

        </form>
    )
}