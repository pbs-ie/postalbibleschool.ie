interface ListItemProps {
    Icon?: Icon["props"];
    isActive?: boolean;
    children: React.ReactNode;
}

export default function ListItem({ isActive = false, Icon, children }: ListItemProps) {
    return (
        <li className={`w-full flex hover:bg-gray-200 rounded ${isActive ? "font-bold" : ""}`}>
            {Icon &&
                <Icon />
            }
            {children}
        </li>
    )
}