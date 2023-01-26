import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/inertia-react';

import NavLink from '@/Components/Navigation/NavLink';
import ResponsiveNavLink from '@/Components/Navigation/ResponsiveNavLink';
import DropdownNavLink from '@/Components/Navigation/DropdownNavLink';
import FooterGroup from '@/Components/FooterGroup';

import LogoWhite from '@images/Logo-white.png';
import FooterLink from '@/Components/Navigation/FooterLink';
import FlashMessage from '@/Components/FlashMessage';
import Paragraph from '@/Components/Typography/Paragraph';
import SecondaryNavigation from '@/Components/Navigation/SecondaryNavigation';

export default function WrapperLayout({ showSecondaryNav = false, children }: { showSecondaryNav?: boolean, children: React.ReactNode }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState<boolean>(false);
    const [showToTopButton, setShowToTopButton] = useState(false);

    const currentYear = (new Date()).getFullYear();

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > window.innerHeight) {
                setShowToTopButton(true);
            } else {
                setShowToTopButton(false);
            }
        })
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }


    return (
        <div className="flex flex-col items-stretch min-h-screen">
            <nav className="text-white border-b-2 border-gray-800 bg-pbsblue">
                <div className="px-4 mx-auto max-w-7xl md:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex items-center shrink-0">
                                <Link href="/">
                                    <img src={LogoWhite} alt="Postal Bible School" className="h-10" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 md:-my-px md:ml-10 md:flex">
                                <NavLink href={route('about')} active={route().current('about')}>
                                    About Us
                                </NavLink>
                            </div>
                            <div className="hidden space-x-8 md:-my-px md:ml-10 md:flex">
                                <NavLink href={route('courses')} active={route().current('courses')}>
                                    Courses
                                </NavLink>
                            </div>
                            <div className="relative hidden space-x-8 group md:-my-px md:ml-10 md:flex">
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
                                <ul className="absolute z-10 flex flex-col transition-opacity duration-200 ease-in-out scale-0 bg-white divide-y-2 rounded-lg opacity-0 text-slate-600 top-full -left-1/2 drop-shadow-lg group-hover:opacity-100 group-focus:opacity-100 group-hover:scale-100 group-focus:scale-100">
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
                        <div className="flex justify-between h-16">
                            <div className="hidden space-x-8 md:-my-px md:ml-10 md:flex">
                                <NavLink href={route('contactus')} active={route().current('contactus')}>
                                    Contact Us
                                </NavLink>
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
                </div>

                <div className={(showingNavigationDropdown ? 'block opacity-100 translate-y-0' : 'hidden opacity-0 -translate-y-full -z-1') + ' md:hidden transition-[transform,opacity] duration-1000 ease-in-out'}>
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
                        <div className="pt-2 pb-3 space-y-1 border-t border-gray-200">
                            <ResponsiveNavLink href={route('contactus')} active={route().current('contactus')}>
                                Contact Us
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>
            {showSecondaryNav &&
                <SecondaryNavigation />
            }
            <FlashMessage />
            <main className="relative flex flex-col h-full grow md:justify-center">
                <div className="w-full pb-20 overflow-hidden bg-white grow">
                    {children}
                </div>

                <footer className="bottom-0 left-0 text-white bg-pbsblue">
                    <div className="w-full px-8 py-6 my-10 md:px-32">
                        <div className="flex flex-col gap-8 md:gap-4 flex-nowrap md:flex-row justify-evenly">
                            <FooterGroup heading="About Us">
                                <Paragraph className="leading-snug text-left text-white">Postal Bible School was originally called Postal Sunday School and began in County Cork in 1958. It began as the work of Bert and Wendy Gray who believed in the importance of young people learning from the Bible and wanted to cater for those in remote areas.</Paragraph>
                                <div className="mt-5">
                                    <Link className='text-base text-white hover:text-gray-300' href={route('about')}>Read more</Link>
                                </div>
                            </FooterGroup>
                            <FooterGroup heading="Courses">
                                <ul className="flex flex-col">
                                    <li><FooterLink href={route('courses')}>BibleTime</FooterLink></li>
                                    <li><FooterLink href={route('courses')}>New Life</FooterLink></li>
                                    <li><FooterLink href={route('courses')}>Gleaners</FooterLink></li>
                                    {/* <li><FooterLink href={route('courses')}>Online Assembly</FooterLink></li> */}
                                </ul>
                            </FooterGroup>
                            <FooterGroup heading="Programmes">
                                <ul className="flex flex-col">
                                    <li><FooterLink href={route('events.prizegivings')}>Prizegivings</FooterLink></li>
                                    <li><FooterLink href={route('events.shed')}>The SHED</FooterLink></li>
                                    <li><FooterLink href={route('events.step')}>STEP</FooterLink></li>
                                    <li><FooterLink href={route('events.camp')}>Summer Camp</FooterLink></li>
                                </ul>
                            </FooterGroup>
                            <FooterGroup heading="Contact Us">
                                <p className='text-base text-white'>Phone - 049 555 2915</p>
                                <p className='text-base text-white'>Internation - 0035349 5552915</p>
                                <p className='text-base text-white'>Email - <a href='mailto:info@postalbibleschool.ie'>info@postalbibleschool.ie</a></p>
                                <div className="mt-5">
                                    <Link className='text-base text-white hover:text-gray-300' href={route('contactus')}>Contact Us</Link>
                                </div>
                            </FooterGroup>
                        </div>
                    </div>
                    <div className="w-full p-8 border-t border-gray-300 md:p-10">
                        <p className='text-sm leading-tight text-center'>&copy; Copyright {currentYear}. Postal Bible School. All Rights Reserved.</p>
                    </div>
                </footer>

            </main>
            {showToTopButton &&
                <button onClick={() => scrollToTop()} className="fixed bottom-4 right-4 z-10 rounded-full h-[65px] w-[65px] bg-blue-400 text-white font-bold shadow-xl p-5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23" fill="currentColor" >
                        <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06l-6.22-6.22V21a.75.75 0 01-1.5 0V4.81l-6.22 6.22a.75.75 0 11-1.06-1.06l7.5-7.5z" clipRule="evenodd" stroke='currentColor' strokeWidth="3px" />
                    </svg>
                </button>
            }
        </div>
    );
}
