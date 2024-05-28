import StepWrapper from "@/Layouts/StepWrapper";

import StepEventCard, { PastEventCardProps } from "@/Components/Cards/StepEventCard";

export default function Gallery({ pastEvents = [] }: { pastEvents: PastEventCardProps[] }) {
    const LatestEvent = () => {
        const firstEvent = pastEvents[0];
        return (
            <div className="flex justify-center w-full">
                <StepEventCard id={firstEvent.id} title={firstEvent.title} imageLink={firstEvent.imageLink} description={firstEvent.description} date={firstEvent.date} showDetails={firstEvent.showDetails} size="large" />
            </div>
        );
    }

    return (
        <StepWrapper heading="Past Events" title="Past Events">
            {(pastEvents && pastEvents.length === 0) ?
                <div className="grid content-center h-64">No Events found</div>
                :
                <>
                    <div className="my-5">
                        <LatestEvent />
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {pastEvents.slice(1).map(({ title: heading, imageLink, description, date, id, showDetails }) => (
                            <StepEventCard key={id} id={id} title={heading} imageLink={imageLink} description={description} date={date} showDetails={showDetails} />
                        ))}
                    </div>
                </>
            }
        </StepWrapper>
    )
}