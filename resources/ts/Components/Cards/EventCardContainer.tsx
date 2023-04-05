import CardBlock from "@/Components/Cards/EventCardBlock";
import Calendar from "@/Components/Icons/Calendar";
import Location from "@/Components/Icons/Location";
import Clock from "@/Components/Icons/Clock";
import Group from "@/Components/Icons/Group";
import Banknotes from "@/Components/Icons/Banknotes";
import ChatBubble from "@/Components/Icons/ChatBubble";

import PGSchedule from "@images/PRIZEGIVINGS_2023.pdf";


interface CardContainer {
    type: "prizegivings" | "shed" | "step" | "camp" | "iteam";
    children?: React.ReactNode;
}


export default function EventCardContainer({ type, children }: CardContainer) {

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
            description: <p className="text-lg font-bold">16th June - 18th June, 2023</p>,
            buttonText: "",
            buttonLink: ""
        },
        {
            Icon: Location,
            title: "Where",
            description: <p className="text-lg font-bold">Castledaly Manor, Athlone,<br /> Co Westmeath</p>,
            buttonText: "",
            buttonLink: ""
        },
        {
            Icon: ChatBubble,
            title: "Topic",
            description: <p className="text-lg font-bold">Biblical and Practical training<br /> for Christian Service</p>,
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

    const iTeamCards: CardBlock[] = [
        {
            Icon: Calendar,
            title: "Event Timing",
            description: "Sunday, 30th July - Saturday, 5th August, 2023",
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
            case "iteam":
                return iTeamCards;
        }
    }

    return (
        <div className="p-6 mx-auto mt-10 mb-20 rounded-lg drop-shadow-lg bg-sky-100 sm:w-4/5">
            <div className={`flex flex-col flex-wrap md:mx-auto justify-center md:justify-around md:flex-row md:mb-5`}>
                {getCurrentTypeCards().map(({ Icon, title, description, buttonText, buttonLink, isExternal }) => (
                    <div key={title} className={`flex flex-col ${type === "prizegivings" ? 'basis-1/2  justify-between' : 'basis-1/3'} items-center md:max-w-sm`}>
                        <CardBlock Icon={Icon} title={title} description={description} buttonLink={buttonLink} buttonText={buttonText} isExternal={isExternal} />
                    </div>
                ))}
            </div>
            {children}
        </div>
    );
}