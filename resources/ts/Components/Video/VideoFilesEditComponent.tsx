import SecondaryButton from "@/Elements/Buttons/SecondaryButton";
import { useReducer, useEffect } from "react";
import TextInput from "@/Elements/Forms/TextInput";
import SelectInput from "@/Elements/Forms/SelectInput";
import FileInput from "@/Elements/Forms/FileInput";
import InputLabel2 from "@/Elements/Forms/InputLabel2";
import FileIcon from "@/Elements/Icons/FileIcon";
import { usePage } from "@inertiajs/react";
import EditIcon from "@/Elements/Icons/EditIcon";
import { truncateStringEnd } from "@/helper";


export default function VideoFilesEditComponent({ fileContent = [], setContent }: { fileContent: FileMeta[], setContent: (a: FileMeta[]) => void }) {
    const { errors } = usePage().props;
    const isEditMode = fileContent.length !== 0;

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
            <h2 className="p-0 text-xl font-bold text-black">File Information</h2>
            <p className="p-0 mb-2 text-base text-gray-600">Only supporting .pdf files at the moment.</p>
            {(fileState && fileState.length === 0) ?
                <SecondaryButton onClick={() => dispatch({ type: "addValue" })}>Add Row</SecondaryButton>
                :
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>File</th>
                            <th><SecondaryButton onClick={() => dispatch({ type: "addValue" })}>Add Row</SecondaryButton></th>
                        </tr>
                    </thead>
                    <tbody>
                        {fileState && fileState.map(({ title, name, type, fileData, filePath, id }, idx) => (
                            <tr className={Object.keys(errors).some(key => key.includes('fileContent.' + idx)) ? "border-2 border-red-500" : ""} key={"filetable" + idx}>
                                <td>
                                    {isEditMode ?
                                        <TextInput
                                            hasError={!!errors.fileContent}
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
                                        hasError={!!errors.fileContent}
                                        type={"text"}
                                        name={"name"}
                                        id={`filename${idx}`}
                                        value={name}
                                        className={""}
                                        handleChange={(e) => handleComplexChange(idx, e)}
                                        required
                                    />
                                </td>
                                <td>
                                    <TextInput
                                        hasError={!!errors.fileContent}
                                        type={"text"}
                                        name={"title"}
                                        id={`filetitle${idx}`}
                                        value={title}
                                        className={""}
                                        handleChange={(e) => handleComplexChange(idx, e)}
                                        required
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
                                    <InputLabel2 title={fileData ? fileData.name : ""} forInput={`fileData${idx}`} className="flex items-center justify-center p-1 border rounded-md cursor-pointer hover:ring-1 hover:text-pbsblue ring-pbsblue active:ring-2 border-slate-400">
                                        <FileInput name={"fileData"} id={`fileData${idx}`} className={"overflow-hidden w-0"} handleChange={(e) => handleComplexChange(idx, e)} />
                                        {fileData ?
                                            <span className="text-sm lowercase">{truncateStringEnd(fileData.name, 14)}</span>
                                            : filePath ? <span className="flex gap-1"><EditIcon />Change File</span>
                                                : <span className="flex gap-1"><FileIcon />Choose File</span>}
                                    </InputLabel2>
                                </td>
                                <td>
                                    <SecondaryButton
                                        onClick={() => dispatch({
                                            type: "removeValue",
                                            idx: idx
                                        })}>
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