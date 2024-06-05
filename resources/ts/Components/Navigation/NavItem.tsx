import NavLink from "@/Components/Navigation/NavLink";
import DropdownNav from "@/Components/Navigation/DropdownNav";
import { useEffect, useRef, useState } from "react";
import CaratDown from "@/Elements/Icons/CaratDown";

export interface MenuItems {
    name: string,
    href: any,
    active: any,
    submenu?: MenuItems[] | undefined
}

export default function NavItem({ name, href, active, submenu }: MenuItems) {
    const [showSubmenu, setShowSubmenu] = useState(false);
    const buttonRef = useRef<HTMLLIElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const menuElement = menuRef?.current;
        const buttonElement = buttonRef?.current;
        let handleMouseEvent: (event: MouseEvent) => void;
        if (buttonElement && menuElement && showSubmenu) {
            handleMouseEvent = (mouseEvent: MouseEvent) => {

                const menuDimensions = menuElement.getBoundingClientRect();
                const buttonDimensions = buttonElement.getBoundingClientRect();
                if (
                    (mouseEvent.clientX < menuDimensions.left ||
                        mouseEvent.clientX > menuDimensions.right ||
                        mouseEvent.clientY < menuDimensions.top ||
                        mouseEvent.clientY > menuDimensions.bottom) &&
                    (mouseEvent.clientX < buttonDimensions.left ||
                        mouseEvent.clientX > buttonDimensions.right ||
                        mouseEvent.clientY < buttonDimensions.top ||
                        mouseEvent.clientY > buttonDimensions.bottom)
                ) {
                    console.log(menuDimensions);
                    setShowSubmenu(false);
                }
            }
            document.addEventListener('mousedown', handleMouseEvent);
        }
        return () => document.removeEventListener('mousedown', handleMouseEvent);
    }, [showSubmenu]);

    if (submenu) {
        return (
            <li ref={buttonRef}
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
                <DropdownNav innerRef={menuRef} showSubmenu={showSubmenu} submenu={submenu} />
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
