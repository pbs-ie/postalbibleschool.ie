import { FormEvent, useEffect } from "react";
import { usePage, useForm } from "@inertiajs/react";
import route from "ziggy-js";

import { BonusVideoProps } from "@/Pages/Assembly/Bonus/Index";

import ToastBanner from "@/Components/Forms/ToastBanner";
import LabelSpan from "@/Components/Typography/LabelSpan";
import FileUploadDropzone from "@/Components/Forms/FileUploadDropzone";
import AnchorLink from "@/Components/Navigation/AnchorLink";
import ImagePreviewComponent from "@/Components/Forms/ImagePreviewComponent";

import ButtonLink from "@/Elements/Buttons/ButtonLink";
import PrimaryButton from "@/Elements/Buttons/PrimaryButton";
import InputLabel from "@/Elements/Forms/InputLabel";
import SelectInput from "@/Elements/Forms/SelectInput";
import TextInput from "@/Elements/Forms/TextInput";
import InputWithRemainingCharsWrapper from "@/Elements/Forms/InputWithRemainingCharsWrapper";
import InputError from "@/Elements/Forms/InputError";
import BasicButton from "@/Elements/Buttons/BasicButton";
import Download from "@/Elements/Icons/Download";
import Trash from "@/Elements/Icons/Trash";

type BonusVideoCreateProps = Omit<BonusVideoProps, "id">;

