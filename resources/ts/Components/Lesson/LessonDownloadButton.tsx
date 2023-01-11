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
                <a className="block" href={downloadLink} target="_blank">
                    <button disabled={!isLinkEnabled()} className={`flex flex-row items-center h-fit w-full ${getButtonColorClass()} rounded-md`}>
                        <div className={`basis-1/3 ${infoClass} text-white font-bold text-center rounded p-2 py-3`}>{infoText}</div>
                        <div className="basis-2/3 text-center px-4">{title}</div>
                        {isLinkEnabled() &&
                            <div className="shrink ml-auto px-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
                                </svg>
                            </div>
                        }
                    </button></a>
            }
            {!infoText &&
                <a className="block" href={downloadLink} target="_blank">
                    <button disabled={!isLinkEnabled()} className={`flex flex-row items-center h-fit w-full ${getButtonColorClass()} py-2 rounded`}>
                        <div className="grow text-center px-4">{title}</div>
                        {isLinkEnabled() &&
                            <div className="ml-auto px-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
                                </svg>
                            </div>
                        }
                    </button></a>
            }

        </>
    );
}