import React, { useEffect, useState } from 'react';


import FlashMessage from '@/Components/FlashMessage';
import StepNavbar from '@/Components/Navigation/StepNavbar';
import Navbar from '@/Components/Navigation/Navbar';
import Footer from '@/Components/Navigation/Footer';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import CampNavbar from '@/Components/Navigation/CampNavbar';

export default function WrapperLayout({ showStepNav = false, showCampNav = false, children }: { showStepNav?: boolean, showCampNav?: boolean, children: React.ReactNode }) {
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
        <PayPalScriptProvider options={{
            "clientId": import.meta.env.VITE_PAYPAL_CLIENT_ID,
            "currency": "EUR",
            "intent": "capture",
            "locale": "en_IE",

        }}>
            <div className="flex flex-col items-stretch min-h-screen">
                <Navbar />
                {showStepNav &&
                    <StepNavbar />
                }
                {showCampNav &&
                    <CampNavbar />
                }
                <FlashMessage />
                <div id="modal"></div>
                <main id="mainContent" className="relative flex flex-col h-full grow md:justify-center">
                    <div className="w-full grow">
                        {children}
                    </div>
                </main>

                <Footer></Footer>


                {showToTopButton &&
                    <button onClick={() => scrollToTop()} className="fixed bottom-4 right-4 z-10 rounded-full h-[50px] w-[50px] bg-pbsblue text-white font-bold shadow-xl p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23" fill="currentColor" >
                            <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06l-6.22-6.22V21a.75.75 0 01-1.5 0V4.81l-6.22 6.22a.75.75 0 11-1.06-1.06l7.5-7.5z" clipRule="evenodd" stroke='currentColor' strokeWidth="3px" />
                        </svg>
                    </button>
                }
            </div>
        </PayPalScriptProvider>
    );
}
