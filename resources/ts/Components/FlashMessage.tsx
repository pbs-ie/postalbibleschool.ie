import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import CloseX from "@/Elements/Icons/CloseX";


export default function FlashMessage() {
    const [showNotifs, setShowNotifs] = useState(false);
    const { flash } = usePage<PassedProps>().props;

    useEffect(() => {
        setShowNotifs(true);
        setTimeout(() => {
            setShowNotifs(false);
        }, 10000);
    }, [flash])

    return (
        <div className="relative">
            {(flash.success || flash.failure || flash.warning) &&
                <div className={`fixed ${showNotifs ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0 pointer-events-none"} transition-[opacity,transform] duration-1000 ease-in top-10 md:top-auto right-2 md:right-6 md:bottom-10 z-30`}>
                    <div className={`max-w-80 w-full  ml-2 md:ml-0 overflow-auto bg-blue-500 text-gray-50 ${flash.failure ? "bg-red-700" : "bg-green-600"} rounded py-4 px-6 relative`}>
                        <button className="absolute right-2" onClick={() => setShowNotifs(false)}><CloseX className="w-6 h-6" /></button>
                        {flash.success &&
                            <div className="flex items-center gap-5 mr-10">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[50px] h-[50px]">
                                    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <h3 className="text-lg">Success</h3>
                                    <p className="text-sm">{flash.success}</p>
                                </div>
                            </div>
                        }
                        {flash.failure &&
                            <div className="flex items-center gap-5 mr-10">

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <h3 className="text-lg">Failure</h3>
                                    <p className="text-sm">{flash.failure}</p>
                                </div>
                            </div>
                        }
                        {
                            flash.warning &&
                            <div className="flex items-center gap-5 mr-10">

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <h3 className="text-lg">Info</h3>
                                    <p className="text-sm">{flash.warning}</p>
                                </div>
                            </div>
                        }
                    </div>
                </div >
            }
        </div >
    )
}