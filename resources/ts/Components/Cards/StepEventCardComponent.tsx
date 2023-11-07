import StepEventCard from "@/Components/Cards/StepEventCard";

import JonahImage from "@images/step/events/Jonah.jpg";
import OneSamuelImage from "@images/step/events/1_Samuel.jpg";
import TwoSamuelImage from "@images/step/events/2_Samuel.jpg";
import IsaiahImage from "@images/step/events/Isaiah.jpg";
import JohnImage from "@images/step/events/John.jpg";
import RevelationImage from "@images/step/events/Revelation.jpg";

export interface EventCardProps {
    id: string;
    heading: string;
    image?: string;
    description: string;
    date: string;
}

export default function StepEventCardComponent() {

    let stepCards: EventCardProps[] = [
        {
            id: "2samuel",
            heading: "2nd Samuel",
            image: TwoSamuelImage,
            description: "Continuing through the same theme of cultivating a devotional relationship with God, we take a look at the Book of 2nd Samuel presented by Gareth McMeekin",
            date: "January 2023"
        },
        {
            id: "1samuel",
            heading: "1st Samuel",
            image: OneSamuelImage,
            description: "Our focus was on characters, looking at an emphasis on cultivation of the devotional relationship with God as well as the ideas of sacrifice and service in 1 Samuel through various speakers",
            date: "November 2022"
        },
        {
            id: "revelation",
            heading: "Overview of Revelation",
            image: RevelationImage,
            description: "Looking at our future hope and promise, we explored the book of Revelations displayed to us by Stevie Rogers from Apsley Hall as our speaker",
            date: "June 2022"
        },
        {
            id: "isaiah",
            heading: "Isaiah",
            image: IsaiahImage,
            description: "Continuing on the theme of prophecy in the Bible, we were led through the book of Isaiah with Allan McKinnon from Tilsley College",
            date: "January 2022"
        },
        {
            id: "jonah",
            heading: "Introduction to Prophecy",
            image: JonahImage,
            description: `"An Introduction to Bible Prophecy" with a focus on the book of Jonah`,
            date: "November 2021"
        },
        {
            id: "john",
            heading: "Gospel of John",
            image: JohnImage,
            description: "Josh Fitzhugh from Belfast took us through the Gospel of John for the first gathering after lockdown",
            date: "July 2021"
        }
    ]
    return (
        <div className="grid grid-cols-3 gap-4">
            {stepCards.map(({ heading, image, description, date, id }) => (
                <StepEventCard key={id} id={id} heading={heading} image={image} description={description} date={date} />
            ))}
        </div>
    )
}