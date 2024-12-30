import StepUpcomingEventCard from "@/Components/Cards/StepUpcomingEventCard";
import Heading2Nospace from "@/Components/Typography/Heading2Nospace";

export default function StepNextEventSection({ event }: { event: StepEventsProps }) {
    return (
        <section className="px-4 py-4 space-y-8 sm:px-6 lg:px-12">
            <Heading2Nospace>Next Event</Heading2Nospace>
            <div className="flex justify-center w-full">
                <StepUpcomingEventCard event={event} showSignupButton />
            </div>
        </section>
    )
}