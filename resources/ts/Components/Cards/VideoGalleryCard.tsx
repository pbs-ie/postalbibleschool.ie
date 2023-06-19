import PlayIcon from "@/Components/Icons/PlayIcon";

interface GalleryCard {
    title: string;
    clickLink?: string | undefined;
    active?: boolean;
    total: number;
    imageLink: string;
    idx: number,
    month: string;
    series?: string;
}


export default function VideoGalleryCard({ title, clickLink, month, series = "", active = false, total, imageLink, idx }: GalleryCard) {
    return (
        <article>
            <a href={clickLink} className={"inline-flex flex-col items-center gap-2 p-2 md:p-4 overflow-hidden rounded-lg drop-shadow-lg " + (active ? "bg-pbsblue text-slate-50" : "bg-stone-100 text-gray-600")}>
                <div className="relative">
                    <img src={"/assembly/image/" + imageLink} alt={"Video " + idx} className="block object-cover w-full h-20 bg-top rounded md:h-44 aspect-video" />
                    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                        <PlayIcon className="w-10 h-10 md:w-20 md:h-20" />
                    </div>
                </div>
                <div className="text-center">
                    <h1 className="text-sm font-bold uppercase md:text-base">{series ? month + " — " + series : month}</h1>
                    <h2 className={"text-sm md:text-base italic text-gray-600 uppercase"}>{title === "" ? `Title ${idx}` : title}</h2>
                </div>

            </a>
        </article >
    );
} 