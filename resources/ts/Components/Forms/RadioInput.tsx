import { ChangeEventHandler } from "react"

export interface RadioInputProps {
    name: string,
    id: string,
    value: string,
    className?: string,
    required?: boolean | undefined,
    ariaLabelledBy?: string,
    handleChange: ChangeEventHandler<HTMLElement>,
    checked: boolean
}
export default function RadioInput({ name, id, value, className = "", checked, ariaLabelledBy, handleChange }: RadioInputProps) {
    return (
        <input
            type="radio"
            name={name}
            id={id}
            value={value}
            className={
                `border-gray-400 bg-clip-padding focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm transition ease-in-out mr-1 ` +
                className
            }
            checked={checked}
            onChange={(e) => handleChange(e)}
            aria-labelledby={ariaLabelledBy}
        />
    )
}