import ButtonLink from "@/Components/Buttons/ButtonLink";
import Heading2Alt from "@/Components/Typography/Heading2Alt";
import StepWrapper from "@/Layouts/StepWrapper";

interface EventProps {
    event: string
}

export default function Event({ event }: EventProps) {
    return (
        <StepWrapper title={event} heading={""}>
            <Heading2Alt>{event}</Heading2Alt>
            <ButtonLink type="secondary" href={route('events.step.past.gallery')}>Back to All</ButtonLink>
        </StepWrapper>
    )
}