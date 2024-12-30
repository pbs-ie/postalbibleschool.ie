import FileInput from "@/Elements/Forms/FileInput";
import InputLabel2 from "@/Elements/Forms/InputLabel2";
import CloudArrowUp from "@/Elements/Icons/CloudArrowUp";

interface FileUploadProps {
    name: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    onDrop: React.DragEventHandler,
    accept?: string;
    labelText: string;
    required?: boolean;
}

export default function FileUploadDropzone({ name, accept, labelText, onChange, onDrop, required = false }: FileUploadProps) {
    return (
        <div className="inline-flex flex-col items-start gap-2">
            <InputLabel2 htmlFor={name} required>{labelText}</InputLabel2>
            <label className="p-10 border-2 border-blue-400 border-dashed rounded-lg cursor-pointer hover:bg-gray-100" onDrop={onDrop} onDragOver={(event) => event.preventDefault()} htmlFor={name} aria-required={required}>
                <div className="flex flex-col items-center gap-2">
                    <CloudArrowUp className="w-10 h-10 text-blue-500" />
                    <p className="text-gray-800 "><span className="font-semibold"><button type="button" onClick={() => document.getElementById(name)?.click()}>Click</button> to upload</span> or drag and drop</p>
                    <p className="text-sm text-gray-500">Maximum file size 2 MB</p>
                </div>
            </label>
            <FileInput className="hidden" name={name} id={name} onChange={onChange} accept={accept} formNoValidate />
        </div>
    )
}