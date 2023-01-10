import React, { useState } from 'react';
import { Link } from '@inertiajs/inertia-react';

import NavLink from '@/Components/Navigation/NavLink';
import ResponsiveNavLink from '@/Components/Navigation/ResponsiveNavLink';
import DropdownNavLink from '@/Components/Navigation/DropdownNavLink';
import FooterGroup from '@/Components/FooterGroup';

import LogoWhite from '@images/Logo-white.png';

declare function route(name?: string, params?: any): any;

export default function WrapperLayout({ children }: { children: React.ReactNode }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState<boolean>(false);

    return (
        <div className="min-h-screen flex flex-col items-stretch bg-slate-400">
            <nav className="bg-pbsblue text-white border-b-2 border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <img src={LogoWhite} alt="Postal Bible School" className="h-10" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink href="#" active={false}>
                                    About Us
                                </NavLink>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink href={route('courses')} active={route().current('courses')}>
                                    Courses
                                </NavLink>
                            </div>
                            <div className="hidden group relative space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink href={route('events.prizegivings')} active={
                                    route().current('events.prizegivings')
                                    || route().current('events.shed')
                                    || route().current('events.step')
                                    || route().current('events.camp')
                                }>
                                    Events
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" className="w-2 ml-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                        <path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path>
                                    </svg>
                                </NavLink>
                                <ul className="absolute bg-slate-300 text-slate-600 flex flex-col top-full -left-1/2  opacity-0 group-hover:opacity-100 group-focus:opacity-100 scale-0 group-hover:scale-100 group-focus:scale-100 group-focus:text-red-200 transition-opacity duration-200 ease-in-out z-10">
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
                                </ul>
                            </div>

                        </div>
                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-100 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
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

                <div className={(showingNavigationDropdown ? 'block opacity-100 translate-y-0' : 'hidden opacity-0 -translate-y-full -z-1') + ' sm:hidden transition-transform transition-opacity duration-1000 ease-in-out'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href="#" active={false}>
                            About Us
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('courses')} active={route().current('courses')}>
                            Courses
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('events.prizegivings')} active={
                            route().current('events.prizegivings')
                            || route().current('events.shed')
                            || route().current('events.step')
                            || route().current('events.camp')
                        }>
                            Events
                        </ResponsiveNavLink>
                        <div className="ml-6">
                            <ResponsiveNavLink href={route('events.prizegivings')} active={route().current('events.prizegivings')}>
                                Prizegivings
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('events.shed')} active={route().current('events.shed')}>
                                SHED
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('events.step')} active={route().current('events.step')}>
                                STEP
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('events.camp')} active={route().current('events.camp')}>
                                Summer Camp
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="h-full grow flex flex-col sm:justify-center pt-0">
                <div className="w-full grow px-6 py-4 bg-white overflow-hidden">
                    {children}
                </div>
            </main>

            <footer className="bg-pbsblue text-white bottom-0 left-0">
                <div className="w-full mt-0 px-6 py-6">
                    <div className="grid grid-rows-4 gap-4 sm:grid-cols-4 sm:grid-rows-none">
                        <FooterGroup heading="About Us">
                            <p className="text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </FooterGroup>
                        <FooterGroup heading="Courses">
                            <div className="flex flex-col">
                                <Link href={route('courses')}>BibleTime</Link>
                                <Link href={route('courses')}>New Life</Link>
                                <Link href={route('courses')}>Gleaners</Link>
                                <Link href={route('courses')}>Online Assembly</Link>
                            </div>
                        </FooterGroup>
                        <FooterGroup heading="Programmes">
                            <div className="flex flex-col">
                                <Link href='#'>Prizegivings</Link>
                                <Link href='#'>The SHED</Link>
                                <Link href='#'>STEP</Link>
                                <Link href='#'>Summer Camp</Link>
                            </div>
                        </FooterGroup>
                        <FooterGroup heading="Contact Us">
                            <p>Phone - 049 555 2915</p>
                            <p>Internation - 0035349 5552915</p>
                            <p>Email - info@postalbibleschool.ie</p>
                        </FooterGroup>
                    </div>
                </div>
            </footer>
        </div>
    );
}
