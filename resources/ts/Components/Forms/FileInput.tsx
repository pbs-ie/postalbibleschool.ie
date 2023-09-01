import { ChangeEventHandler, FocusEventHandler } from "react"

interface FileInput {
    name: string,
    id: string,
    className: string,
    required?: boolean | undefined,
    handleChange: ChangeEventHandler<HTMLElement>,
    accept?: string
}

export default function FileInput({ name, id, className, required, handleChange, accept }: FileInput) {
    return (
        <input
            type="file"
            name={name}
            id={id}
            onChange={handleChange}
            className={className}
            required={required}
            accept={accept}
        />
    )
}