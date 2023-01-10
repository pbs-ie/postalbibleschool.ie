import CardBlock from "@/Components/CardBlock";
import Calendar from "@/Components/Icons/Calendar";
import Location from "@/Components/Icons/Location";

export default function CardContainer() {
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
    ]
    return (
        <div className="flex justify-center">
            <div className="flex flex-col md:flex-row justify-between justify-items-stretch p-6 rounded-lg shadow-lg bg-sky-100 md:w-3/4 ">
                {prizegivingCards.map(({ icon, title, description, buttonText }) => (
                    <div key={title} className="flex flex-col items-center justify-between max-w-sm mb-8 last-of-type:mb-0 md:mb-0 md:mx-4">
                        <CardBlock Icon={icon} title={title} description={description} buttonText={buttonText} />
                    </div>
                ))}
            </div>
        </div>
    );
}