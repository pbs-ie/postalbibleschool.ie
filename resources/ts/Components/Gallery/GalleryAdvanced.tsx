import GalleryCard from "@/Components/Gallery/GalleryCard";

export default function GalleryAdvanced() {

    const images = Array(7).fill({ title: "2022", imageLink: "" });
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 justify-center mx-10">
            {images.map(({ title, imageLink }, idx) => (
                <GalleryCard key={idx} cardNumber={idx + 1} imageLink={imageLink} text={title}></GalleryCard>
            ))}
        </div>
    )
}