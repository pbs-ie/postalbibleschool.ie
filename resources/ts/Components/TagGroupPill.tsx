interface GroupPill {
    addClass: string;
    children: React.ReactNode;
}

export default function TagGroupPill({ addClass, children }: GroupPill) {
    return (
        <div className={`capitalize text-xs whitespace-nowrap text-white rounded-md p-2 mx-0.5 ${addClass}`}>{children}</div>
    );
}