import { AssemblyVideoProps } from "@/Pages/Assembly/Index";
import ButtonLink from "@/Elements/Buttons/ButtonLink";
import PrimaryButton from "@/Elements/Buttons/PrimaryButton";
import InputLabel from "@/Elements/Forms/InputLabel";
import TextInput from "@/Elements/Forms/TextInput";
import ToastBanner from "@/Components/Forms/ToastBanner";
import InputError from "@/Elements/Forms/InputError";
import SelectInput from "@/Elements/Forms/SelectInput";

import { usePage, useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import route from "ziggy-js";

import VideoEditFormComponent from "@/Components/Video/VideoEditFormComponent";
import ImagePreviewComponent from "@/Components/Forms/ImagePreviewComponent";
import LabelSpan from "@/Components/Typography/LabelSpan";
import FileUploadDropzone from "@/Components/Forms/FileUploadDropzone";
import { monthNames } from "@/constants";

type AssemblyVideoCreateProps = Omit<AssemblyVideoProps, "id">;

export default function AssemblyVideoForm({ videoData }: { videoData?: AssemblyVideoProps }) {
    const { errors } = usePage().props;

    let defaultFormObject: AssemblyVideoProps | AssemblyVideoCreateProps = {
        title: "",
        month: "",
        series: "",
        imageFile: null as File | null,
        imageLink: "",
        videoContent: []
    }
    if (videoData) {
        defaultFormObject = {
            id: videoData.id,
            title: videoData.title,
            month: videoData.month,
            series: videoData.series,
            imageFile: videoData.imageFile,
            imageLink: videoData.imageLink,
            videoContent: videoData.videoContent ?? []
        }
    }
    const { data, setData, post, reset, processing } = useForm(defaultFormObject);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        switch (event.target.name) {
            case "title":
            case "month":
            case "series":
                setData(event.target.name, event.target.value);
        }
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === "imageFile" && event.target.files) {
            setData(event.target.name, event.target.files[0]);
        }
    }
    const handleDrop = (event: React.DragEvent, name: string) => {
        event.preventDefault();
        const droppedFiles = event.dataTransfer.files;
        if (name === "imageFile" && (droppedFiles.length > 0)) {
            setData(name, droppedFiles[0]);
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (videoData) {
            post(route('assembly.update', videoData.id));
        }
        else {
            post(route('assembly.store'));
        }
    }

    const setVideoContent = (newContent: VideoMeta[]) => {
        setData('videoContent', [...newContent]);
    }
    return (
        <>
            {errors &&
                Object.keys(errors).map((key) =>
                    <ToastBanner key={key} message={errors[key]} />
                )
            }
            <form method="post" onSubmit={handleSubmit} className="flex flex-col items-start gap-4 px-10 py-5 border w-fit">
                <h2 className="p-0 mb-2 text-xl font-bold text-black">Basic Information</h2>
                <div className="flex flex-col gap-4 mb-4">
                    <div className="inline-flex gap-2">
                        <InputLabel forInput={"title"} value={"Title"} required />
                        <TextInput type={"text"} name={"title"} id={"title"} value={data.title} className={""} handleChange={handleChange} required />
                    </div>
                    <div className="inline-flex items-center gap-2">
                        <InputLabel forInput={"month"} value={"Month"} required />
                        <SelectInput name="month" id="month" value={data.month} handleChange={handleChange} required>
                            <option key={"default"} value={""} disabled>--select month--</option>
                            {monthNames.map((month, index) => <option key={index}>{month}</option>)}
                        </SelectInput>
                    </div>
                    <div className="inline-flex items-end gap-2">
                        <InputLabel forInput={"series"} value={"series"} required />
                        {videoData ?
                            <>
                                <input type={"text"} name={"series"} id={"series"} value={data.series} className={"border-gray-400 bg-clip-padding bg-neutral-100 text-neutral-500 rounded-md shadow-sm transition ease-in-out self-center"} disabled />
                                <p className="text-gray-600">//Should not be changed as it will break the association. Create a new assembly if you need to change it.</p>
                            </>
                            :
                            <>
                                <TextInput type={"text"} name={"series"} id={"series"} value={data.series} className={""} handleChange={handleChange} required />
                                <p className="text-gray-600">//format should be letter and number. E.g. "A1"</p>
                            </>
                        }
                    </div>

                    <div className="flex flex-col items-start gap-2 my-2 lg:flex-row">
                        <div className="inline-flex flex-col gap-2">
                            <FileUploadDropzone name={"imageFile"} labelText={"Thumbnail Image"} onDrop={(e) => handleDrop(e, 'imageFile')} onChange={handleFileChange} accept="image/png, image/jpeg" required />
                            <InputError message={errors.imageFile} />
                        </div>
                        {(data.imageFile || data.imageLink) &&
                            <div>
                                <LabelSpan>Preview</LabelSpan>
                                <ImagePreviewComponent imageFile={data.imageFile} imageLink={data.imageLink} />
                            </div>
                        }
                    </div>
                </div>
                <VideoEditFormComponent videoContent={videoData?.videoContent ?? []} setContent={setVideoContent} />

                <div className="inline-flex justify-center w-full gap-2 mt-5 md:justify-end">
                    <ButtonLink hierarchy="secondary" href={route('assembly.admin')}>Cancel</ButtonLink>
                    <PrimaryButton type="submit" processing={processing}>{videoData ? "Update" : "Create"}</PrimaryButton>
                </div>

            </form>
        </>
    )
}