import DownloadIcon from "@/Components/Icons/DownloadIcon";

export default function LessonDownloadButton({ title, infoText, infoClass = "bg-pbsblue", downloadLink = "" }: { title: string, infoText: string | null, infoClass: string, downloadLink: string | undefined }) {
    const isLinkEnabled = () => {
        return downloadLink && downloadLink !== "" && downloadLink !== "#";
    }
    const getButtonColorClass = () => {
        if (isLinkEnabled())
            return `hover:${infoClass} bg-stone-200 font-bold text-slate-700 hover:text-slate-50`;
        else
            return `bg-stone-200 text-gray-500`;
    }

    return (
        <>
            {infoText &&
                <a className={`${isLinkEnabled() ? "cursor-auto" : "cursor-not-allowed"} block`} href={downloadLink} target="_blank" onClick={(event) => !isLinkEnabled() ? event.preventDefault() : null}>
                    <button disabled={!isLinkEnabled()} className={`flex flex-row items-center h-fit w-full ${getButtonColorClass()} rounded-md`}>
                        <div className={`basis-1/3 ${infoClass} text-white font-bold text-center rounded p-2 py-3`}>{infoText}</div>
                        <div className="px-4 text-center basis-2/3">{title}</div>
                        {isLinkEnabled() &&
                            <div className="px-3 ml-auto shrink">
                                <DownloadIcon />

                            </div>
                        }
                    </button></a>
            }
            {!infoText &&
                <a className={`${isLinkEnabled() ? "cursor-auto" : "cursor-not-allowed"} block`} href={downloadLink} target="_blank" onClick={(event) => !isLinkEnabled() ? event.preventDefault() : null}>
                    <button disabled={!isLinkEnabled()} className={`flex flex-row items-center h-fit w-full ${getButtonColorClass()} py-2 rounded`}>
                        <div className="px-4 text-center grow">{title}</div>
                        {isLinkEnabled() &&
                            <div className="hidden px-3 ml-auto md:block">
                                <DownloadIcon />

                            </div>
                        }
                    </button></a>
            }

        </>
    );
}