import { AssemblyVideoProps } from "@/Pages/Assembly/Index";
import ButtonLink from "@/Elements/Buttons/ButtonLink";
import PrimaryButton from "@/Elements/Buttons/PrimaryButton";
import FileInput from "@/Elements/Forms/FileInput";
import InputLabel from "@/Elements/Forms/InputLabel";
import TextInput from "@/Elements/Forms/TextInput";
import ToastBanner from "@/Components/Forms/ToastBanner";

import { usePage, useForm } from "@inertiajs/react";
import { FormEvent, useEffect } from "react";

import route from "ziggy-js";
import VideoEditFormComponent from "../Video/VideoEditFormComponent";
import ImagePreviewComponent from "./ImagePreviewComponent";

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


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
                    <div className="inline-flex gap-2">
                        <InputLabel forInput={"month"} value={"Month"} required />
                        <TextInput type={"text"} name={"month"} id={"month"} value={data.month} className={""} handleChange={handleChange} required />
                        <p className="text-gray-600">//Full month name. E.g. "January"</p>
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

                    <div className="inline-flex gap-2">
                        <InputLabel forInput={"imageFile"} value={"Thumbnail Image"} required={!videoData} />
                        <FileInput name={"imageFile"} id={"imageFile"} className={""} handleChange={handleFileChange} accept="image/png" required={!videoData} />
                    </div>
                    <ImagePreviewComponent imageFile={data.imageFile} imageLink={data.imageLink} />
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