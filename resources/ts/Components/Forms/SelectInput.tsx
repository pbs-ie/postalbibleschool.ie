import { ChangeEventHandler } from "react";

interface Select {
    name: string;
    id: string;
    value: string;
    className?: string;
    required?: boolean | undefined;
    handleChange: ChangeEventHandler<HTMLSelectElement>
    children: React.ReactNode
}


export default function SelectInput({ name, id, value, className = "", required, handleChange, children }: Select) {
    return (
        <select
            name={name}
            id={id}
            value={value}
            className={`border-gray-400 bg-clip-padding focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm transition ease-in-out text-gray-700 focus-within:text-inherit ${className}`}
            onChange={(e) => handleChange(e)}
            required={required}>
            {children}
        </select>
    )
}