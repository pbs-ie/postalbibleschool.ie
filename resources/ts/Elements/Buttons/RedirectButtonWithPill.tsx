import RightIcon from "@/Elements/Icons/ChevronRight";

interface RedirectButton {
    downloadLink?: string;
    title: string;
    pillText?: string;
    pillClass?: string;
    imageLink?: string;
}

export default function RedirectButtonWithPill({ title, pillText, pillClass = "bg-pbsblue", downloadLink = "", imageLink }: RedirectButton) {
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
                <a className={`${isLinkEnabled() ? "cursor-pointer" : "cursor-not-allowed"} block`} href={downloadLink} onClick={(event) => !isLinkEnabled() ? event.preventDefault() : null}>
                    <div className={`flex flex-row items-center h-fit w-full ${getButtonColorClass()} rounded-md`}>
                        <div className={`basis-1/3 ${pillClass} text-white font-bold text-center rounded p-2 py-3`}>{pillText}</div>
                        <div className="px-4 text-center basis-2/3">{title.trim()}</div>
                        {isLinkEnabled() &&
                            <div className="px-3 ml-auto shrink">
                                <RightIcon />
                            </div>
                        }
                    </div>
                    {imageLink && imageLink !== "" &&
                        <img className="float-right object-cover object-left w-2/3 h-auto mt-px rounded-lg aspect-video " src={"/assembly/image/" + imageLink} alt={imageLink + " assembly image thumbnail"} />
                    }
                </a>
            }

        </>
    );
}