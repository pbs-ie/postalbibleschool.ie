import NavLink from "@/Components/Navigation/NavLink";
import DropdownNav from "@/Components/Navigation/DropdownNav";

export interface MenuItems {
    name: string,
    href: any,
    active: any,
    submenu?: MenuItems[] | undefined
}

export default function NavItem({ name, href, active, submenu }: MenuItems) {
    if (submenu) {
        return (
            <li className="relative hidden space-x-8 group lg:-my-px lg:ml-10 lg:flex">
                <NavLink href={href} active={active} role="button" ariaHaspopup="menu">{name}
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" className="w-2 ml-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path>
                    </svg>
                </NavLink>
                <DropdownNav submenu={submenu} />
            </li>
        )
    }
    else {
        return (
            <li className="hidden space-x-8 lg:-my-px lg:ml-10 lg:flex">
                <NavLink href={href} active={active}>{name}</NavLink>
            </li>
        )
    }
}
