import ButtonLink from "@/Components/Buttons/ButtonLink";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import FileInput from "@/Components/Forms/FileInput";
import InputLabel from "@/Components/Forms/InputLabel";
import InputLabel2 from "@/Components/Forms/InputLabel2";
import RadioInput from "@/Components/Forms/RadioInput";
import TextInput from "@/Components/Forms/TextInput";
import ToastBanner from "@/Components/Forms/ToastBanner";
import VideoEditFormComponent from "@/Components/VideoEditFormComponent";
import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { usePage, useForm } from "@inertiajs/react";
import { FormEvent, useEffect, useReducer } from "react";


interface FullVideoMeta {
    id: number,
    date: string,
    description: string,
    heading: string,
    routename: string,
    imageFile?: File | null,
    imageLink: string,
    content: VideoMeta[],
    fileContent: FileMeta[],
    showDetails: "1" | "0";
}


export default function Edit({ videoData: eventData }: { videoData: FullVideoMeta }) {

    const { errors } = usePage().props;
    const { data, setData, post, reset, processing } = useForm({
        date: eventData.date,
        heading: eventData.heading,
        description: eventData.description,
        imageFile: eventData.imageFile,
        imageLink: eventData.imageLink,
        showDetails: eventData.showDetails,
        content: eventData.content
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch (event.target.name) {
            case "date":
            case "heading":
            case "description":
            case "showDetails":
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
        post(route('events.step.past.update', eventData.id));
    }

    const updateContent = (newContent: VideoMeta[]) => {
        setData('content', [...newContent]);
    }

    useEffect(() => {
        reset();
    }, []);


    return (
        <WrapperLayout>
            <ContentWrapper title="Create New STEP event">
                {errors &&
                    Object.keys(errors).map((key) =>
                        <ToastBanner key={key} message={errors[key]} />
                    )
                }
                <form method="post" onSubmit={handleSubmit} className="flex flex-col items-start gap-4 px-10 py-5 border w-fit">
                    <h2 className="p-0 mb-2 text-xl font-bold text-black">Basic Information</h2>
                    <div className="flex flex-col gap-4 mb-4">
                        <div className="inline-flex gap-2">
                            <InputLabel forInput={"date"} value={"Date"} required />
                            <TextInput type={"text"} name={"date"} id={"date"} value={data.date} className={""} handleChange={handleChange} required />
                            <p className="text-gray-600">//Full month name and Year. E.g. "January 2023"</p>
                        </div>
                        <div className="inline-flex gap-2">
                            <InputLabel forInput={"heading"} value={"Heading"} required />
                            <TextInput type={"text"} name={"heading"} id={"heading"} value={data.heading} className={""} handleChange={handleChange} required />
                        </div>
                        <div className="inline-flex items-end gap-2">
                            <InputLabel forInput={"description"} value={"Description"} required />
                            <TextInput type={"text"} name={"description"} id={"description"} value={data.description} className={""} handleChange={handleChange} required />
                        </div>
                        <div className="inline-flex items-end gap-2">
                            <InputLabel forInput={"showDetails"} value={"Show Details"} required />
                            <InputLabel2 className="mr-2">
                                <RadioInput name={"showDetails"} id={"true"} value={"1"} className={""} handleChange={handleChange} checked={data.showDetails === "1"} />
                                Yes
                            </InputLabel2>
                            <InputLabel2>
                                <RadioInput name={"showDetails"} id={"false"} value={"0"} className={""} handleChange={handleChange} checked={data.showDetails === "0"} />
                                No
                            </InputLabel2>
                        </div>

                        <div className="inline-flex gap-2">
                            <InputLabel forInput={"imageFile"} value={"Thumbnail Image"} />
                            <FileInput name={"imageFile"} id={"imageFile"} className={""} handleChange={handleFileChange} accept="image/png" />
                        </div>
                        <img className="w-60" src={data.imageFile ? URL.createObjectURL(data.imageFile) : data.imageLink} />
                    </div>
                    <VideoEditFormComponent videoContent={eventData.content} updateContent={updateContent} />

                    <div className="inline-flex justify-center w-full gap-2 mt-5 md:justify-end">
                        <ButtonLink type="secondary" href={route('events.step.past.admin')}>Cancel</ButtonLink>
                        <PrimaryButton type="submit" className="w-60" processing={processing}>Update</PrimaryButton>
                    </div>

                </form>
            </ContentWrapper>
        </WrapperLayout>
    )
}