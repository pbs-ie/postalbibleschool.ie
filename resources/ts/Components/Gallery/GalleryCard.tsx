
import PlaceholderImage from "@images/Placeholder.svg";
import { useState } from "react";

export default function GalleryCard({ imageLink, text, cardNumber = null }: { imageLink: string, text: string, cardNumber?: number | null }) {
    const [loaded, setLoaded] = useState(false);
    return (
        <div className={`relative ${!!cardNumber && cardNumber === 1 ? "col-span-2 row-span-2 md:row-span-3" : "col-span-1"}`}>
            {!loaded &&
                <img src={PlaceholderImage} alt="Loading image" className="relative aspect-[3/2] object-cover" />
            }
            <img className="relative h-full aspect-[3/2] object-cover" src={imageLink === "" ? PlaceholderImage : imageLink} alt={text === "" ? "Sample image" : text} onLoad={() => setLoaded(true)} />
            <p className="absolute bottom-0 w-full py-2 text-lg font-bold text-center uppercase bg-blue-400/80 text-slate-50">{text}</p>
        </div>
    )
}