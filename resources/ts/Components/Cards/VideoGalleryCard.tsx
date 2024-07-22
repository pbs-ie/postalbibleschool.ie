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


export default function VideoGalleryCard({ title, clickLink, month, series = "", active = false, total, imageLink, idx }: GalleryCard) {
    return (
        <article className="mx-auto">
            <a href={clickLink} className={"inline-flex flex-col text-left gap-1 p-2 overflow-hidden " + (active ? "text-pbsblue" : " text-gray-800")}>
                <div className="relative min-h-28">
                    <img src={route('images.show', imageLink)} alt={"Video " + idx} className="object-fill object-left w-full h-40 rounded-xl aspect-video" />
                </div>
                <div>
                    <h1 className="text-sm font-bold uppercase md:text-base">{title === "" ? `Title ${idx}` : title}</h1>
                    <h2 className={"text-sm text-gray-600 uppercase"}>{series ? month + " — " + series : month}</h2>
                </div>

            </a>
        </article >
    );
} 