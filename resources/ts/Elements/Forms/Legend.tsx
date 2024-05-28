export default function Legend({ value, required = false, className, children }: { value: string, required?: boolean, className?: string, children?: string }) {
    return (
        <legend aria-required={required} className={`inline-block capitalize p-2 text-base rounded bg-sky-100 font-medium md:text-base mb-px text-slate-700 ${required && "after:content-['*'] after:ml-1 after:text-red-500"} ${className}`}>
            {value ? value : children}
        </legend>
    );
}
