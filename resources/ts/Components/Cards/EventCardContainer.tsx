import EventCardBlock from "@/Components/Cards/EventCardBlock";
import Heading2Alt from "@/Components/Typography/Heading2Alt";



interface CardContainer {
    cards: CardBlock[];
    children?: React.ReactNode;
}


export default function EventCardContainer({ cards, children }: CardContainer) {


    return (
        <div className="p-6 mx-auto my-10 rounded-lg drop-shadow-lg bg-sky-100 sm:w-4/5">

            <div className="mt-2 mb-5">
                <Heading2Alt>Upcoming Event</Heading2Alt>
            </div>
            <div className={`flex flex-col flex-wrap md:mx-auto justify-center md:justify-around md:flex-row md:mb-5`}>
                {cards.map(({ Icon, title, description, buttonText, buttonLink, isExternal }) => (
                    <div key={title} className={`flex flex-col ${cards.length < 3 ? 'basis-1/2  justify-between' : 'basis-1/3'} items-center md:max-w-sm`}>
                        <EventCardBlock Icon={Icon} title={title} description={description} buttonLink={buttonLink} buttonText={buttonText} isExternal={isExternal} />
                    </div>
                ))}
            </div>
            {children}
        </div >
    );
}