import { ChangeEventHandler } from 'react';

interface TextAreaInput {
    className?: string,
    handleChange: ChangeEventHandler<HTMLElement>
}

export default function TextAreaInput({ className, handleChange, ...props }: TextAreaInput & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {

    return (
        <textarea
            {...props}
            className={
                `border-gray-400 bg-clip-padding focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm transition ease-in-out ` +
                className
            }
            autoComplete="off"
            onChange={(e) => handleChange(e)}
        />
    );
};
