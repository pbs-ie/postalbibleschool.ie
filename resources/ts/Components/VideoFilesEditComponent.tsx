import Heading3 from "@/Components/Typography/Heading3";
import LessonDownloadButton from "./Buttons/LessonDownloadButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import { useReducer, useEffect } from "react";
import TextInput from "./Forms/TextInput";
import InputLabel from "./Forms/InputLabel";
import SelectInput from "./Forms/SelectInput";
import FileInput from "./Forms/FileInput";
import LabelSpan from "./Typography/LabelSpan";
import InputLabel2 from "./Forms/InputLabel2";
import Newspaper from "./Icons/Newspaper";
import FileIcon from "./Icons/FileIcon";


export default function VideoFilesEditComponent({ fileContent, setContent, mode = "edit" }: { fileContent: FileMeta[], setContent: (a: FileMeta[]) => void, mode?: "create" | "edit" }) {
    interface Action {
        type: "changeValue" | "addValue" | "removeValue";
    }
    interface ChangeAction extends Action {
        name: keyof FileMeta;
        value: string | number | File;
        idx: number;
    }

    const initialState: FileMeta[] = fileContent;
    const blankState: FileMeta[] = [{
        id: 0,
        name: "",
        title: "",
        type: "",
        fileData: null
    }];


    const reducer = (state: FileMeta[], action: ChangeAction | Action) => {
        if (action.type === "changeValue" && "name" in action) {
            let returnObj = [...state];
            if (action.name === "id") {
                returnObj[action.idx][action.name] = +action.value;
            } else if (action.name === "type") {
                if (action.value === "document" || action.value === "slide")
                    returnObj[action.idx][action.name] = action.value;
            } else if (action.name === "fileData") {
                returnObj[action.idx][action.name] = action.value as File;
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
    const [fileState, dispatch] = useReducer(reducer, initialState);

    const handleComplexChange = (idx: number, event: React.ChangeEvent<HTMLInputElement | HTMLElement>) => {
        if (event.target instanceof HTMLInputElement) {
            switch (event.target.name) {
                case "title":
                case "name":
                case "id":
                    dispatch({
                        type: "changeValue",
                        name: event.target.name,
                        value: event.target.value,
                        idx: idx
                    });
                    break;
                case "fileData":
                    if (event.target.files) {
                        dispatch({
                            type: "changeValue",
                            name: event.target.name,
                            value: event.target.files[0],
                            idx: idx
                        })
                    }
            }
        } else if (event.target instanceof HTMLSelectElement) {
            switch (event.target.name) {
                case "type":
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
        setContent([...fileState]);
    }, [fileState]);

    return (
        <>
            <h2 className="p-0 mb-2 text-xl font-bold text-black">File Information</h2>
            {fileState.length === 0 ?
                <SecondaryButton onClick={() => dispatch({ type: "addValue" })} className="before:content-['+'] before:pr-1 before:text-lg bg-green-200">Add Row</SecondaryButton>
                :
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>File</th>
                            <th><SecondaryButton onClick={() => dispatch({ type: "addValue" })} className="before:content-['+'] before:pr-1 before:text-lg bg-green-200">Add Row</SecondaryButton></th>
                        </tr>
                    </thead>
                    <tbody>
                        {fileState.map(({ title, name, type, fileData, id }, idx) => (
                            <tr key={"filetable" + idx}>
                                <td>
                                    {mode === "edit" ?
                                        <TextInput
                                            type={"text"}
                                            name={"id"}
                                            id={`fileid${idx}`}
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
                                        name={"name"}
                                        id={`filename${idx}`}
                                        value={name}
                                        className={""}
                                        handleChange={(e) => handleComplexChange(idx, e)}
                                    />
                                </td>
                                <td>
                                    <TextInput
                                        type={"text"}
                                        name={"title"}
                                        id={`filetitle${idx}`}
                                        value={title}
                                        className={""}
                                        handleChange={(e) => handleComplexChange(idx, e)}
                                    />
                                </td>
                                <td>
                                    <SelectInput
                                        defaultValue={type}
                                        name={"type"}
                                        id={`filetype${idx}`}
                                        className={"self-center"}
                                        handleChange={(e) => handleComplexChange(idx, e)}
                                        required>
                                        <option value="" disabled>Select&hellip;</option>
                                        <option value="document">Document</option>
                                        <option value="slide">Slide</option>
                                    </SelectInput>
                                </td>
                                <td>
                                    <InputLabel2 forInput={`fileData${idx}`} className="flex items-center gap-1 pr-2 border rounded cursor-pointer border-slate-400">
                                        <FileInput name={"fileData"} id={`fileData${idx}`} className={"overflow-hidden w-0"} handleChange={(e) => handleComplexChange(idx, e)} />
                                        <FileIcon className="w-4" />
                                        {fileData ? fileData.name : "Choose File"}
                                    </InputLabel2>
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
            }
        </>
    )
}