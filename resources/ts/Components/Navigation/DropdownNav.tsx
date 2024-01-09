import { MenuItems } from "@/Components/Navigation/NavItem";
import DropdownNavLink from "./DropdownNavLink";

export default function DropdownNav({ submenu, showSubmenu }: { submenu: MenuItems[], showSubmenu: boolean }) {
    let classList = "absolute z-10 flex-col overflow-hidden transition-opacity duration-200 ease-in-out bg-white divide-y-2 rounded-b-lg text-slate-600 top-full -left-1/2 drop-shadow-lg";
    if (showSubmenu) {
        classList += " flex opacity-100 scale-100";
    } else {
        classList += " hidden opacity-0  scale-0";
    }
    return (
        <ul className={classList}>
            {submenu.map((item) => (
                <li key={item.name} className="hidden space-x-8 lg:-my-px lg:flex">
                    <DropdownNavLink href={item.href} active={item.active}>{item.name}</DropdownNavLink>
                </li>
            ))}
        </ul>
    )
}