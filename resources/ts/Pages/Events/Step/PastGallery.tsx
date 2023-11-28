import StepWrapper from "@/Layouts/StepWrapper";

import StepEventCard, { EventCardProps } from "@/Components/Cards/StepEventCard";

export default function PastGallery({ content }: { content: EventCardProps[] }) {
    const LatestEvent = () => {
        const firstEvent = content[0];
        return (
            <div className="mx-auto">
                <StepEventCard id={firstEvent.id} heading={firstEvent.heading} image={firstEvent.image} description={firstEvent.description} date={firstEvent.date} showDetails />
            </div>
        );
    }
    return (
        <StepWrapper heading="Past Events" title="Past Events">
            <div className="my-5">
                <LatestEvent />
            </div>
            <div className="grid grid-cols-3 gap-4">
                {content.slice(1).map(({ heading, image, description, date, id }) => (
                    <StepEventCard key={id} id={id} heading={heading} image={image} description={description} date={date} />
                ))}
            </div>
        </StepWrapper>
    )
}