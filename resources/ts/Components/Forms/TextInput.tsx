import { ChangeEventHandler, forwardRef, useEffect, useRef } from 'react';

interface TextInput {
    type: string,
    name: string,
    id: string,
    value: string,
    className: string,
    autoComplete: string,
    required?: boolean | undefined,
    isFocused?: boolean | undefined,
    handleChange: ChangeEventHandler<HTMLElement>
}

export default function TextInput({ type = 'text', name, id, value, className, autoComplete, required, handleChange }: TextInput) {

    return (
        <div className="flex flex-col items-start">
            <input
                type={type}
                name={name}
                id={id}
                value={value}
                className={
                    `border-gray-300 bg-clip-padding focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm transition ease-in-out` +
                    className
                }
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => handleChange(e)}
            />
        </div>
    );
};
