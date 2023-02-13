
export default function DropdownNavWrapper({ children }: { children: React.ReactNode }) {
    return (
        <ul className="absolute z-10 flex flex-col transition-opacity duration-200 ease-in-out scale-0 bg-white divide-y-2 rounded-lg opacity-0 text-slate-600 top-full -left-1/2 drop-shadow-lg group-hover:opacity-100 group-focus:opacity-100 group-hover:scale-100 group-focus:scale-100">

            {children}
        </ul>
    )
}