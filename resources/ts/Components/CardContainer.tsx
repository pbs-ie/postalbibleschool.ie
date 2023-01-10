import CardBlock from "@/Components/CardBlock";
import Calendar from "@/Components/Icons/Calendar";
import Location from "@/Components/Icons/Location";
import { useEffect, useState } from "react";

interface CardTypes {
    type: "prizegivings" | "shed";
}

export default function CardContainer({ type }: CardTypes) {
    const [numberOfCards, setNumberOfCards] = useState(0);

    useEffect(() => {
        if (type === "prizegivings")
            setNumberOfCards(prizegivingCards.length);
        if (type === "shed")
            setNumberOfCards(shedCards.length);

    }, []);


    const prizegivingCards = [
        {
            icon: Calendar,
            title: "When",
            description: "Prizegivings are held each year in a large number of venues across Ireland. They are generally held in February, March and April",
            buttonText: "2023 Schedule"
        },
        {
            icon: Location,
            title: "Where",
            description: "We seek to make prizegiving easily accessible to as many of our students as possible. It is also possible that prizegivings be held in schools during school hours. Please contact us if you wish to discuss this",
            buttonText: "Contact Us"
        },
    ];

    const shedCards = [
        {
            icon: Location,
            title: "Where",
            description: "Gareth and Margaret McMeekin's house",
            buttonText: ""
        },
        {
            icon: Calendar,
            title: "When",
            description: "Last Saturday of each month",
            buttonText: ""
        },
        {
            icon: Location,
            title: "Time",
            description: "7:30pm to 10:00pm",
            buttonText: ""
        },
    ];

    const getCurrentTypeCards = () => {
        switch (type) {
            case "prizegivings":
                return prizegivingCards;
            case "shed":
                return shedCards;
        }
    }
    return (
        <div className="flex justify-center mt-10 mb-20">
            <div className="flex flex-col md:flex-row justify-around justify-items-stretch p-6 rounded-lg shadow-lg bg-sky-100 md:w-5/6 ">
                {getCurrentTypeCards().map(({ icon, title, description, buttonText }) => (
                    <div key={title} className={`flex flex-col basis-1/${numberOfCards} grow-0 items-center justify-between max-w-sm mb-8 last-of-type:mb-0 md:mb-0 md:mx-4`}>
                        <CardBlock Icon={icon} title={title} description={description} buttonText={buttonText} />
                    </div>
                ))}
            </div>
        </div>
    );
}