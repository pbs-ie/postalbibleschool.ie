interface ListProps {
    type?: "unordered" | "ordered",
    children: React.ReactNode,
}

export default function List({ type = "unordered", children }: ListProps) {
    return (
        (type === "ordered") ?
            <ol>
                {children}
            </ol >
            :
            <ul>
                {children}
            </ul>
    )
}