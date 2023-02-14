import DownloadIcon from "@/Components/Icons/DownloadIcon";

interface LessonDownloadButton {
    downloadLink?: string;
    title: string;
    infoText?: string;
    infoClass?: string;
}

export default function LessonDownloadButton({ title, infoText, infoClass = "bg-pbsblue", downloadLink = "" }: LessonDownloadButton) {
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
                <button tabIndex={-1} disabled={!isLinkEnabled()} className={`block h-fit w-full ${getButtonColorClass()} rounded-md`}>
                    <a className="flex flex-row items-center" href={downloadLink} target="_blank" onClick={(event) => !isLinkEnabled() ? event.preventDefault() : null}>
                        <div className={`basis-1/3 ${infoClass} text-white font-bold text-center rounded p-2 py-3`}>{infoText}</div>
                        <div className="px-4 text-center basis-2/3">{title}</div>
                        {isLinkEnabled() &&
                            <div className="px-3 ml-auto shrink">
                                <DownloadIcon />
                            </div>
                        }
                    </a>
                </button>
            }
            {!infoText &&
                <button tabIndex={-1} disabled={!isLinkEnabled()} className={`block h-fit w-full ${getButtonColorClass()} rounded`}>
                    <a className="flex flex-row items-center py-2" href={downloadLink} target="_blank" onClick={(event) => !isLinkEnabled() ? event.preventDefault() : null}>
                        <div className="px-4 text-center grow">{title}</div>
                        {isLinkEnabled() &&
                            <div className="hidden px-3 ml-auto md:block">
                                <DownloadIcon />

                            </div>
                        }
                    </a>
                </button>
            }

        </>
    );
}