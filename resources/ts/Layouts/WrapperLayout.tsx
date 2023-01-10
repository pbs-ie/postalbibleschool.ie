import React, { useState } from 'react';
import { Link } from '@inertiajs/inertia-react';

import NavLink from '@/Components/Navigation/NavLink';
import ResponsiveNavLink from '@/Components/Navigation/ResponsiveNavLink';
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
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Dashboard
                                </NavLink>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink href={route('courses')} active={route().current('courses')}>
                                    Courses
                                </NavLink>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink href={route('events.prizegivings')} active={route().current('events.prizegivings')}>
                                    Events
                                </NavLink>
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

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('courses')} active={route().current('courses')}>
                            Courses
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">
                                Nischal
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="h-full grow flex flex-col sm:justify-center pt-6 sm:pt-0">
                <div className="w-full grow mt-6 px-6 py-4 bg-white shadow-md overflow-hidden">
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
