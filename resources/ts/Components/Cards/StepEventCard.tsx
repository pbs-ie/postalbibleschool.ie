import Heading2Alt from "@/Components/Typography/Heading2Alt";
import ChevronRight from "@/Components/Icons/ChevronRight";
import ButtonLink from "@/Components/Buttons/ButtonLink";

export interface PastEventCardProps {
    id: number;
    heading: string;
    imageLink?: string;
    description: string;
    routename: string;
    date: string;
    showDetails?: boolean;
}


export default function StepEventCard({ id, heading, imageLink, description, routename = "", date, showDetails = false }: PastEventCardProps) {
    return (
        <div className="flex flex-col items-center justify-between max-w-3xl gap-2 p-4 border-2 rounded-lg bg-stone-100 drop-shadow-md">
            <Heading2Alt className="capitalize">{heading}</Heading2Alt>
            <img className="object-cover h-64 aspect-video" src={imageLink} alt={"image thumbnail for STEP - " + heading} />
            <p className="px-4 py-1 text-lg font-bold text-blue-900">{date}</p>
            <p className="mb-2 text-gray-800">{description}</p>
            {showDetails &&
                <ButtonLink className="text-sm" href={route('events.step.past.details', routename)}>More Details <ChevronRight /></ButtonLink>
            }
        </div>
    )
}