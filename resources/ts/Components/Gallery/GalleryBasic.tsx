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
        <div className="grid justify-center grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-4 md:mx-10">
            {images.map(({ title, imageLink }, idx) => (
                <GalleryCard key={idx} imageLink={imageLink} text={title}></GalleryCard>
            ))}
        </div>
    )
}