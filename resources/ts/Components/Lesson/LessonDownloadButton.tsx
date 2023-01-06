export default function LessonDownloadButton({ title, infoText, infoClass, downloadLink }: { title: string, infoText: string | null, infoClass: string, downloadLink: string }) {
    const isLinkEnabled = () => {
        return downloadLink && downloadLink !== "" && downloadLink !== "#";
    }
    return (
        <>
            {infoText &&
                <button disabled={!isLinkEnabled()} onClick={() => console.log(downloadLink)} className={`flex flex-row items-center h-fit w-full hover:${infoClass} bg-slate-300  text-slate-800 hover:text-slate-50 rounded`}>
                    <div className={`basis-1/3 ${infoClass} text-white font-bold text-center rounded p-2`}>{infoText}</div>
                    <div className="basis-2/3 text-center px-4">{title}</div>
                    <div className="shrink ml-auto px-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
                        </svg>
                    </div>
                </button>
            }
            {!infoText &&
                <button disabled={!isLinkEnabled()} onClick={() => console.log(downloadLink)} className={`flex flex-row items-center h-fit w-full hover:${infoClass} bg-slate-300  text-slate-800 hover:text-slate-50 py-2 rounded`}>
                    <div className="grow text-center px-4">{title}</div>
                    <div className="ml-auto px-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
                        </svg>
                    </div>
                </button>
            }

        </>
    );
}