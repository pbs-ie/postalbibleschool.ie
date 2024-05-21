import StepWrapper from "@/Layouts/StepWrapper";

import StepEventCard, { PastEventCardProps } from "@/Components/Cards/StepEventCard";

export default function Gallery({ content }: { content: PastEventCardProps[] }) {
    const LatestEvent = () => {
        const firstEvent = content[0];
        return (
            <div className="flex justify-center w-full">
                <StepEventCard id={firstEvent.id} heading={firstEvent.heading} imageLink={firstEvent.imageLink} description={firstEvent.description} date={firstEvent.date} showDetails={firstEvent.showDetails} routename={firstEvent.routename} size="large" />
            </div>
        );
    }
    return (
        <StepWrapper heading="Past Events" title="Past Events">
            <div className="my-5">
                <LatestEvent />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {content.slice(1).map(({ heading, imageLink, description, date, id, routename, showDetails }) => (
                    <StepEventCard key={id} id={id} heading={heading} routename={routename} imageLink={imageLink} description={description} date={date} showDetails={showDetails} />
                ))}
            </div>
        </StepWrapper>
    )
}