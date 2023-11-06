import SvgImagePlaceholder from "@/Components/SvgImagePlaceholder";
import Heading2Alt from "@/Components/Typography/Heading2Alt";
import { EventCardProps } from "@/Components/Cards/StepEventCardComponent";



export default function StepEventCard({ heading, image, description, date }: EventCardProps) {
    return (
        <div className="flex flex-col items-center justify-between gap-2 p-4 border-2 rounded-lg bg-stone-100 drop-shadow-md">
            <Heading2Alt className="capitalize">{heading}</Heading2Alt>
            <img src={image} alt="" />
            <p className="text-gray-800">{description}</p>
            <p className="px-4 py-2 bg-white rounded shadow-sm">{date}</p>

        </div>
    )
}