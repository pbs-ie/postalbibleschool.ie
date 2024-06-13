import route from "ziggy-js";

interface ImagePreviewComponentProps {
    imageFile?: File | null;
    imageLink?: string;
}
export default function ImagePreviewComponent({ imageFile, imageLink }: ImagePreviewComponentProps) {
    return (
        <img className="w-60" src={imageFile ? URL.createObjectURL(imageFile) : imageLink ? route('images.show', imageLink) : ""} />
    )
}