import SecondaryButton from "@/Elements/Buttons/SecondaryButton";
import Paragraph from "@/Components/Typography/Paragraph";
import ParagraphContainer from "@/Components/Typography/ParagraphContainer";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { Head } from "@inertiajs/react";

import Calendar from "@/Elements/Icons/Calendar";
import EventCardBlock from "@/Components/Cards/EventCardBlock";
import route from "ziggy-js";

export interface ITeamSettingProps {
    dates: string;
    embedLink: string;
    isActive: boolean;
    eventImage?: File | null;
    eventImageLink?: string,
}
export default function ITeam({ iteamSettings }: { iteamSettings: ITeamSettingProps }) {
    const iTeamCards: CardBlock[] = [
        {
            Icon: Calendar,
            title: "Event Dates",
            description: <p>{iteamSettings.dates}</p>
        }
    ]
    const title = "iTeam";
    return (
        <WrapperLayout>
            <Head title={`Events - ${title}`}></Head>
            <section className={"py-12 mx-auto text-center shadow-sm max-w-7xl sm:px-6 lg:px-8"}>
                <h1 className="p-6 mt-2 mb-4 font-sans text-5xl font-bold leading-snug text-blue-800">{title}</h1>
                <div className="grid gap-5 px-5 mb-5 md:grid-cols-2 md:gap-10 md:mb-10">
                    {iteamSettings.isActive &&
                        <img src={route('images.show', iteamSettings.eventImageLink)} alt="iTeam flyer" className="md:order-last" />
                    }
                    <div className="md:px-10">
                        <Paragraph>
                            iTeam is a new event which intends to encourage those with an interest in producing digital educational resources to teach the bible to work together within a defined project for PBS. It is hoped that each contributor benefits personally in developing their own skillset by working along with complimentary skills while the group as a whole brings a whole year of bible lessons to be "click ready" for the classroom.
                        </Paragraph>
                        {iteamSettings.isActive ?
                            <div className="p-6 mx-auto my-10 rounded-lg drop-shadow-lg bg-sky-100 lg:w-4/5">
                                {iTeamCards.map(({ Icon, title, description, buttonText, buttonLink, isExternal }) => (
                                    <EventCardBlock key={title} Icon={Icon} title={title} description={description} buttonLink={buttonLink} buttonText={buttonText} isExternal={isExternal} />
                                ))}
                            </div>
                            : null
                        }

                    </div>
                </div>
                {iteamSettings.isActive ?
                    <>
                        <ParagraphContainer>
                            <Paragraph className="text-left text-black">
                                We are glad that you are interested in joining with us this summer, and would appreciate it if you could complete the form below, and return it to us, as we have been advised to keep detailed records of participants. A few things to keep in mind as you fill this form:
                            </Paragraph>
                            <ul className="ml-10 text-left list-disc marker:text-sky-600">
                                <li>
                                    This form is to <b>register your interest</b> in the event. We will be back in touch as soon as possible to confirm if you are on the team.
                                </li>
                                <li>
                                    This event is primarily targeted for people who are 16 years or older, but we have a small number of places available for under 16s.
                                </li>
                                <li>
                                    In accordance with our Child Safety Policy (which applies, since both minors and adults will participate in this week), we have to ask some rather personal questions. These are necessary for legal reasons, and we do trust that you will understand.
                                </li>
                            </ul>
                        </ParagraphContainer>
                        <div className="flex items-stretch justify-center my-10">
                            <iframe src={iteamSettings.embedLink} className="w-full max-w-4xl h-[35rem] border border-y-2 py-1 border-x-0 border-gray-400 m-1">Loading…</iframe>
                        </div>
                    </>
                    : null
                }
                <ParagraphContainer>
                    <Paragraph><em>
                        If you have any questions please give us a ring on <span>00 353 49 5552915</span> / <span>086 8519047</span> or send us an email.
                    </em>
                    </Paragraph>
                </ParagraphContainer>
            </section>

        </WrapperLayout>
    )
}