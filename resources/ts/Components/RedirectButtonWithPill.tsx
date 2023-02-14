import RightIcon from "@/Components/Icons/ChevronRight";

interface RedirectButton {
    downloadLink?: string;
    title: string;
    pillText?: string;
    pillClass?: string;
}

export default function RedirectButtonWithPill({ title, pillText, pillClass = "bg-pbsblue", downloadLink = "" }: RedirectButton) {
    const isLinkEnabled = () => {
        return downloadLink && downloadLink !== "" && downloadLink !== "#";
    }
    const getButtonColorClass = () => {
        if (isLinkEnabled())
            return `hover:bg-blue-600 bg-stone-200 font-bold text-slate-700 hover:text-slate-50`;
        else
            return `bg-stone-200 text-gray-500`;
    }

    return (
        <>
            {pillText &&
                <a className={`${isLinkEnabled() ? "cursor-auto" : "cursor-not-allowed"} block`} href={downloadLink} onClick={(event) => !isLinkEnabled() ? event.preventDefault() : null}>
                    <button disabled={!isLinkEnabled()} className={`flex flex-row items-center h-fit w-full ${getButtonColorClass()} rounded-md`}>
                        <div className={`basis-1/3 ${pillClass} text-white font-bold text-center rounded p-2 py-3`}>{pillText}</div>
                        <div className="px-4 text-center basis-2/3">{title.trim()}</div>
                        {isLinkEnabled() &&
                            <div className="px-3 ml-auto shrink">
                                <RightIcon />

                            </div>
                        }
                    </button></a>
            }
            {!pillText &&
                <a className={`${isLinkEnabled() ? "cursor-auto" : "cursor-not-allowed"} block`} href={downloadLink} onClick={(event) => !isLinkEnabled() ? event.preventDefault() : null}>
                    <button disabled={!isLinkEnabled()} className={`flex flex-row items-center h-fit w-full ${getButtonColorClass()} py-2 rounded`}>
                        <div className="px-4 text-center grow">{title}</div>
                        {isLinkEnabled() &&
                            <div className="hidden px-3 ml-auto md:block">
                                <RightIcon />

                            </div>
                        }
                    </button></a>
            }

        </>
    );
}