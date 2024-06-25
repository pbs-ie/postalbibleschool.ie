import { ChangeEventHandler } from "react"


export default function FileInput({ ...props }: Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">) {
    return (
        <input
            {...props}
            type="file"
        />
    )
}