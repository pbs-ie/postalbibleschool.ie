import NavLink from "@/Components/Navigation/NavLink";
import DropdownNav from "@/Components/Navigation/DropdownNav";
import { useState } from "react";
import CaratDown from "@/Elements/Icons/CaratDown";

export interface MenuItems {
    name: string,
    href: any,
    active: any,
    submenu?: MenuItems[] | undefined
}

export default function NavItem({ name, href, active, submenu }: MenuItems) {
    const [showSubmenu, setShowSubmenu] = useState(false);
    if (submenu) {
        return (
            <li
                onMouseOver={() => setShowSubmenu(true)}
                onMouseLeave={() => setTimeout(() => setShowSubmenu(false), 1500)}
                className="relative hidden space-x-8 group/navitem lg:-my-px lg:ml-6 lg:flex">
                <NavLink
                    active={active}
                    onClick={(event) => { event.preventDefault(); setShowSubmenu(!showSubmenu) }}
                    href={"#"}
                    role="button"
                    aria-haspopup="menu">
                    {name}
                    <CaratDown />
                </NavLink>
                <DropdownNav showSubmenu={showSubmenu} submenu={submenu} />
            </li>
        )
    }
    else {
        return (
            <li className="hidden space-x-8 lg:-my-px lg:ml-6 lg:flex">
                <NavLink href={href} active={active}>{name}</NavLink>
            </li>
        )
    }
}
