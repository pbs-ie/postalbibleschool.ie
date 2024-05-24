import ButtonLink from "@/Elements/Buttons/ButtonLink";
import PrimaryButton from "@/Elements/Buttons/PrimaryButton";
import FileInput from "@/Elements/Forms/FileInput";
import InputLabel from "@/Elements/Forms/InputLabel";
import InputLabel2 from "@/Elements/Forms/InputLabel2";
import Legend from "@/Elements/Forms/Legend";
import RadioInput from "@/Elements/Forms/RadioInput";
import TextAreaInput from "@/Elements/Forms/TextAreaInput";
import TextInput from "@/Elements/Forms/TextInput";
import ToastBanner from "@/Components/Forms/ToastBanner";
import VideoEditFormComponent from "@/Components/Video/VideoEditFormComponent";
import VideoFilesEditComponent from "@/Components/Video/VideoFilesEditComponent";
import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import { StepPastProps } from "./Edit";

type StepPastCreateProps = Omit<StepPastProps, "id" | "imageLink">;

export default function Create() {
    const { data, setData, post, processing, errors } = useForm<StepPastCreateProps>({
        date: "",
        title: "",
        description: "",
        imageFile: null as File | null,
        showDetails: false,
        videoContent: [{
            title: "",
            externalUrl: "",
            duration: "",
            id: 0
        }],
        fileContent: []
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch (event.target.name) {
            case "date":
            case "title":
            case "description":
                setData(event.target.name, event.target.value);
                break;
            case "showDetails":
                setData(event.target.name, event.target.value === "true");
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
        post(route('events.step.past.store'));
    }

    const setContent = (newContent: VideoMeta[]) => {
        setData('videoContent', [...newContent]);
    }
    const setFileContent = (newContent: FileMeta[]) => {
        setData('fileContent', [...newContent]);
    }

    return (
        <WrapperLayout>
            <ContentWrapper title="Create New STEP event">
                {errors &&
                    Object.keys(errors).map((key) =>
                        <ToastBanner key={key} message={errors[key as keyof typeof errors] ?? ""} />
                    )
                }
                <form method="post" onSubmit={handleSubmit} className="flex flex-col items-start gap-4 px-10 py-5 border w-fit">
                    <h2 className="p-0 mb-2 text-xl font-bold text-black">Basic Information</h2>
                    <div className="flex flex-col gap-4 mb-4">
                        <div className="inline-flex gap-2">
                            <InputLabel forInput={"date"} value={"Date"} required />
                            <TextInput hasError={!!errors.date} type={"text"} name={"date"} id={"date"} value={data.date} className={""} handleChange={handleChange} required />
                            <p className="text-gray-600">//Full month name and Year. E.g. "January 2023"</p>
                        </div>
                        <div className="inline-flex gap-2">
                            <InputLabel forInput={"title"} value={"Title"} required />
                            <TextInput hasError={!!errors.title} type={"text"} name={"title"} id={"title"} value={data.title} className={""} handleChange={handleChange} required />
                        </div>
                        <div className="inline-flex items-start gap-2">
                            <InputLabel forInput={"description"} value={"Description"} required />
                            <TextAreaInput rows={3} name={"description"} id={"description"} value={data.description} className={"w-1/2"} handleChange={handleChange} required />
                        </div>
                        <div className="inline-flex items-end gap-2">
                            <fieldset className="inline-flex">
                                <Legend required value="Show Details" />
                                <InputLabel2 className="mr-2" forInput="true">
                                    <RadioInput name={"showDetails"} id={"true"} value={"true"} className={""} handleChange={handleChange} checked={data.showDetails} />
                                    Yes
                                </InputLabel2>
                                <InputLabel2 forInput="false">
                                    <RadioInput name={"showDetails"} id={"false"} value={"false"} className={""} handleChange={handleChange} checked={!data.showDetails} />
                                    No
                                </InputLabel2>
                            </fieldset>
                        </div>

                        <div className="inline-flex gap-2">
                            <InputLabel forInput={"imageFile"} value={"Thumbnail Image"} required />
                            <FileInput name={"imageFile"} id={"imageFile"} className={""} handleChange={handleFileChange} required accept="image/*" />
                        </div>
                        <img className="w-60" src={data.imageFile ? URL.createObjectURL(data.imageFile) : ""} />
                    </div>

                    <VideoEditFormComponent videoContent={data.videoContent} setContent={setContent} mode="create" />
                    <VideoFilesEditComponent fileContent={data.fileContent} setContent={setFileContent} mode="create" />

                    <div className="inline-flex justify-center w-full gap-2 mt-5 md:justify-end">
                        <ButtonLink hierarchy="secondary" href={route('events.step.past.admin')}>Cancel</ButtonLink>
                        <PrimaryButton type="submit" className="w-60" processing={processing}>Create</PrimaryButton>
                    </div>

                </form>
            </ContentWrapper>
        </WrapperLayout>
    )
}