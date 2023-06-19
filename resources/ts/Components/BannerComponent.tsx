import { Dispatch, SetStateAction } from "react";
import CloseIcon from "@/Components/Icons/CloseIcon";
import AnchorLink from "@/Components/Navigation/AnchorLink";

export default function BannerComponent({ setShowBanner }: { setShowBanner: Dispatch<SetStateAction<boolean>> }) {

    return (
        <div role="banner" className="relative flex items-center justify-center w-full h-10 text-white bg-bibletime-green">
            <p>You can view older assembly videos in the <a className="underline hover:no-underline focus:no-underline" href="/assembly">School Assembly</a> tab</p>
            <button aria-label="Close announcement banner" onClick={() => setShowBanner(false)} className="absolute top-0 right-0 p-2"><CloseIcon className="w-6 h-6" /></button>
        </div>
    )
}