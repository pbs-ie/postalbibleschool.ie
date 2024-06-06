import ButtonLink from "@/Elements/Buttons/ButtonLink";
import PrimaryButton from "@/Elements/Buttons/PrimaryButton";
import FileInput from "@/Elements/Forms/FileInput";
import InputLabel from "@/Elements/Forms/InputLabel";
import SelectInput from "@/Elements/Forms/SelectInput";
import TextInput from "@/Elements/Forms/TextInput";
import ToastBanner from "@/Components/Forms/ToastBanner";
import { usePage, useForm } from "@inertiajs/react";
import { FormEvent, useEffect } from "react";
import BonusAssemblyWrapper from "@/Layouts/BonusAssemblyWrapper";
import route from "ziggy-js";

export default function Create() {

    const { errors } = usePage().props;
    const { data, setData, post, reset, processing } = useForm({
        monthTitle: "",
        imageFile: null as File | null,
        category: "",
        videoTitle: "",
        externalUrl: "",
        duration: "",

    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        switch (event.target.name) {
            case "monthTitle":
            case "videoTitle":
            case "externalUrl":
            case "duration":
            case "category":
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
        post(route('assembly.bonus.store'));
    }

    useEffect(() => {
        reset();
    }, []);


    return (
        <BonusAssemblyWrapper title={"Create New Bonus Assembly Video"} navBackText={"Back to Bonus Gallery"} navBackRoute={route('assembly.bonus.index')}>
            {errors &&
                Object.keys(errors).map((key) =>
                    <ToastBanner key={key} message={errors[key]} />
                )
            }
            <form onSubmit={handleSubmit} className="flex flex-col items-start gap-4 px-10 py-5 border w-fit">
                <h2 className="p-0 mb-2 text-xl font-bold text-black">Basic Information</h2>
                <div className="flex flex-col gap-4 mb-4">
                    <div className="inline-flex gap-2">
                        <InputLabel forInput={"monthTitle"} value={"Title"} required />
                        <TextInput type={"text"} name={"monthTitle"} id={"monthTitle"} value={data.monthTitle} className={""} handleChange={handleChange} required />
                    </div>
                    <div className="inline-flex gap-2">
                        <InputLabel forInput={"category"} value={"Category"} required />
                        <SelectInput defaultValue="" name={"category"} id={"category"} className={"self-center"} handleChange={handleChange} required>
                            <option value="" disabled>Select&hellip;</option>
                            <option value="bbw">Big Bible Words</option>
                            <option value="bbooks">Bible Books</option>
                        </SelectInput>
                    </div>
                    <div className="inline-flex gap-2">
                        <InputLabel forInput={"imageFile"} value={"Thumbnail Image"} required />
                        <FileInput name={"imageFile"} id={"imageFile"} className={""} handleChange={handleFileChange} required accept="image/png" />
                    </div>
                    <img className="w-60" src={data.imageFile ? URL.createObjectURL(data.imageFile) : ""} />
                </div>
                <h2 className="p-0 mb-2 text-xl font-bold text-black">Video Information</h2>
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
                                <TextInput
                                    type={"text"}
                                    name={"videoTitle"}
                                    id={`videoTitle`}
                                    value={data.videoTitle}
                                    className={""}
                                    handleChange={handleChange}
                                />
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

                <div className="inline-flex justify-center w-full gap-2 mt-5 md:justify-end">
                    <ButtonLink hierarchy="secondary" href={route('assembly.bonus.admin')}>Cancel</ButtonLink>
                    <PrimaryButton type="submit" processing={processing}>Create</PrimaryButton>
                </div>

            </form>
        </BonusAssemblyWrapper>
    )
}