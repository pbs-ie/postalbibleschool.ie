interface ListProps {
    type?: "unordered" | "ordered",
    children: React.ReactNode,
}

export default function List({ type = "unordered", children }: ListProps) {
    return (
        (type === "ordered") ?
            <ol className="flex gap-2 lg:gap-1 lg:flex-col">
                {children}
            </ol >
            :
            <ul className="flex gap-2 lg:gap-1 lg:flex-col">
                {children}
            </ul>
    )
}