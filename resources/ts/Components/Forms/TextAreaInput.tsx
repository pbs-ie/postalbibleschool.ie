import { ChangeEventHandler } from 'react';

interface TextAreaInput {
    name: string,
    id: string,
    value: string,
    className: string,
    rows: number
    required?: boolean | undefined,
    handleChange: ChangeEventHandler<HTMLElement>
}

export default function TextAreaInput({ name, id, value, className, rows, required, handleChange }: TextAreaInput) {

    return (
        <div className="flex flex-col items-start">
            <textarea
                name={name}
                id={id}
                value={value}
                className={
                    `border-gray-300 bg-clip-padding focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm transition ease-in-out` +
                    className
                }
                autoComplete="off"
                rows={rows}
                required={required}
                onChange={(e) => handleChange(e)}
            />
        </div>
    );
};
