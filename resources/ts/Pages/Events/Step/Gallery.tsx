import StepWrapper from "@/Layouts/StepWrapper";

import StepEventCard, { PastEventCardProps } from "@/Components/Cards/StepEventCard";

export default function Gallery({ pastEvents = [] }: { pastEvents: PastEventCardProps[] }) {
    const LatestEvent = () => {
        const firstEvent = pastEvents[0];
        return (
            <div className="flex justify-center w-full">
                <StepEventCard speaker={firstEvent.speaker} id={firstEvent.id} topic={firstEvent.topic} imageLink={firstEvent.imageLink} description={firstEvent.description} startDate={firstEvent.startDate} showDetails={firstEvent.showDetails} size="large" endDate={""} />
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
                        {pastEvents.slice(1).map(({ topic: heading, imageLink, description, startDate: date, id, showDetails, speaker }) => (
                            <StepEventCard speaker={speaker} key={id} id={id} topic={heading} imageLink={imageLink} description={description} startDate={date} showDetails={showDetails} endDate="" />
                        ))}
                    </div>
                </>
            }
        </StepWrapper>
    )
}