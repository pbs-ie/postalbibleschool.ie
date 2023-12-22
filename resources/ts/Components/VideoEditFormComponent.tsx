import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import TextInput from "@/Components/Forms/TextInput";
import { useEffect, useReducer } from "react";

export default function VideoEditFormComponent({ videoContent, updateContent }: { videoContent: VideoMeta[], updateContent: (newContent: VideoMeta[]) => void }) {
    interface Action {
        type: "changeValue" | "addValue" | "removeValue";
    }
    interface ChangeAction extends Action {
        name: keyof VideoMeta;
        value: string | number;
        idx: number;
    }

    const initialState: VideoMeta[] = videoContent;
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
            let newItem = blankState;
            newItem[0].id = state.length;
            return [
                ...state, ...newItem
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
        updateContent([...videoState]);
    }, [videoState]);

    return (
        <>
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
        </>
    )
}