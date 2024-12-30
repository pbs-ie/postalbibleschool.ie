import StepWrapper from "@/Layouts/StepWrapper";

import StepEventCard, { PastEventCardProps } from "@/Components/Cards/StepEventCard";

export default function Gallery({ allEvents = [] }: { allEvents: StepEventsProps[] }) {
    const LatestEvent = () => {
        const firstEvent = allEvents[0];
        return (
            <div className="flex justify-center w-full">
                <StepEventCard speaker={firstEvent.speaker} id={firstEvent.id} topic={firstEvent.topic} imageLink={firstEvent.imageLink} description={firstEvent.description} startDate={firstEvent.startDate} showDetails={firstEvent.showDetails} size="large" endDate={""} />
            </div>
        );
    }

    return (
        <StepWrapper heading="Videos" title="Videos">
            {(allEvents && allEvents.length === 0) ?
                <div className="grid content-center h-64 italic">No Videos available.</div>
                :
                <>
                    <div className="my-5">
                        <LatestEvent />
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {allEvents.slice(1).map(({ topic: heading, imageLink, description, startDate: date, id, showDetails, speaker }) => (
                            <StepEventCard speaker={speaker} key={id} id={id} topic={heading} imageLink={imageLink} description={description} startDate={date} showDetails={showDetails} endDate="" />
                        ))}
                    </div>
                </>
            }
        </StepWrapper>
    )
}