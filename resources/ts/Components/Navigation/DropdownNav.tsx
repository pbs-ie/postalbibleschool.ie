import { MenuItems } from "@/Components/Navigation/NavItem";
import DropdownNavLink from "./DropdownNavLink";

export default function DropdownNav({ submenu }: { submenu: MenuItems[] }) {
    return (
        <ul className="absolute z-10 flex-col hidden transition-opacity duration-200 ease-in-out scale-0 bg-white divide-y-2 rounded-lg opacity-0 text-slate-600 top-full -left-1/2 group-focus:flex group-hover:flex drop-shadow-lg group-hover:opacity-100 group-focus:opacity-100 group-hover:scale-100 group-focus:scale-100">
            {submenu.map((item) => (
                <li key={item.name} className="hidden space-x-8 lg:-my-px lg:flex">
                    <DropdownNavLink href={item.href} active={item.active}>{item.name}</DropdownNavLink>
                </li>
            ))}
        </ul>
    )
}