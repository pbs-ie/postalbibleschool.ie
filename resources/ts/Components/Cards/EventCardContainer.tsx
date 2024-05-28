import CardBlock from "@/Components/Cards/EventCardBlock";
import Heading2Alt from "@/Components/Typography/Heading2Alt";

import Calendar from "@/Elements/Icons/Calendar";
import Location from "@/Elements/Icons/Location";
import School from "@/Elements/Icons/SchoolIcon";


interface CardContainer {
    cards: CardBlock[];
    children?: React.ReactNode;
}


export default function EventCardContainer({ cards, children }: CardContainer) {

    const reunionCards: CardBlock[] = [
        {
            Icon: School,
            title: "What",
            description: "Camp Reunion",
            buttonText: "",
            buttonLink: ""
        },
        {
            Icon: Calendar,
            title: "When",
            description: "6th to 8th October, 2023",
            buttonText: "",
            buttonLink: ""
        },
        {
            Icon: Location,
            title: "Where",
            description: "Castledaly Manor, Moate, Athlone, Co. Westmeath",
            buttonText: "",
            buttonLink: ""
        }
    ]

    return (
        <div className="p-6 mx-auto mt-10 mb-20 rounded-lg drop-shadow-lg bg-sky-100 sm:w-4/5">

            <div className="mt-2 mb-5">
                <Heading2Alt>Upcoming Event</Heading2Alt>
            </div>
            <div className={`flex flex-col flex-wrap md:mx-auto justify-center md:justify-around md:flex-row md:mb-5`}>
                {cards.map(({ Icon, title, description, buttonText, buttonLink, isExternal }) => (
                    <div key={title} className={`flex flex-col ${cards.length < 3 ? 'basis-1/2  justify-between' : 'basis-1/3'} items-center md:max-w-sm`}>
                        <CardBlock Icon={Icon} title={title} description={description} buttonLink={buttonLink} buttonText={buttonText} isExternal={isExternal} />
                    </div>
                ))}
            </div>
            {children}
        </div >
    );
}