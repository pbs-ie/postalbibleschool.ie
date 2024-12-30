import ButtonLink from "@/Elements/Buttons/ButtonLink";
import PrimaryButton from "@/Elements/Buttons/PrimaryButton";
import InputLabel from "@/Elements/Forms/InputLabel";
import TextInput from "@/Elements/Forms/TextInput";
import TextAreaInput from "@/Elements/Forms/TextAreaInput";
import DateInput from "@/Elements/Forms/DateInput";
import YesNoRadio from "@/Elements/Forms/YesNoRadio";

import ToastBanner from "@/Components/Forms/ToastBanner";
import VideoEditFormComponent from "@/Components/Video/VideoEditFormComponent";
import VideoFilesEditComponent from "@/Components/Video/VideoFilesEditComponent";
import FileUploadDropzone from "@/Components/Forms/FileUploadDropzone";
import LabelSpan from "@/Components/Typography/LabelSpan";

import { FormEvent } from "react";
import route from "ziggy-js";
import { usePage, useForm } from "@inertiajs/react";

type StepPastCreateProps = Omit<StepEventsProps, "id">;

export default function NewStepEventForm({ currentEvent }: { currentEvent?: StepEventsProps }) {
    const { errors } = usePage().props;

    // const parseDateString = (date: string) => {
    //     const [month, year] = date.split(' ');
    //     const monthNumber = (monthNames.indexOf(month as typeof monthNames[0]) + 1).toString().padStart(2, "0");
    //     return `${year}-${monthNumber}`;
    // }

    const dateObject = new Date();

    let defaultFormObject: StepEventsProps | StepPastCreateProps = {
        startDate: `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1)}-${dateObject.getDate().toString().padStart(2, "0")}`,
        endDate: `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1)}-${dateObject.getDate().toString().padStart(2, "0")}`,
        topic: "",
        speaker: "",
        description: "",
        imageFile: null as File | null,
        imageLink: "",
        showDetails: false,
        videoContent: [],
        fileContent: []
    }
    if (currentEvent) {
        defaultFormObject = {
            id: currentEvent.id,
            startDate: currentEvent.startDate,
            endDate: currentEvent.endDate,
            topic: currentEvent.topic,
            speaker: currentEvent.speaker,
            description: currentEvent.description,
            imageLink: currentEvent.imageLink,
            showDetails: currentEvent.showDetails,
            videoContent: currentEvent.videoContent ?? [],
            fileContent: currentEvent.fileContent ?? []
        }
    }
    const { data, setData, post, reset, processing } = useForm(defaultFormObject);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        switch (event.target.name) {
            case "startDate":
            case "endDate":
            case "topic":
            case "speaker":
            case "description":
                setData(event.target.name, event.target.value);
                break;
            case "showDetails":
                setData(event.target.name, Boolean(+event.target.value));
                break;
        }
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === "imageFile" && event.target.files) {
            setData(event.target.name, event.target.files[0]);
        }
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (currentEvent)
            post(route('events.step.past.update', currentEvent.id));
        else
            post(route('events.step.past.store'));
    }

    const setVideoContent = (newContent: VideoMeta[]) => {
        setData('videoContent', [...newContent]);
    }
    const setFileContent = (newContent: FileMeta[]) => {
        setData('fileContent', [...newContent]);
    }
    const handleDrop = (event: React.DragEvent, name: string) => {
        event.preventDefault();
        const droppedFiles = event.dataTransfer.files;
        if (name === "imageFile" && (droppedFiles.length > 0)) {
            setData(name, droppedFiles[0]);
        }
    };

    return (
        <>
            {errors &&
                Object.keys(errors).map((key) =>
                    <ToastBanner key={key} message={errors[key]} />
                )
            }
            <form method="post" onSubmit={handleSubmit} className="flex flex-col items-start w-full gap-4 px-10 py-5 border md:w-fit md:min-w-[50vw]">
                <h2 className="p-0 mb-2 text-xl font-bold text-black">Basic Information</h2>
                <div className="flex flex-col w-full gap-4 mb-4">
                    <div className="inline-flex items-center gap-2">
                        <InputLabel forInput={"startDate"} value={"Start Date"} required />
                        <DateInput type={'date'} hasError={!!errors.startDate} name={"startDate"} id={"startDate"} value={data.startDate} className={""} handleChange={handleChange} required />
                    </div>
                    <div className="inline-flex items-center gap-2">
                        <InputLabel forInput={"endDate"} value={"End Date"} required />
                        <DateInput type={'date'} hasError={!!errors.endDate} name={"endDate"} id={"endDate"} value={data.endDate} className={""} handleChange={handleChange} required />
                    </div>
                    <div className="inline-flex gap-2">
                        <InputLabel forInput={"speaker"} value={"speaker"} required />
                        <TextInput type={"text"} name={"speaker"} id={"speaker"} value={data.speaker} className={""} handleChange={handleChange} required />
                    </div>
                    <div className="inline-flex gap-2">
                        <InputLabel forInput={"topic"} value={"topic"} required />
                        <TextInput type={"text"} name={"topic"} id={"topic"} value={data.topic} className={""} handleChange={handleChange} required />
                    </div>
                    <div className="inline-flex items-start gap-2">
                        <InputLabel forInput={"description"} value={"Video Description"} required />
                        <TextAreaInput rows={3} name={"description"} id={"description"} value={data.description} className={"w-1/2"} handleChange={handleChange} required />
                    </div>
                    <div className="inline-flex items-end gap-2">
                        <YesNoRadio title="Show Details" name="showDetails" value={data.showDetails ? 1 : 0} handleChange={handleChange} />
                    </div>

                    <div className="inline-flex flex-wrap justify-start gap-2">
                        <FileUploadDropzone name={"imageFile"} onChange={handleFileChange} accept="image/png" onDrop={(e) => handleDrop(e, 'imageFile')} labelText={"Thumbnail Image"} required />
                        {(data.imageLink || data.imageFile) &&
                            <div className="w-fit">
                                <LabelSpan>Preview</LabelSpan>
                                <img className="w-60" src={data.imageFile ? URL.createObjectURL(data.imageFile) : route('images.show', data.imageLink)} />
                            </div>
                        }
                    </div>
                </div>
                <VideoEditFormComponent videoContent={currentEvent?.videoContent ?? []} setContent={setVideoContent} />
                <VideoFilesEditComponent fileContent={currentEvent?.fileContent ?? []} setContent={setFileContent} />

                <div className="inline-flex justify-center w-full gap-2 mt-5 md:justify-end">
                    <ButtonLink hierarchy="secondary" href={route('settings.step.index')}>Cancel</ButtonLink>
                    <PrimaryButton type="submit" processing={processing}>{currentEvent ? "Update" : "Create"}</PrimaryButton>
                </div>

            </form>
        </>
    )
}