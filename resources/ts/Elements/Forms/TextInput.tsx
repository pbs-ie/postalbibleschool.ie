import { ChangeEventHandler } from 'react';

interface TextInput {
    type?: string,
    className?: string,
    hasError?: boolean,
    autoComplete?: string,
    isFocused?: boolean | undefined,
    handleChange: ChangeEventHandler<HTMLInputElement>,
    ariaLabelledBy?: string
}

export default function TextInput({ type = 'text', ariaLabelledBy, className, hasError, autoComplete = "off", handleChange, ...props }: TextInput & React.InputHTMLAttributes<HTMLInputElement>) {

    return (
        <input
            {...props}
            type={type}
            className={
                className +
                " border-gray-400 bg-clip-padding  rounded-md shadow-sm transition ease-in-out self-center "
                + (hasError ? "border-red-500 ring-red-500" : "focus:border-indigo-500 focus:ring-indigo-500")
            }
            autoComplete={autoComplete}
            onChange={(e) => handleChange(e)}
            aria-labelledby={ariaLabelledBy}
        />
    );
};
