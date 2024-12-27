import SecondaryButton from "@/Elements/Buttons/SecondaryButton";
import TextInput from "@/Elements/Forms/TextInput";
import MinusCircle from "@/Elements/Icons/MinusCircle";
import PlusHollow from "@/Elements/Icons/PlusHollow";
import { usePage } from "@inertiajs/react";
import { useEffect, useReducer } from "react";

export default function VideoEditFormComponent({ videoContent = [], setContent }: { videoContent: VideoMeta[], setContent: (newContent: VideoMeta[]) => void }) {
    const { errors } = usePage().props;

    const isEditMode = videoContent.length !== 0;

    interface Action {
        type: "changeValue" | "addValue" | "removeValue";
    }
    interface ChangeAction extends Action {
        name: keyof VideoMeta;
        value: string | number;
        idx: number;
    }

    const blankState: VideoMeta[] = [{
        title: "",
        externalUrl: "",
        duration: "",
        id: 0
    }];
    const initialState: VideoMeta[] = isEditMode ? [...videoContent] : [];


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
            let newItem = blankState;
            newItem[0].id = state.length;
            return [
                ...state, ...newItem
            ];
        } else if (action.type === "removeValue" && "idx" in action) {
            if (state.length === 1) {
                return [];
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

    useEffect(() => {
        setContent([...videoState]);
    }, [videoState]);

    return (
        <>
            <h2 className="p-0 mb-2 text-xl font-bold text-black">Video Information</h2>
            {isEditMode &&
                <p className="text-gray-600">Change the ID number to change order of video. Be careful of the maximum number of videos</p>
            }
            <SecondaryButton onClick={() => dispatch({ type: "addValue" })}><span className="inline-flex items-center gap-2">Add Row <PlusHollow className="w-5 h-5" /></span></SecondaryButton>
            {videoState.length > 0 &&
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>External URL</th>
                            <th>Title</th>
                            <th>Duration</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {videoState.map(({ title, externalUrl, duration, id }, idx) => (
                            <tr className={Object.keys(errors).some(key => key.includes('videoContent.' + idx)) ? "border-2 border-red-500" : ""} key={"contenttable" + idx}>
                                <td>
                                    {isEditMode ?
                                        <TextInput
                                            type={"text"}
                                            name={"id"}
                                            id={`id${idx}`}
                                            value={id}
                                            className={""}
                                            handleChange={(e) => handleComplexChange(idx, e)}
                                            required
                                        />
                                        :
                                        <div className="px-4">{idx}</div>
                                    }
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
                                        })}>
                                        <span className="inline-flex items-center gap-2">Remove Row <MinusCircle className="w-5 h-5" /></span>
                                    </SecondaryButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </>
    )
}