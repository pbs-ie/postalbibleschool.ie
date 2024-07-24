import { ChangeEventHandler } from "react";

interface Select {
    className?: string;
    handleChange: ChangeEventHandler<HTMLSelectElement>
    children: React.ReactNode
}


export default function SelectInput({ className = "", handleChange, children, ...props }: Select & React.SelectHTMLAttributes<HTMLSelectElement>) {
    return (
        <select
            {...props}
            className={`border-gray-400 bg-clip-padding focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm transition ease-in-out text-gray-700 focus-within:text-inherit ${className}`}
            onChange={(e) => handleChange(e)}>
            {children}
        </select>
    )
}