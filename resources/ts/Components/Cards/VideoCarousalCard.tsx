import PlayIcon from "@/Elements/Icons/PlayIcon";

interface CarousalCard {
    title: string;
    duration: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    active?: boolean;
    total: number;
    imageLink: string;
    idx: number,
}


export default function VideoCarousalCard({ title, duration, onClick, active = false, total, imageLink, idx }: CarousalCard) {
    return (
        <div className="flex-none snap-center">
            <button onClick={onClick} className={"inline-flex flex-col items-center gap-2 p-2 md:p-4 overflow-hidden rounded-lg drop-shadow-lg " + (active ? "bg-pbsblue text-slate-50" : "bg-stone-100 text-gray-600")}>
                <div className="relative">
                    <img src={imageLink} alt={"Video " + idx} className="block object-cover h-20 md:h-32 w-full rounded aspect-[4/3]" />
                </div>
                <p className={"text-base md:text-xl font-bold " + (active ? "text-slate-50" : "text-blue-700")}>{title === "" ? `Title ${idx}` : title}</p>
                <div className="flex justify-between w-full text-sm">
                    <p>{duration}</p>
                    <div className="inline-flex">
                        <p className="font-bold">{(idx + 1)}</p><p>{`${total ? '/' + total : ''}`}</p>
                    </div>
                </div>
            </button>
        </div>
    );
} 