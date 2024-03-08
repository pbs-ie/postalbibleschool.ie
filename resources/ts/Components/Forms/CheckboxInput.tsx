import { ChangeEventHandler } from "react"

interface CheckboxInput {
    name?: string,
    id: string,
    value?: string,
    className?: string,
    required?: boolean | undefined,
    ariaLabelledBy?: string,
    handleChange: ChangeEventHandler<HTMLInputElement>,
    isChecked: boolean
}
export default function CheckboxInput({ name, id, value, className, required, ariaLabelledBy, handleChange, isChecked }: CheckboxInput) {
    return (
        <input
            type="checkbox"
            name={name}
            id={id}
            value={value}
            className={
                `border-gray-400 bg-clip-padding focus:border-indigo-500 focus:ring-indigo-500 rounded-sm shadow-sm transition ease-in-out mr-1 ` +
                className
            }
            checked={isChecked}
            onChange={(e) => handleChange(e)}
            aria-labelledby={ariaLabelledBy}
        />
    )
}