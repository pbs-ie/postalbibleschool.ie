import ButtonLink from "@/Elements/Buttons/ButtonLink";
import { getDateRangeLongString } from "@/helper";
import route from "ziggy-js";

export default function StepUpcomingEventCard({ event, showSignupButton = false }: { event: StepEventsProps, showSignupButton?: boolean }) {
    return (
        <div className="overflow-hidden transition-all duration-300 ease-in-out bg-white rounded-lg shadow-lg hover:shadow-md hover:scale-95">
            <img className="object-cover object-center w-full h-56 aspect-video" src={route("images.show", event.imageLink)} alt={event.topic} />
            <div className="m-4">
                <h2 className="text-2xl font-semibold text-gray-800">{event.topic}</h2>
                <p className="text-sm font-medium text-gray-600">{event.speaker}</p>
                <p className="text-sm text-gray-600">{getDateRangeLongString(event.startDate, event.endDate)}</p>
            </div>
            {showSignupButton &&
                <div className="flex items-center justify-center gap-2 m-4">
                    <ButtonLink href={route('events.step.signup')}>Sign Up</ButtonLink>
                </div>
            }
        </div>
    )
}