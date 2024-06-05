import CaratDown from "@/Elements/Icons/CaratDown";
import LogoutIcon from "@/Elements/Icons/LogoutIcon";
import AnchorNavLink from "@/Components/Navigation/AnchorNavLink";
import NavLink from "@/Components/Navigation/NavLink";
import { useEffect, useRef, useState } from "react";
import { usePage } from "@inertiajs/react";
import route from "ziggy-js";

export default function NavProfileMenuitem() {
    const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
    const { auth } = usePage<PassedProps>().props;
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLAnchorElement>(null);


    useEffect(() => {
        const menuElement = menuRef?.current;
        const buttonElement = buttonRef?.current;
        let handleMouseEvent: (event: MouseEvent) => void;
        if (buttonElement && menuElement && menuIsOpen) {
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
                    setMenuIsOpen(false);
                }
            }
            document.addEventListener('mousedown', handleMouseEvent);
        }
        return () => document.removeEventListener('mousedown', handleMouseEvent);
    }, [menuIsOpen]);

    return (
        <li className="relative hidden space-x-8 lg:-my-px lg:ml-10 lg:flex">

            {auth?.user ?
                (
                    <>
                        <NavLink innerRef={buttonRef} active={false} href={'#'} onClick={(event) => { event.preventDefault(); setMenuIsOpen(!menuIsOpen) }}>
                            <img src={auth?.user.picture} alt="User picture" className='w-10 rounded-full' />
                            <CaratDown />
                        </NavLink>

                        <div ref={menuRef} className={"absolute right-0 z-10 overflow-hidden flex-col hidden bg-white divide-y-2 rounded-lg text-slate-600 top-[90%] drop-shadow-lg " + (menuIsOpen ? "lg:flex animate-expand-in" : "lg:invisible")} >
                            <div className='grid grid-cols-[2.5rem_1fr] items-center gap-2 p-4'>
                                <img src={auth?.user.picture} alt="User picture" className='w-10 rounded-full' />
                                <div className='flex flex-col p-2'>
                                    <span className='text-sm font-bold text-slate-900'>{auth?.user?.name}</span>
                                    <span className='text-sm rounded-lg '>
                                        {auth?.user.email}
                                    </span>

                                </div>
                            </div>
                            <ul className='flex flex-col'>
                                <li className='inline-flex hover:bg-black/5'>
                                    <AnchorNavLink href={route('logout')} isDropdown>
                                        <span className="flex items-center gap-2 font-normal">
                                            <LogoutIcon /> Log out
                                        </span>
                                    </AnchorNavLink>
                                </li>
                            </ul>
                        </div>
                    </>
                )
                :
                (
                    <AnchorNavLink href={route('login')} >
                        Login
                    </AnchorNavLink>
                )
            }
        </li>
    )
}