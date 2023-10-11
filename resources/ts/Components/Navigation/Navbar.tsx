import { Link, usePage } from '@inertiajs/react';

import NavLink from '@/Components/Navigation/NavLink';
import ResponsiveNavLink from '@/Components/Navigation/ResponsiveNavLink';

import LogoWhite from '@images/Logo-white.png';
import LogoSmall from '@images/logo-icon.png';
import { useState } from 'react';
import AnchorNavLink from './AnchorNavLink';
import NavItem from './NavItem';

export default function Navbar() {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState<boolean>(false);
    const { auth } = usePage<PassedProps>().props;

    const menuItems = [
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
                    href: route('events.step'),
                    active: route().current('events.step')
                },
                {
                    name: 'Camp',
                    href: route('events.camp'),
                    active: route().current('events.camp')
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

    const rightSideMenuItems = [
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
        <header className="text-white border-b-2 border-gray-800 bg-pbsblue">
            <nav className="px-8 mx-auto">
                <div className="flex justify-between h-16">
                    <ul className="flex">
                        <li className="flex items-center shrink-0">
                            <Link href="/home">
                                <img
                                    srcSet={`${LogoSmall} 250w,${LogoWhite} 898w`}
                                    sizes='(max-width: 600px) 250px, 898px'
                                    alt="Postal Bible School Logo"
                                    src={LogoSmall}
                                    className="h-10" />
                            </Link>
                        </li>

                        {auth?.user &&
                            <li className="hidden space-x-8 lg:-my-px lg:ml-10 lg:flex">
                                <NavLink isCta href={route('dashboard')} active={route().current('dashboard')}>
                                    Dashboard
                                </NavLink>
                            </li>
                        }
                        {
                            menuItems.map((item, index) => (
                                <NavItem key={item.name} name={item.name} href={item.href} active={item.active} submenu={item.submenu} />
                            ))
                        }

                    </ul>
                    <ul className="flex justify-between h-16">
                        {rightSideMenuItems.map((item) => (
                            <NavItem key={item.name} name={item.name} href={item.href} active={item.active} />
                        ))}
                        <li className="relative hidden space-x-8 group lg:-my-px lg:ml-10 lg:flex">

                            {auth?.user ?
                                (<>
                                    <AnchorNavLink href={'#'}>
                                        <img src={auth?.user.picture} alt="User picture" className='w-10 rounded-full' />
                                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" className="w-2 ml-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                            <path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path>
                                        </svg>
                                    </AnchorNavLink>
                                    <ul className="absolute right-0 z-10 flex-col hidden transition-opacity duration-200 ease-in-out scale-0 bg-white divide-y-2 rounded-lg opacity-0 text-slate-600 top-full group-focus:flex group-hover:flex drop-shadow-lg group-hover:opacity-100 group-focus:opacity-100 group-hover:scale-100 group-focus:scale-100">
                                        <li className='inline-flex'>
                                            <AnchorNavLink href={route('logout')} isDropdown>
                                                Logout
                                            </AnchorNavLink>
                                        </li>
                                    </ul>
                                </>)
                                :
                                (
                                    <AnchorNavLink href={route('login')} >
                                        Login
                                    </AnchorNavLink>
                                )
                            }

                        </li>
                        <li className="flex items-center -mr-2 lg:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 text-gray-100 transition duration-150 ease-in-out border-2 border-transparent rounded-md hover:border-gray-100 focus:border-gray-100 "
                            >
                                <svg className="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
            <nav className={(showingNavigationDropdown ? 'block opacity-100 translate-y-0' : 'hidden opacity-0 -translate-y-full -z-1') + ' lg:hidden transition-[transform,opacity] duration-1000 ease-in-out  bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-200'}>
                < ul className="pt-2 pb-3 space-y-1">
                    {auth?.user &&
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                    }
                    {
                        menuItems.map((item) => {
                            if (item.submenu) {
                                return (
                                    <li key={item.name} >
                                        <ResponsiveNavLink href={item.href} active={item.active}>{item.name}</ResponsiveNavLink>
                                        <ul className='ml-6'>
                                            {item.submenu.map((subitem) => (
                                                <li className={`relative before:absolute before:text-inherit before:top-1/2 before:-translate-y-1/2  before:content-['—']`} key={subitem.name}>
                                                    <ResponsiveNavLink key={subitem.name} href={subitem.href} active={subitem.active}>
                                                        {subitem.name}
                                                    </ResponsiveNavLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                )
                            }
                            return (
                                <li key={item.name}>
                                    <ResponsiveNavLink href={item.href} active={item.active}>
                                        {item.name}
                                    </ResponsiveNavLink>
                                </li>
                            )
                        }
                        )
                    }
                    <div className="pt-2 pb-3 space-y-1 border-t border-gray-200 dark:border-gray-700">
                        {rightSideMenuItems.map((item) => {
                            return (
                                <li key={item.name}>
                                    <ResponsiveNavLink href={item.href} active={item.active}>
                                        {item.name}
                                    </ResponsiveNavLink>
                                </li>
                            )
                        })

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
                    </div>
                </ul>

            </nav>
        </header >
    )
}