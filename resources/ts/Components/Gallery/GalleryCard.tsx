
import PlaceholderImage from "@images/Placeholder.svg";

export default function GalleryCard({ imageLink, text }: { imageLink: string, text: string }) {
    return (
        <div className="relative col-span-1">
            <img className="relative object-cover" src={imageLink === "" ? PlaceholderImage : imageLink} alt={text === "" ? "Sample image" : text} />
            <p className="absolute w-full bottom-0 text-lg text-center bg-slate-600/50 text-slate-50 py-2">{text}</p>
        </div>
    )
}