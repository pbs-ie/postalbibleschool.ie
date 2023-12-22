import ButtonLink from "@/Components/Buttons/ButtonLink";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import FileInput from "@/Components/Forms/FileInput";
import InputLabel from "@/Components/Forms/InputLabel";
import InputLabel2 from "@/Components/Forms/InputLabel2";
import RadioInput from "@/Components/Forms/RadioInput";
import TextInput from "@/Components/Forms/TextInput";
import ToastBanner from "@/Components/Forms/ToastBanner";
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
    showDetails: "1" | "0";
}


export default function Edit({ videoData }: { videoData: FullVideoMeta }) {

    interface Action {
        type: "changeValue" | "addValue" | "removeValue";
    }
    interface ChangeAction extends Action {
        name: keyof VideoMeta;
        value: string | number;
        idx: number;
    }
    const initialState: VideoMeta[] = videoData.content;
    const blankState: VideoMeta[] = [{
        title: "",
        externalUrl: "",
        duration: "",
        id: 0
    }];

    const reducer = (state: VideoMeta[], action: ChangeAction | Action) => {
        if (action.type === "changeValue" && "name" in action) {
            let returnObj = [...state];
            if (action.name === "id") {
                returnObj[action.idx][action.name] = +action.value;
            } else {
                returnObj[action.idx][action.name] = action.value + "";
            }
            return returnObj;
        } else if (action.type === 'addValue') {
            return [
                ...state, ...blankState
            ];
        } else if (action.type === "removeValue" && "idx" in action) {
            if (state.length === 1) {
                return blankState;
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
        date: videoData.date,
        heading: videoData.heading,
        description: videoData.description,
        imageFile: videoData.imageFile,
        imageLink: videoData.imageLink,
        showDetails: videoData.showDetails,
        content: videoData.content
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
    const handleComplexChange = (idx: number, event: React.ChangeEvent<HTMLInputElement | HTMLElement>) => {
        if (event.target instanceof HTMLInputElement) {
            switch (event.target.name) {
                case "title":
                case "externalUrl":
                case "duration":
                case "id":
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
        post(route('events.step.past.update', videoData.id));
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
                    <h2 className="p-0 mb-2 text-xl font-bold text-black">Video Information</h2>
                    <p className="text-gray-600">Change the ID number to change order of video. Be careful of the maximum number of videos</p>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>External URL</th>
                                <th>Title</th>
                                <th>Duration</th>
                                <th><SecondaryButton onClick={() => dispatch({ type: "addValue" })} className="before:content-['+'] before:pr-1 before:text-lg bg-green-200">Add Row</SecondaryButton></th>
                            </tr>
                        </thead>
                        <tbody>
                            {videoState.map(({ title, externalUrl, duration, id }, idx) => (
                                <tr key={"contenttable" + idx}>
                                    <td>
                                        <TextInput
                                            type={"text"}
                                            name={"id"}
                                            id={`id${idx}`}
                                            value={id}
                                            className={""}
                                            handleChange={(e) => handleComplexChange(idx, e)}
                                            required
                                        />
                                    </td>
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
                                            name={"title"}
                                            id={`title${idx}`}
                                            value={title}
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
                        <ButtonLink type="secondary" href={route('events.step.past.admin')}>Cancel</ButtonLink>
                        <PrimaryButton type="submit" className="w-60" processing={processing}>Update</PrimaryButton>
                    </div>

                </form>
            </ContentWrapper>
        </WrapperLayout>
    )
}