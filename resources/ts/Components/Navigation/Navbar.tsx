import { Link, usePage } from '@inertiajs/react';

import NavLink from '@/Components/Navigation/NavLink';
import ResponsiveNavLink from '@/Components/Navigation/ResponsiveNavLink';

import LogoWhite from '@images/Logo-white.png';
import LogoSmall from '@images/logo-icon.png';
import { useState } from 'react';
import AnchorNavLink from '@/Components/Navigation/AnchorNavLink';
import AnchorLink from '@/Components/Navigation/AnchorLink';
import NavProfileMenuitem from '@/Components/Navigation/NavProfileMenuitem';
import MenuItems from '@/Components/Navigation/MenuItems';
import NavMenuButton from '@/Elements/Buttons/NavMenuButton';
import ResponsiveMenuItems from '@/Components/Navigation/ResponsiveMenuItems';
import NavItem from './NavItem';
import CaratDown from '@/Elements/Icons/CaratDown';
import Cog6Tooth from '@/Elements/Icons/Cog6Tooth';
import route from 'ziggy-js';

export interface MenuItemsProps {
    name: string,
    href: string,
    active: boolean,
    submenu?: MenuItemsProps[]
}
export default function Navbar() {
    const [showResponsiveNavmenu, setShowResponsiveNavmenu] = useState<boolean>(false);
    const { auth } = usePage<PassedProps>().props;

    const menuItems: MenuItemsProps[] = [
        {
            name: 'Home',
            href: route('home'),
            active: route().current('home')
        },
        {
            name: 'About Us',
            href: route('about'),
            active: route().current('about')
        },
        {
            name: 'Courses',
            href: route('courses'),
            active: route().current('courses') || route().current('request.*'),
            submenu: [
                {
                    name: 'Overview',
                    href: route('courses'),
                    active: route().current('courses')
                },
                {
                    name: 'Request Lesson: Individual',
                    href: route('request.individual'),
                    active: route().current('request.individual')
                },
                {
                    name: 'Request Lesson: Group',
                    href: route('request.group'),
                    active: route().current('request.group')
                }
            ]
        },
        {
            name: 'Events',
            href: route('events.prizegivings'),
            active: route().current('events.*'),
            submenu: [
                {
                    name: 'Prizegivings',
                    href: route('events.prizegivings'),
                    active: route().current('events.prizegivings')
                },
                {
                    name: 'The SHED',
                    href: route('events.shed'),
                    active: route().current('events.shed')
                },
                {
                    name: 'STEP',
                    href: route('events.step.index'),
                    active: route().current('events.step.index')
                },
                {
                    name: 'Camp',
                    href: route('events.camp.index'),
                    active: route().current('events.camp.*')
                },
                {
                    name: 'iTeam',
                    href: route('events.iteam'),
                    active: route().current('events.iteam')
                }
            ]
        },
        {
            name: 'School Assembly',
            href: route('assembly.index'),
            active: route().current('assembly.*')
        }
    ]

    const rightSideMenuItems: MenuItemsProps[] = [
        {
            name: 'Payment',
            href: route('payment.index'),
            active: route().current('payment.*')

        },
        {
            name: 'Contact Us',
            href: route('contactus'),
            active: route().current('contactus')
        }
    ]

    return (
        <header className="text-white border-b-2 border-gray-800">
            <div className="absolute p-2 m-3 font-bold text-gray-800 no-underline duration-100 transform -translate-y-16 bg-gray-200 visited:text-white focus-within:translate-y-0" >Skip to <AnchorLink href='#mainContent'>content</AnchorLink> or <AnchorLink href='#footerContent'>footer</AnchorLink></div>
            <nav className="px-6 mx-auto bg-pbsblue">
                <div className="flex justify-between h-16">
                    <ul className="flex">
                        <li className="flex items-center shrink-0 lg:mr-5">
                            <Link href="/home">
                                <img
                                    srcSet={`${LogoSmall} 450w,${LogoWhite} 898w`}
                                    sizes='(max-width: 600px) 250px, 898px'
                                    alt="Postal Bible School Logo"
                                    src={LogoSmall}
                                    className="h-8" />
                            </Link>
                        </li>

                        {auth?.user &&
                            <li className="hidden space-x-8 lg:-my-px lg:ml-6 lg:flex">
                                <NavLink isCta href={route('dashboard')} active={route().current('dashboard')}>
                                    The Hub
                                </NavLink>
                            </li>
                        }
                        <MenuItems menuItems={menuItems} />

                    </ul>
                    <ul className="flex justify-between h-16">
                        <MenuItems menuItems={rightSideMenuItems} />

                        {auth.canViewSettings &&
                            <li className="hidden space-x-8 lg:-my-px lg:ml-6 lg:flex">
                                <NavLink href={route('settings.index')} active={route().current('settings.*')} >
                                    <Cog6Tooth />
                                </NavLink>
                            </li>
                        }

                        <NavProfileMenuitem />

                        <li className="flex items-center -mr-2 lg:hidden">
                            <NavMenuButton active={showResponsiveNavmenu} onClick={() => setShowResponsiveNavmenu((previousState) => !previousState)} />
                        </li>
                    </ul>
                </div>
            </nav>
            <nav className={(showResponsiveNavmenu ? 'block opacity-100 translate-y-0 z-10' : 'invisible opacity-10 -translate-y-full -z-10') + ' w-full absolute lg:hidden transition-[transform,opacity] duration-500 ease-out  bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-200'}>
                <ul className="pt-2 pb-3 space-y-1">
                    {auth?.user &&
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            The Hub
                        </ResponsiveNavLink>
                    }
                    <ResponsiveMenuItems menuItems={menuItems} />

                    <hr className="py-2 border-t border-gray-500 " />
                    <ResponsiveMenuItems menuItems={rightSideMenuItems} />
                    {auth.canViewSettings &&
                        <li>
                            <ResponsiveNavLink href={route('settings.index')} active={route().current('settings.*')}>
                                Settings
                            </ResponsiveNavLink>
                        </li>
                    }
                    {!auth?.user ?
                        (<AnchorNavLink href={route('login')} isResponsive>
                            Login
                        </AnchorNavLink>)
                        :
                        (<AnchorNavLink href={route('logout')} isResponsive>
                            Logout
                        </AnchorNavLink>)
                    }
                </ul>

            </nav>
        </header >
    )
}