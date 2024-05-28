import { ChangeEventHandler } from "react"

export interface RadioInputProps {
    className?: string,
    ariaLabelledBy?: string,
    handleChange: ChangeEventHandler<HTMLInputElement>,
    checked: boolean
}
export default function RadioInput({ className = "", checked, ariaLabelledBy, handleChange, ...props }: RadioInputProps & React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            type="radio"
            className={
                `border-gray-400 bg-clip-padding focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm transition ease-in-out ` +
                className
            }
            checked={checked}
            onChange={(e) => handleChange(e)}
            aria-labelledby={ariaLabelledBy}
        />
    )
}