import GalleryCard from "@/Components/Gallery/GalleryCard";

export default function GalleryBasic() {

    const images = Array(8).fill({ title: "Sample", imageLink: "" });
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 justify-center mx-10">
            {images.map(({ title, imageLink }, idx) => (
                <GalleryCard key={idx} imageLink={imageLink} text={title}></GalleryCard>
            ))}
        </div>
    )
}