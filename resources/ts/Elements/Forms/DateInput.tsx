import { ChangeEventHandler } from 'react';

interface DateInputProps {
    type?: string,
    className?: string,
    hasError?: boolean,
    autoComplete?: string,
    isFocused?: boolean | undefined,
    handleChange: ChangeEventHandler<HTMLInputElement>,
    ariaLabelledBy?: string
}

export default function TextInput({ type = "date", ariaLabelledBy, className, hasError, autoComplete = "off", handleChange, ...props }: DateInputProps & React.InputHTMLAttributes<HTMLInputElement>) {

    return (
        <input
            {...props}
            type={type}
            className={
                "border-gray-400 bg-clip-padding  rounded-md shadow-sm transition ease-in-out self-center "
                + (hasError ? "border-red-500 ring-red-500" : "focus:border-indigo-500 focus:ring-indigo-500")
                + className
            }
            autoComplete={autoComplete}
            onChange={(e) => handleChange(e)}
            aria-labelledby={ariaLabelledBy}
        />
    );
};
