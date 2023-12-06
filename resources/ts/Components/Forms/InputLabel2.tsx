export default function InputLabel2({ forInput, value, required = false, className = "", children }: { forInput?: string, value?: string, required?: boolean | undefined, className?: string, children?: string | React.ReactNode }) {
    return (
        <label htmlFor={forInput} className={`block capitalize py-1 text-base rounded font-medium md:text-base mb-px text-slate-700 ${required === true ? "after:content-['*'] after:ml-1 after:text-red-500" : ""} ${className}`}>
            {value ? value : children}
        </label>
    );
}
