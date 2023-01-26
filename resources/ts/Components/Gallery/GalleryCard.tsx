
import PlaceholderImage from "@images/Placeholder.svg";

export default function GalleryCard({ imageLink, text, cardNumber = null }: { imageLink: string, text: string, cardNumber?: number | null }) {
    return (
        <div className={`relative ${!!cardNumber && cardNumber === 1 ? "col-span-2 row-span-2 md:row-span-3" : "col-span-1"}`}>
            <img className="relative h-full aspect-[3/2] object-cover" src={imageLink === "" ? PlaceholderImage : imageLink} alt={text === "" ? "Sample image" : text} />
            <p className="absolute bottom-0 w-full py-2 text-sm font-bold text-center uppercase md:text-lg bg-blue-400/80 text-slate-50">{text}</p>
        </div>
    )
}