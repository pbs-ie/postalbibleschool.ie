import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/inertia-react';

import FooterGroup from '@/Components/FooterGroup';

import FooterLink from '@/Components/Navigation/FooterLink';
import FlashMessage from '@/Components/FlashMessage';
import Paragraph from '@/Components/Typography/Paragraph';
import SecondaryNavigation from '@/Components/Navigation/SecondaryNavigation';
import Navbar from '@/Components/Navbar';

export default function WrapperLayout({ showSecondaryNav = false, children }: { showSecondaryNav?: boolean, children: React.ReactNode }) {
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
            <Navbar />
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
