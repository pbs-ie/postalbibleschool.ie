import Heading2Alt from "@/Components/Typography/Heading2Alt";
import ChevronRight from "@/Elements/Icons/ChevronRight";
import ButtonLink from "@/Elements/Buttons/ButtonLink";

export interface PastEventCardProps {
    id: number;
    heading: string;
    imageLink?: string;
    description: string;
    routename: string;
    date: string;
    showDetails?: "1" | "0";
    size?: "small" | "large";
}


export default function StepEventCard({ id, heading, imageLink, description, routename = "", date, showDetails = "0", size = "small" }: PastEventCardProps) {
    const isLargeSize = size === "large";
    return (
        <div className={"flex flex-col items-center justify-between gap-1 border-2 rounded-lg p-4 " + (isLargeSize ? "max-w-2xl shadow-md md:px-10" : "max-w-lg shadow-sm md:px-5")}>
            <Heading2Alt className="capitalize lg:text-2xl">{heading}</Heading2Alt>
            <img className={"object-cover aspect-video " + (isLargeSize ? "h-64 " : "h-32")} src={imageLink} alt={"image thumbnail for STEP - " + heading} />
            <p className="py-1 text-lg font-bold text-blue-900">{date}</p>
            <p className={"mb-2 text-left text-gray-800 " + (isLargeSize ? "text-base" : "text-base")}>{description}</p>
            {showDetails === "1" &&
                <ButtonLink Icon={ChevronRight} href={route('events.step.past.show', routename)}>Watch Videos</ButtonLink>
            }
        </div>
    )
}