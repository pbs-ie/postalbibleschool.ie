import { Link, usePage } from '@inertiajs/inertia-react';

import NavLink from '@/Components/Navigation/NavLink';
import ResponsiveNavLink from '@/Components/Navigation/ResponsiveNavLink';
import DropdownNavLink from '@/Components/Navigation/DropdownNavLink';

import LogoWhite from '@images/Logo-white.png';
import { useState } from 'react';
import DropdownNavWrapper from './DropdownNavWrapper';
import AnchorNavLink from './AnchorNavLink';

export default function Navbar() {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState<boolean>(false);
    const { auth } = usePage<PassedProps>().props;


    return (
        <header className="text-white border-b-2 border-gray-800 bg-pbsblue">
            <nav className="px-4 mx-auto max-w-7xl md:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex items-center shrink-0">
                            <Link href="/">
                                <img src={LogoWhite} alt="Postal Bible School" className="h-10" />
                            </Link>
                        </div>

                        <div className="hidden space-x-8 md:-my-px md:ml-10 md:flex">
                            {auth?.user &&
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Dashboard
                                </NavLink>
                            }
                            <NavLink href={route('about')} active={route().current('about')}>
                                About Us
                            </NavLink>
                        </div>
                        <div className="relative hidden space-x-8 group md:-my-px md:ml-10 md:flex">
                            <NavLink href={'#'} active={route().current('courses') || route().current('request.*')}>
                                Courses
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" className="w-2 ml-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                    <path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path>
                                </svg>
                            </NavLink>
                            <DropdownNavWrapper>
                                <li className='inline-flex'><DropdownNavLink href={route('courses')} active={route().current('courses')}>
                                    Overview
                                </DropdownNavLink></li>
                                <li className='inline-flex'><DropdownNavLink href={route('request.individual')} active={route().current('request.individual')}>
                                    Request Lesson: Individual
                                </DropdownNavLink></li>
                                <li className='inline-flex'><DropdownNavLink href={route('request.group')} active={route().current('request.group')}>
                                    Request Lesson: Schools
                                </DropdownNavLink></li>
                            </DropdownNavWrapper>
                        </div>
                        <div className="relative hidden space-x-8 group md:-my-px md:ml-10 md:flex">
                            <NavLink href={'#'} active={route().current('events.*')}>
                                Events
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" className="w-2 ml-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                    <path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path>
                                </svg>
                            </NavLink>
                            <DropdownNavWrapper>
                                <li className='inline-flex'><DropdownNavLink href={route('events.prizegivings')} active={route().current('events.prizegivings')}>
                                    Prizegivings
                                </DropdownNavLink></li>
                                <li className='inline-flex'><DropdownNavLink href={route('events.shed')} active={route().current('events.shed')}>
                                    The SHED
                                </DropdownNavLink></li>
                                <li className='inline-flex'><DropdownNavLink href={route('events.step')} active={route().current('events.step')}>
                                    STEP
                                </DropdownNavLink></li>
                                <li className='inline-flex'><DropdownNavLink href={route('events.camp')} active={route().current('events.camp')}>
                                    Summer Camp
                                </DropdownNavLink></li>
                                <li className='inline-flex'><DropdownNavLink href={route('events.iteam')} active={route().current('events.iteam')}>
                                    iTeam
                                </DropdownNavLink></li>
                            </DropdownNavWrapper>
                        </div>
                        <div className="hidden space-x-8 md:-my-px md:ml-10 md:flex">
                            <NavLink href={route('assembly.index')} active={route().current('assembly.*')}>
                                School Assembly
                            </NavLink>
                        </div>
                    </div>
                    <div className="flex justify-between h-16">
                        <div className="hidden space-x-8 md:-my-px md:ml-10 md:flex">
                            <NavLink href={route('contactus')} active={route().current('contactus')}>
                                Contact Us
                            </NavLink>
                        </div>
                        <div className="relative hidden space-x-8 group md:-my-px md:ml-10 md:flex">

                            {auth?.user ?
                                (<><AnchorNavLink href={'#'}>
                                    <img src={auth?.user.picture} alt="User picture" className='w-10 rounded-full' />
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" className="w-2 ml-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                        <path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path>
                                    </svg>
                                </AnchorNavLink>
                                    <DropdownNavWrapper>
                                        <li className='inline-flex'>
                                            <AnchorNavLink href={route('logout')} isDropdown>
                                                Logout
                                            </AnchorNavLink>
                                        </li>
                                    </DropdownNavWrapper></>)
                                :
                                (
                                    <AnchorNavLink href={route('login')} >
                                        Login
                                    </AnchorNavLink>
                                )
                            }

                        </div>
                        <div className="flex items-center -mr-2 md:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 text-gray-100 transition duration-150 ease-in-out rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
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
                        </div>
                    </div>
                </div>
            </nav>

            <nav className={(showingNavigationDropdown ? 'block opacity-100 translate-y-0' : 'hidden opacity-0 -translate-y-full -z-1') + ' md:hidden transition-[transform,opacity] duration-1000 ease-in-out'}>
                <div className="pt-2 pb-3 space-y-1">
                    {auth?.user &&
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                    }
                    <ResponsiveNavLink href={route('about')} active={route().current('about')}>
                        About Us
                    </ResponsiveNavLink>
                    <ResponsiveNavLink href={route('courses')} active={route().current('courses')}>
                        Courses
                    </ResponsiveNavLink>
                    <ResponsiveNavLink href={route('events.prizegivings')} active={
                        route().current('events.*')
                    }>
                        Events
                    </ResponsiveNavLink>
                    <div className="ml-6">
                        <ResponsiveNavLink href={route('events.prizegivings')} active={route().current('events.prizegivings')}>
                            Prizegivings
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('events.shed')} active={route().current('events.shed')}>
                            The SHED
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('events.step')} active={route().current('events.step')}>
                            STEP
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('events.camp')} active={route().current('events.camp')}>
                            Summer Camp
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('events.iteam')} active={route().current('events.iteam')}>
                            iTeam
                        </ResponsiveNavLink>
                    </div>
                    <div className="pt-2 pb-3 space-y-1 border-t border-gray-200">
                        <ResponsiveNavLink href={route('contactus')} active={route().current('contactus')}>
                            Contact Us
                        </ResponsiveNavLink>
                        {!auth?.user ?
                            (<AnchorNavLink href={route('login')} isResponsive>
                                Login
                            </AnchorNavLink>)
                            :
                            (<AnchorNavLink href={route('login')} isResponsive>
                                Logout
                            </AnchorNavLink>)
                        }
                    </div>
                </div>
            </nav>
        </header>
    )
}