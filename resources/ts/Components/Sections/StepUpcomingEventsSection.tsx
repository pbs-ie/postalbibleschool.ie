import StepUpcomingEventCard from "@/Components/Cards/StepUpcomingEventCard";
import Heading2Nospace from "@/Components/Typography/Heading2Nospace";

export default function StepUpcomingEventsSection({ events }: { events: StepEventsProps[] }) {
    return (
        <section className="px-4 py-4 space-y-8 sm:px-6 lg:px-12">
            <Heading2Nospace>Upcoming Events</Heading2Nospace>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {events.map((event, index) => (
                    <StepUpcomingEventCard key={index} event={event} />
                ))}
            </div>
        </section>
    )
}