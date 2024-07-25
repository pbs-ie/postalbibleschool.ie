import { ChangeEventHandler, forwardRef, useEffect, useRef } from 'react';

interface NumberInput {
    min?: number;
    max?: number;
    className?: string;
    handleChange: ChangeEventHandler<HTMLInputElement>;
    ariaLabelledBy?: string;
}

export default function NumberInput({ min = 0, max = 1000, ariaLabelledBy, className, handleChange, ...props }: NumberInput & React.InputHTMLAttributes<HTMLInputElement>) {

    return (
        <input
            {...props}
            type="number"
            max={max}
            min={min}
            className={
                "border-gray-400 bg-clip-padding focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm transition ease-in-out " +
                className
            }
            onChange={(e) => handleChange(e)}
            aria-labelledby={ariaLabelledBy}
        />
    );
};
