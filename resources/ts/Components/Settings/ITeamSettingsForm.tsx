import { useForm } from "@inertiajs/react"
import { FormEvent } from "react";
import TextInput from "@/Elements/Forms/TextInput";
import InputLabel2 from "@/Elements/Forms/InputLabel2";
import InputError from "@/Elements/Forms/InputError";
import { ITeamSettingProps } from "@/Pages/Events/ITeam";
import route from "ziggy-js";
import UpdateFormButton from "@/Elements/Buttons/UpdateFormButton";
import YesNoRadio from "@/Elements/Forms/YesNoRadio";
import FileUploadDropzone from "@/Components/Forms/FileUploadDropzone";
import LabelSpan from "@/Components/Typography/LabelSpan";
import ImagePreviewComponent from "@/Components/Forms/ImagePreviewComponent";

export default function ITeamSettingsForm({ iteamSettings }: { iteamSettings: ITeamSettingProps }) {
    const defaultData = {
        "dates": iteamSettings.dates,
        "embedLink": iteamSettings.embedLink,
        "isActive": iteamSettings.isActive,
        "eventImage": iteamSettings.eventImage,
        "eventImageLink": iteamSettings.eventImageLink
    }
    const { data, setData, post, errors, isDirty, setDefaults } = useForm(defaultData);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        switch (event.target.name) {
            case "dates":
            case "embedLink":
                setData(event.target.name, event.target.value);
                break;
            case "isActive":
                setData(event.target.name, Boolean(+event.target.value));
                break;
        }
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === "eventImage" && event.target.files) {
            setData(event.target.name, event.target.files[0]);
        }
    }

    const handleDrop = (event: React.DragEvent, name: string) => {
        event.preventDefault();
        const droppedFiles = event.dataTransfer.files;
        if (name === "eventImage" && (droppedFiles.length > 0)) {
            setData(name, droppedFiles[0]);
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(route('settings.iteam.update'), {
            onSuccess: () => setDefaults()
        });
    }
    return (
        <form name="iteamSettingsForm" aria-label="iTeam Settings form" onSubmit={handleSubmit} method="post" className="max-w-screen-md">
            <hr />
            <div className="my-4 ">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="w-fit">
                        <YesNoRadio title="Is Registration Active?" name="isActive" value={data.isActive ? 1 : 0} handleChange={handleChange} />
                        <InputError message={errors.isActive} />
                    </div>
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

                </div>
                <div className="flex flex-col items-start gap-2 my-2 lg:flex-row">
                    <div className="inline-flex flex-col gap-2">
                        <FileUploadDropzone name={"eventImage"} labelText={"Thumbnail Image"} onDrop={(e) => handleDrop(e, 'eventImage')} onChange={handleFileChange} accept="image/png, image/jpeg" />
                        <InputError message={errors.eventImage} />
                    </div>
                    <div>
                        <LabelSpan>Preview</LabelSpan>
                        <ImagePreviewComponent imageFile={data.eventImage} imageLink={data.eventImageLink} />
                    </div>
                </div>
            </div>
            <UpdateFormButton isDirty={isDirty} />
        </form>
    )
}