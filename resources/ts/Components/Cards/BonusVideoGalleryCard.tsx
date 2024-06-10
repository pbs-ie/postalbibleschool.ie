import route from "ziggy-js";

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


export default function BonusVideoGalleryCard({ title, clickLink, month, series = "", active = false, total, imageLink = "", idx }: GalleryCard) {
    return (
        <article>
            <a href={clickLink} className={"inline-flex flex-col items-center gap-2 p-2 md:p-4 overflow-hidden rounded-lg drop-shadow-lg " + (active ? "bg-pbsblue text-slate-50" : "bg-stone-100 text-gray-600")}>
                <div className="relative">
                    <img src={route('images.show', imageLink)} alt={"thumbnail for video " + title} className="block object-cover w-full h-40 bg-top rounded md:h-44 aspect-video" />
                </div>
                <div className="text-center">
                    <h1 className="text-sm font-bold uppercase md:text-base">{series ? month + " — " + series : month}</h1>
                    <h2 className={"text-sm md:text-base italic text-gray-600 uppercase"}>{title === "" ? `Title ${idx}` : title}</h2>
                </div>

            </a>
        </article >
    );
} 