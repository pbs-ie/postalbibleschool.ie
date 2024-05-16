export default function GroupLabel({ id, value, required, className, children }: { id: string, value: string, required?: boolean | undefined, className?: string, children?: React.ReactNode }) {
    return (
        <span
            id={id}
            className={`inline-block text-base p-2 rounded bg-sky-100 font-medium md:text-base mb-px text-slate-700 ${required && "after:content-['*'] after:ml-1 after:text-red-500"} ${className}`} >
            {value ? value : children}
        </span>
    )
}