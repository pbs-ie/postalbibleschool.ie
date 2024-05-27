import { ChangeEventHandler } from "react";

interface Select {
    value?: string;
    className?: string;
    handleChange: ChangeEventHandler<HTMLSelectElement>
    children: React.ReactNode,
    defaultValue?: string;
}


export default function SelectInput({ value, className = "", handleChange, children, defaultValue, ...props }: Select & React.SelectHTMLAttributes<HTMLSelectElement>) {
    return (
        <select
            {...props}
            defaultValue={!value ? defaultValue : undefined}
            className={`border-gray-400 bg-clip-padding focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm transition ease-in-out text-gray-700 focus-within:text-inherit ${className}`}
            onChange={(e) => handleChange(e)}>
            {children}
        </select>
    )
}