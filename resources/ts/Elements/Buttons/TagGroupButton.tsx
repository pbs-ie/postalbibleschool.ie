interface GroupPill {
    addClass: string;
    children: React.ReactNode;
}

export default function TagGroupPill({ addClass, children }: GroupPill) {
    return (
        <div className={`capitalize whitespace-nowrap text-white rounded-md p-2 hover:bg-gradient-to-r hover:from-black/10 hover:to-black/10 active:bg-gradient-to-r active:to-white/10 ${addClass}`}>{children}</div>
    );
}