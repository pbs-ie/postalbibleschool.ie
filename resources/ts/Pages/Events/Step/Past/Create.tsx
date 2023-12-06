import ButtonLink from "@/Components/Buttons/ButtonLink";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import FileInput from "@/Components/Forms/FileInput";
import InputLabel from "@/Components/Forms/InputLabel";
import TextInput from "@/Components/Forms/TextInput";
import ToastBanner from "@/Components/Forms/ToastBanner";
import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { usePage, useForm } from "@inertiajs/react";
import { FormEvent, useEffect, useReducer } from "react";

interface VideoProps {
    videoTitle: string,
    externalUrl: string,
    duration: string,
}


export default function Create() {

    interface Action {
        type: "changeValue" | "addValue" | "removeValue";
    }
    interface ChangeAction extends Action {
        name: keyof VideoProps;
        value: string | number;
        idx: number;
    }
    const initialState: VideoProps[] = [{
        videoTitle: "",
        externalUrl: "",
        duration: "",
    }];

    const reducer = (state: VideoProps[], action: ChangeAction | Action) => {
        if (action.type === "changeValue" && "name" in action) {
            let returnObj = [...state];
            returnObj[action.idx][action.name] = action.value + "";
            return returnObj;
        } else if (action.type === 'addValue') {
            return [
                ...state, ...initialState
            ];
        } else if (action.type === "removeValue" && "idx" in action) {
            if (state.length === 1) {
                return initialState;
            }
            let returnObj = [...state];
            returnObj.splice(action.idx, 1);
            return returnObj;
        }
        else {
            return state;
        }
    }

    const [videoState, dispatch] = useReducer(reducer, initialState);


    const { errors } = usePage().props;
    const { data, setData, post, reset, processing } = useForm({
        date: "",
        heading: "",
        description: "",
        imageFile: null as File | null,
        content: [{
            videoTitle: "",
            externalUrl: "",
            duration: "",
        }]
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch (event.target.name) {
            case "date":
            case "heading":
            case "description":
                setData(event.target.name, event.target.value);
        }
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === "imageFile" && event.target.files) {
            setData(event.target.name, event.target.files[0]);
        }
    }
    const handleComplexChange = (idx: number, event: React.ChangeEvent<HTMLInputElement | HTMLElement>) => {
        if (event.target instanceof HTMLInputElement) {
            switch (event.target.name) {
                case "videoTitle":
                case "externalUrl":
                case "duration":
                    dispatch({
                        type: "changeValue",
                        name: event.target.name,
                        value: event.target.value,
                        idx: idx
                    });
                    break;
            }
        }
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(route('events.step.past.store'));
    }

    useEffect(() => {
        reset();
    }, []);

    useEffect(() => {
        setData("content", [...videoState]);
    }, [videoState]);


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
                                <th><SecondaryButton onClick={() => dispatch({ type: "addValue" })} className="before:content-['+'] before:pr-1 before:text-lg bg-green-200">Add Row</SecondaryButton></th>
                            </tr>
                        </thead>
                        <tbody>
                            {videoState.map(({ videoTitle, externalUrl, duration }, idx) => (
                                <tr key={"contenttable" + idx}>

                                    <td>
                                        <TextInput
                                            type={"text"}
                                            name={"externalUrl"}
                                            id={`externalUrl${idx}`}
                                            value={externalUrl}
                                            className={""}
                                            handleChange={(e) => handleComplexChange(idx, e)}
                                        />
                                    </td>
                                    <td>
                                        <TextInput
                                            type={"text"}
                                            name={"videoTitle"}
                                            id={`videoTitle${idx}`}
                                            value={videoTitle}
                                            className={""}
                                            handleChange={(e) => handleComplexChange(idx, e)}
                                        />
                                    </td>
                                    <td>
                                        <TextInput
                                            type={"text"}
                                            name={"duration"}
                                            id={`duration${idx}`}
                                            value={duration}
                                            className={""}
                                            handleChange={(e) => handleComplexChange(idx, e)}
                                        />
                                    </td>
                                    <td>
                                        <SecondaryButton
                                            onClick={() => dispatch({
                                                type: "removeValue",
                                                idx: idx
                                            })}
                                            className="bg-red-200 before:content-['-'] before:pr-1 before:text-lg">
                                            Remove Row
                                        </SecondaryButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="inline-flex justify-center w-full gap-2 mt-5 md:justify-end">
                        <ButtonLink type="secondary" href={route('assembly.admin')}>Cancel</ButtonLink>
                        <PrimaryButton type="submit" className="w-60" processing={processing}>Create</PrimaryButton>
                    </div>

                </form>
            </ContentWrapper>
        </WrapperLayout>
    )
}