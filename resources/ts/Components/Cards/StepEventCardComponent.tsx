import StepEventCard from "@/Components/Cards/StepEventCard";

export interface EventCardProps {
    heading: string;
    image?: string;
    description: string;
    date: string;
}

export default function StepEventCardComponent() {

    let stepCards: EventCardProps[] = [
        {
            heading: "2nd Samuel",
            image: "http://via.placeholder.com/640x360",
            description: "Pokem ipsum dolor sit amet Magnemite",
            date: "January 2023"
        },
        {
            heading: "1st Samuel",
            image: "http://via.placeholder.com/640x360",
            description: "Pokem ipsum dolor sit amet Magnemite",
            date: "November 2022"
        },
        {
            heading: "Overview of Revelation",
            image: "http://via.placeholder.com/640x360",
            description: "Pokem ipsum dolor sit amet Magnemite",
            date: "June 2022"
        },
        {
            heading: "Isaiah",
            image: "http://via.placeholder.com/640x360",
            description: "Pokem ipsum dolor sit amet Magnemite",
            date: "January 2022"
        },
        {
            heading: "Introduction to Prophecy",
            image: "http://via.placeholder.com/640x360",
            description: "Pokem ipsum dolor sit amet Magnemite",
            date: "November 2021"
        }
    ]
    return (
        <div className="grid grid-cols-3 gap-4">
            {stepCards.map(({ heading, image, description, date }, index) => (
                <StepEventCard key={index} heading={heading} image={image} description={description} date={date} />
            ))}
        </div>
    )
}