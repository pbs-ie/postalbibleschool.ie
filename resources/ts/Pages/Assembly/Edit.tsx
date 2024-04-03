import ButtonLink from "@/Elements/Buttons/ButtonLink";
import PrimaryButton from "@/Elements/Buttons/PrimaryButton";
import SecondaryButton from "@/Elements/Buttons/SecondaryButton";
import FileInput from "@/Components/Forms/FileInput";
import InputLabel from "@/Components/Forms/InputLabel";
import TextInput from "@/Components/Forms/TextInput";
import ToastBanner from "@/Components/Forms/ToastBanner";
import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { usePage, useForm, Link } from "@inertiajs/react";
import { FormEvent, useEffect, useReducer, useRef } from "react";
import PlusHollow from "@/Elements/Icons/PlusHollow";
import MinusCircle from "@/Elements/Icons/MinusCircle";

interface VideoEdit {
    title: string,
    externalUrl: string,
    duration: string,
    id: string
}
interface FullAssemblyVideo {
    id: number,
    monthTitle: string,
    month: string,
    series: string,
    routename: string,
    imageFile?: File | null,
    imageLink: string,
    content: VideoEdit[]
}

export default function Edit({ videoData }: { videoData: FullAssemblyVideo }) {

    interface Action {
        type: "changeValue" | "addValue" | "removeValue";
    }
    interface ChangeAction extends Action {
        name: keyof VideoEdit;
        value: string | number;
        idx: number;
    }
    const initialState: VideoEdit[] = videoData.content;
    const blankState: VideoEdit[] = [{
        title: "",
        externalUrl: "",
        duration: "",
        id: ""
    }]

    const reducer = (state: VideoEdit[], action: ChangeAction | Action) => {
        if (action.type === "changeValue" && "name" in action) {
            let returnObj = [...state];
            returnObj[action.idx][action.name] = action.value + "";
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
        monthTitle: videoData.monthTitle,
        month: videoData.month,
        series: videoData.series,
        routename: videoData.routename,
        imageFile: videoData.imageFile,
        imageLink: videoData.imageLink,
        content: videoData.content
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch (event.target.name) {
            case "monthTitle":
            case "month":
            case "series":
            case "routename":
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

    const handleRowChange = (action: ChangeAction | Action) => {
        dispatch(action);
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(route('assembly.update', videoData.id));
    }

    useEffect(() => {
        reset();
    }, []);

    useEffect(() => {
        setData("content", [...videoState]);
    }, [videoState]);

    return (
        <WrapperLayout>
            <ContentWrapper title="Edit Assembly">
                {errors &&
                    Object.keys(errors).map((key) =>
                        <ToastBanner key={key} message={errors[key]} />
                    )
                }
                <form method="post" onSubmit={handleSubmit} className="flex flex-col items-start gap-4 px-10 py-5 border w-fit">
                    <h2 className="p-0 mb-2 text-xl font-bold text-black">Basic Information</h2>
                    <div className="flex flex-col gap-4 mb-4">
                        <div className="inline-flex gap-2">
                            <InputLabel forInput={"monthTitle"} value={"Title"} required />
                            <TextInput type={"text"} name={"monthTitle"} id={"monthTitle"} value={data.monthTitle} className={""} handleChange={handleChange} required />
                        </div>
                        <div className="inline-flex gap-2">
                            <InputLabel forInput={"month"} value={"Month"} required />
                            <TextInput type={"text"} name={"month"} id={"month"} value={data.month} className={""} handleChange={handleChange} required />
                            <p className="text-gray-600">//Full month name. E.g. "January"</p>
                        </div>
                        <div className="inline-flex items-end gap-2">
                            <InputLabel forInput={"series"} value={"series"} required />
                            <input type={"text"} name={"series"} id={"series"} value={data.series} className={"border-gray-400 bg-clip-padding bg-neutral-100 text-neutral-500 rounded-md shadow-sm transition ease-in-out self-center"} disabled />
                            <p className="text-gray-600">//Should not be changed as it will break the association. Create a new assembly if you need to change it.</p>
                        </div>
                        <div className="inline-flex items-end gap-2">
                            <InputLabel forInput={"routename"} value={"routename"} required />
                            <input type={"text"} name={"routename"} id={"routename"} value={data.routename} className={"border-gray-400 bg-clip-padding bg-neutral-100 text-neutral-500 rounded-md shadow-sm transition ease-in-out self-center"} required disabled />
                            <p className="text-gray-600">//Should not be changed as it will break the association. Create a new assembly if you need to change it.</p>
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
                                <th><SecondaryButton onClick={() => handleRowChange({ type: "addValue" })} ><span className="inline-flex gap-2 items-center">Add Row <PlusHollow className="w-5 h-5" /></span></SecondaryButton></th>
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
                                            required
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
                                            required
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
                                            onClick={() => handleRowChange({
                                                type: "removeValue",
                                                idx: idx
                                            })}
                                        >
                                            <span className="inline-flex gap-2 items-center">Remove Row <MinusCircle className="w-5 h-5" /></span>
                                        </SecondaryButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="inline-flex justify-center w-full gap-2 mt-5 md:justify-end">
                        <ButtonLink hierarchy="secondary" href={route('assembly.admin')}>Cancel</ButtonLink>
                        <PrimaryButton type="submit" processing={processing}>Update</PrimaryButton>
                    </div>

                </form>
            </ContentWrapper>
        </WrapperLayout>
    )
}