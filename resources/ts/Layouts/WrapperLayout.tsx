import React, { useEffect, useState } from 'react';


import FlashMessage from '@/Components/FlashMessage';
import SecondaryNavigation from '@/Components/Navigation/SecondaryNavigation';
import Navbar from '@/Components/Navigation/Navbar';
import Footer from '@/Components/Navigation/Footer';

export default function WrapperLayout({ showSecondaryNav = false, extraLogo, children }: { showSecondaryNav?: boolean, extraLogo?: string | undefined, children: React.ReactNode }) {
    const [showToTopButton, setShowToTopButton] = useState(false);

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
                <SecondaryNavigation logo={extraLogo} />
            }
            <FlashMessage />
            <main className="relative flex flex-col h-full grow md:justify-center">
                <div className="w-full pb-20 overflow-hidden grow">
                    {children}
                </div>
            </main>

            <Footer></Footer>


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
