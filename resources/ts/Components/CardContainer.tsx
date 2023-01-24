import CardBlock from "@/Components/CardBlock";
import Calendar from "@/Components/Icons/Calendar";
import Location from "@/Components/Icons/Location";
import Clock from "@/Components/Icons/Clock";
import Group from "@/Components/Icons/Group";
import Banknotes from "@/Components/Icons/Banknotes";
import ChatBubble from "@/Components/Icons/ChatBubble";

import PGSchedule from "@images/PRIZEGIVINGS_2023.pdf";

import { useEffect, useState } from "react";

interface CardTypes {
    type: "prizegivings" | "shed" | "step" | "camp";
}


export default function CardContainer({ type }: CardTypes) {
    const [numberOfCards, setNumberOfCards] = useState(0);

    useEffect(() => {
        switch (type) {
            case "prizegivings":
                setNumberOfCards(prizegivingCards.length);
                break;
            case "shed":
                setNumberOfCards(shedCards.length);
                break;
            case "step":
                setNumberOfCards(stepCards.length);
                break;
            case "camp":
                setNumberOfCards(campCards.length);
                break;
        }

    }, []);


    const prizegivingCards: CardBlock[] = [
        {
            Icon: Calendar,
            title: "When",
            description: "Prizegivings are held each year in a large number of venues across Ireland. They are generally held in the month of February, March and April",
            buttonText: "2023 Schedule",
            buttonLink: PGSchedule,
            isExternal: true
        },
        {
            Icon: Location,
            title: "Where",
            description: "We seek to make prizegiving easily accessible to as many of our students as possible. It is also possible that prizegivings be held in schools during school hours. Please contact us if you wish to discuss this",
            buttonText: "Contact Us",
            buttonLink: route('contactus')
        },
    ];

    const shedCards: CardBlock[] = [
        {
            Icon: Location,
            title: "Where",
            description: "Gareth and Margaret McMeekin's house",
            buttonText: "",
            buttonLink: ""
        },
        {
            Icon: Calendar,
            title: "When",
            description: "Last Saturday of each month",
            buttonText: "",
            buttonLink: ""
        },
        {
            Icon: Clock,
            title: "Time",
            description: "7:30pm to 10:00pm",
            buttonText: "",
            buttonLink: ""
        },
    ];

    const stepCards: CardBlock[] = [
        {
            Icon: Calendar,
            title: "When",
            description: "3 times a year",
            buttonText: "",
            buttonLink: ""
        },
        {
            Icon: Location,
            title: "Where",
            description: "Castledaly Manor, Athlone, Co Westmeath",
            buttonText: "",
            buttonLink: ""
        },
        {
            Icon: ChatBubble,
            title: "Topic",
            description: "2 Samuel",
            buttonText: "",
            buttonLink: ""
        },
        {
            Icon: Group,
            title: "Who can attend",
            description: "Teens and Young Adults 16+",
            buttonText: "",
            buttonLink: ""
        },
        {
            Icon: Banknotes,
            title: "Cost",
            description: <p>Regular €65<br />Student €50</p>,
            buttonText: "",
            buttonLink: ""
        },
    ]

    const campCards: CardBlock[] = [
        {
            Icon: Calendar,
            title: "When",
            description: "16th to 23rd July, 2023",
            buttonText: "",
            buttonLink: ""
        },
        {
            Icon: Location,
            title: "Where",
            description: "Avoca Manor, Avoca, Co Wicklow",
            buttonText: "",
            buttonLink: ""
        }
    ]

    const getCurrentTypeCards = () => {
        switch (type) {
            case "prizegivings":
                return prizegivingCards;
            case "shed":
                return shedCards;
            case "step":
                return stepCards;
            case "camp":
                return campCards;
        }
    }
    return (
        <div className="flex justify-center mt-10 mb-20">
            <div className="flex flex-col justify-around p-6 rounded-lg shadow-lg md:flex-row justify-items-stretch bg-sky-100 md:w-5/6 ">
                {getCurrentTypeCards().map(({ Icon, title, description, buttonText, buttonLink, isExternal }) => (
                    <div key={title} className={`flex flex-col basis-1/${numberOfCards} grow-0 items-center justify-between max-w-sm mb-8 last-of-type:mb-0 md:mb-0 md:mx-4`}>
                        <CardBlock Icon={Icon} title={title} description={description} buttonLink={buttonLink} buttonText={buttonText} isExternal={isExternal} />
                    </div>
                ))}
            </div>
        </div>
    );
}