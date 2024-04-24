
import PlaceholderImage from "@images/Placeholder.svg";

export default function GalleryCard({ imageLink, text, cardNumber = null }: { imageLink: string, text: string, cardNumber?: number | null }) {
    return (
        <div className={`relative overflow-hidden ${!!cardNumber && cardNumber === 1 ? "col-span-2 row-span-2 md:row-span-3" : "col-span-1"}`}>
            <img className="relative aspect-[3/2] object-cover" src={imageLink === "" ? PlaceholderImage : imageLink} alt={text === "" ? "Sample image" : text} />
            <p className="absolute bottom-0 w-full py-1 text-sm text-center uppercase md:font-bold md:py-2 md:text-base bg-blue-400/80 text-slate-50">{text}</p>
        </div>
    )
}