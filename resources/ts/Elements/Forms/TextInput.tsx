import { ChangeEventHandler } from 'react';

interface TextInput {
    type?: string,
    className?: string,
    autoComplete?: string,
    isFocused?: boolean | undefined,
    handleChange: ChangeEventHandler<HTMLElement>,
    ariaLabelledBy?: string
}

export default function TextInput({ type = 'text', ariaLabelledBy, className, autoComplete = "off", handleChange, ...props }: TextInput & React.InputHTMLAttributes<HTMLInputElement>) {

    return (
        <input
            {...props}
            type={type}
            className={
                "border-gray-400 bg-clip-padding focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm transition ease-in-out self-center " +
                className
            }
            autoComplete={autoComplete}
            onChange={(e) => handleChange(e)}
            aria-labelledby={ariaLabelledBy}
        />
    );
};
