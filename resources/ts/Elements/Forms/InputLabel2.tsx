export default function InputLabel2({ forInput, value, required = false, className = "", children, ...props }: { forInput?: string, value?: string, required?: boolean | undefined, className?: string, children?: string | React.ReactNode } & React.LabelHTMLAttributes<HTMLLabelElement>) {
    return (
        <label
            {...props}
            htmlFor={forInput}
            className={`block capitalize pt-1 text-base rounded font-medium md:text-base mb-px text-slate-700 ${required === true ? "after:content-['*'] after:ml-1 after:text-red-500" : ""} ${className}`}>
            {value ? value : children}
        </label>
    );
}
