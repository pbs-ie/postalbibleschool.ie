import GalleryCard from "@/Components/Gallery/GalleryCard";

declare global {
    interface Gallery {
        title: string;
        imageLink: string;
        altText?: string;
    }
}

export default function GalleryBasic({ images }: { images: Gallery[] }) {

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 justify-center mx-10">
            {images.map(({ title, imageLink }, idx) => (
                <GalleryCard key={idx} imageLink={imageLink} text={title}></GalleryCard>
            ))}
        </div>
    )
}