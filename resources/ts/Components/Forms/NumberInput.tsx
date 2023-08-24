import { ChangeEventHandler, forwardRef, useEffect, useRef } from 'react';

interface NumberInput {
    name: string;
    id: string;
    value: number;
    min?: number;
    max?: number;
    className?: string;
    autoComplete: string;
    required?: boolean | undefined;
    isFocused?: boolean | undefined;
    handleChange: ChangeEventHandler<HTMLElement>;
    placeholder?: string;
    ariaLabelledBy?: string;
}

export default function NumberInput({ name, id, value, min = 0, max = 1000, placeholder, ariaLabelledBy, className, autoComplete, required, handleChange }: NumberInput) {

    return (
        <input
            type="number"
            name={name}
            id={id}
            value={value}
            max={max}
            min={min}
            placeholder={placeholder}
            className={
                "border-gray-400 bg-clip-padding focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm transition ease-in-out " +
                className
            }
            autoComplete={autoComplete}
            required={required}
            onChange={(e) => handleChange(e)}
            aria-labelledby={ariaLabelledBy}
        />
    );
};