export default function BonusVideoForm({ videoData }: { videoData?: BonusVideoProps }) {
    const { errors } = usePage().props;
    const MAX_INPUT_CHARACTERS = 30;

    let defaultFormObject: BonusVideoProps | BonusVideoCreateProps = {
        title: "",
        imageFile: null as File | null,
        imageLink: "",
        category: "",
        videoTitle: "",
        externalUrl: "",
        duration: "",
        downloadFile: null as File | null,
        downloadLink: "",
        downloadTitle: ""
    }
    if (videoData) {
        defaultFormObject = {
            id: videoData.id,
            title: videoData.title,
            imageFile: videoData.imageFile ?? null,
            imageLink: videoData.imageLink,
            videoTitle: videoData.videoTitle,
            externalUrl: videoData.externalUrl,
            duration: videoData.duration,
            category: videoData.category,
            downloadFile: videoData.downloadFile ?? null,
            downloadLink: videoData.downloadLink,
            downloadTitle: videoData.downloadTitle
        }
    }
    const { data, setData, post, reset, processing, delete: destroy } = useForm<BonusVideoCreateProps | BonusVideoProps>(defaultFormObject);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        switch (event.target.name) {
            case "title":
            case "videoTitle":
            case "externalUrl":
            case "duration":
            case "category":
            case "downloadTitle":
                setData(event.target.name, event.target.value);
        }
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if ((event.target.name === "imageFile" || event.target.name === "downloadFile") && event.target.files) {
            setData(event.target.name, event.target.files[0]);
        }
    }

    const handleDrop = (event: React.DragEvent, name: string) => {
        event.preventDefault();
        const droppedFiles = event.dataTransfer.files;
        if ((name === "imageFile" || name === "downloadFile") && (droppedFiles.length > 0)) {
            setData(name, droppedFiles[0]);
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (videoData) {
            post(route('assembly.bonus.update', videoData.id));
        } else {
            post(route('assembly.bonus.store'));
        }
    }

    useEffect(() => {
        reset();
    }, []);


    return (
        <>
            {errors &&
                Object.keys(errors).map((key) =>
                    <ToastBanner key={key} message={errors[key]} />
                )
            }
            <form onSubmit={handleSubmit} className="flex flex-col items-start gap-4 px-10 py-5 border w-fit">
                <h2 className="p-0 mb-2 text-xl font-bold text-black">Basic Information</h2>
                <div className="flex flex-col gap-4 mb-4">
                    <div className="inline-flex items-start gap-2 mb-5">
                        <InputLabel forInput={"title"} value={"Title"} required />
                        <InputWithRemainingCharsWrapper usedChars={data.title.length} maxChars={MAX_INPUT_CHARACTERS}>
                            <TextInput type={"text"} name={"title"} id={"title"} value={data.title} className={""} handleChange={handleChange} required />
                        </InputWithRemainingCharsWrapper>
                    </div>
                    <div className="inline-flex gap-2">
                        <InputLabel forInput={"category"} value={"Category"} required />
                        <SelectInput defaultValue={data.category} name={"category"} id={"category"} className={"self-center"} handleChange={handleChange} required>
                            <option value="" disabled>Select&hellip;</option>
                            <option value="bbw">Big Bible Words</option>
                            <option value="bbooks">Bible Books</option>
                            <option value="music">Bible Songs</option>
                        </SelectInput>
                    </div>
                    <div className="flex flex-col items-start gap-2 my-2 lg:flex-row">
                        <div className="inline-flex flex-col gap-2">
                            <FileUploadDropzone name={"imageFile"} labelText={"Thumbnail Image"} onDrop={(e) => handleDrop(e, 'imageFile')} onChange={handleFileChange} accept="image/png, image/jpeg" />
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
                <h2 className="p-0 mb-2 text-xl font-bold text-black">Video Information</h2>
                <p className="text-gray-600">Only supporting Vimeo embed links</p>
                <table>
                    <thead>
                        <tr>
                            <th>External URL</th>
                            <th>Title</th>
                            <th>Duration</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>

                            <td>
                                <TextInput
                                    type={"text"}
                                    name={"externalUrl"}
                                    id={`externalUrl`}
                                    value={data.externalUrl}
                                    className={""}
                                    handleChange={handleChange}
                                />
                            </td>
                            <td>
                                <InputWithRemainingCharsWrapper usedChars={data.videoTitle.length} maxChars={MAX_INPUT_CHARACTERS}>
                                    <TextInput
                                        type={"text"}
                                        name={"videoTitle"}
                                        id={`videoTitle`}
                                        value={data.videoTitle}
                                        className={""}
                                        handleChange={handleChange}
                                    />
                                </InputWithRemainingCharsWrapper>
                            </td>
                            <td>
                                <TextInput
                                    type={"text"}
                                    name={"duration"}
                                    id={`duration`}
                                    value={data.duration}
                                    className={""}
                                    handleChange={handleChange}
                                />
                            </td>

                        </tr>

                    </tbody>
                </table>
                <h2 className="p-0 mt-2 text-xl font-bold text-black lg:mt-4">Associated download file</h2>
                <div className="flex flex-col items-start h-full w-fit">
                    <FileUploadDropzone name={"downloadFile"} labelText="Download File" onDrop={(e) => handleDrop(e, 'downloadFile')} onChange={handleFileChange} accept="*" />
                    <InputError message={errors.downloadFile} />
                    {data.downloadFile &&
                        <div><span className="font-bold">Selected File :</span> {data.downloadFile.name}</div>
                    }
                    {data.downloadLink && videoData?.id &&
                        <div className="flex items-center gap-2 w-fit">
                            <AnchorLink Icon={Download} href={route('assets.download', data.downloadLink)}>Download File</AnchorLink>
                            <BasicButton size="small" hierarchy="delete" onClick={() => destroy(route('assembly.bonus.destroyFile', videoData.id))}>
                                <span className="flex items-center gap-2"><Trash />Remove File</span>
                            </BasicButton>
                        </div>
                    }
                </div>
                <div className="inline-flex items-start gap-2 mb-5">
                    <InputLabel forInput={"downloadTitle"} value={"Title for download file"} />
                    <InputWithRemainingCharsWrapper usedChars={data.downloadTitle?.length ?? 0} maxChars={MAX_INPUT_CHARACTERS}>
                        <TextInput type={"text"} name={"downloadTitle"} id={"downloadTitle"} value={data.downloadTitle} className={""} handleChange={handleChange} />
                    </InputWithRemainingCharsWrapper>
                </div>

                <div className="inline-flex justify-center w-full gap-2 mt-5 md:justify-end">
                    <ButtonLink hierarchy="secondary" href={route('assembly.bonus.admin')}>Cancel</ButtonLink>
                    <PrimaryButton type="submit" processing={processing}>{videoData ? "Update" : "Create"}</PrimaryButton>
                </div>

            </form>
        </>
    )
}