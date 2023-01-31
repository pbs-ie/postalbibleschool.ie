
export default function NavigationButton({ disabled = false, onClick, className = "", children }: { disabled?: boolean, onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined, className?: string, children: React.ReactNode }) {
    return (
        <button
            className={"disabled:text-gray-400 hover:text-blue-500 hover:scale-110 md:hover:scale-125 focus:text-blue-500 active:text-blue-500 transition-[transform,color] z-10 " + className}
            disabled={disabled}
            onClick={onClick}>
            {children}
        </button>
    )
}