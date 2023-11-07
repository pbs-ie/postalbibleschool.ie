import Heading2Alt from "@/Components/Typography/Heading2Alt";
import ChevronRight from "@/Components/Icons/ChevronRight";
import ButtonLink from "@/Components/Buttons/ButtonLink";
import PlaceholderImage from "@images/assembly-sample.jpg";

export interface EventCardProps {
    id: string;
    heading: string;
    image?: string;
    description: string;
    date: string;
}


export default function StepEventCard({ id, heading, image, description, date }: EventCardProps) {
    return (
        <div className="flex flex-col items-center justify-between gap-2 p-4 border-2 rounded-lg bg-stone-100 drop-shadow-md">
            <Heading2Alt className="capitalize">{heading}</Heading2Alt>
            <img className="object-cover aspect-video" src={image ? "/events/step/image/" + image : PlaceholderImage} alt={"STEP card thumbnail for " + heading} />
            <p className="px-4 py-1 text-lg font-bold text-blue-900">{date}</p>
            <p className="mb-2 text-gray-800">{description}</p>
            <ButtonLink className="text-sm" href={route('events.step.past.details', id)}>More Details <ChevronRight /></ButtonLink>
        </div>
    )
}