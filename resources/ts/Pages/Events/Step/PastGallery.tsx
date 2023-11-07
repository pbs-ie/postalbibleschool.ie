import StepWrapper from "@/Layouts/StepWrapper";

import StepEventCard, { EventCardProps } from "@/Components/Cards/StepEventCard";



export default function PastGallery({ content }: { content: EventCardProps[] }) {
    return (
        <StepWrapper heading="Past Events" title="Past Events">
            <div className="grid grid-cols-3 gap-4">
                {content.map(({ heading, image, description, date, id }) => (
                    <StepEventCard key={id} id={id} heading={heading} image={"step-" + id} description={description} date={date} />
                ))}
            </div>
        </StepWrapper>
    )
}