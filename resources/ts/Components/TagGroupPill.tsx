interface GroupPill {
    addClass: string;
    children: React.ReactNode;
}

export default function TagGroupPill({ addClass, children }: GroupPill) {
    return (
        <div className={`capitalize whitespace-nowrap text-white text-sm rounded-md p-2 ${addClass}`}>{children}</div>
    );
}