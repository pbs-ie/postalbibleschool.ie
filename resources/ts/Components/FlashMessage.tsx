import { usePage } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";

export default function FlashMessage() {
    const [showNotifs, setShowNotifs] = useState(false);
    const { flash }: any = usePage().props;

    useEffect(() => {
        setShowNotifs(true);
        setTimeout(() => {
            setShowNotifs(false);
        }, 3500);
    }, [])

    return (
        <div className="relative">
            <div className={`absolute ${showNotifs ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"} transition-[opacity,transform] duration-1000 ease-in right-0 top-0 mt-5 mr-5 z-30`}>
                <div className="uppercase max-w-80 overflow-auto bg-slate-100 border ring-2 ring-slate-200 rounded-md">
                    {flash.success &&
                        <div className="p-6 text-sm text-green-500 ">{flash.success}</div>
                    }
                    {flash.failure &&
                        <div className="p-6 text-sm text-red-500">{flash.failure}</div>
                    }
                </div>
            </div>
        </div>
    )
}