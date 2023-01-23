import { ChangeEventHandler, forwardRef, useEffect, useRef } from 'react';

interface TextInput {
    type: string,
    name: string,
    id: string,
    value: string | number,
    className: string,
    autoComplete: string,
    required?: boolean | undefined,
    isFocused?: boolean | undefined,
    handleChange: ChangeEventHandler<HTMLElement>,
    placeholder?: string,
    ariaLabelledBy?: string
}

export default function TextInput({ type = 'text', name, id, value, placeholder, ariaLabelledBy, className, autoComplete, required, handleChange }: TextInput) {

    return (
        <input
            type={type}
            name={name}
            id={id}
            value={value}
            placeholder={placeholder}
            className={
                "border-gray-400 bg-clip-padding focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm transition ease-in-out self-center " +
                className
            }
            autoComplete={autoComplete}
            required={required}
            onChange={(e) => handleChange(e)}
            aria-labelledby={ariaLabelledBy}
        />
    );
};
