import EventCardContainer from "@/Components/Cards/EventCardContainer";
import Paragraph from "@/Components/Typography/Paragraph";
import ParagraphContainer from "@/Components/Typography/ParagraphContainer";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { Head } from "@inertiajs/inertia-react";

export default function ITeam() {
    const title = "iTeam";
    return (
        <WrapperLayout>
            <Head title={`Events - ${title}`}></Head>
            <section className={"py-12 mx-auto text-center shadow-sm max-w-7xl sm:px-6 lg:px-8"}>
                <h1 className="p-6 mt-2 mb-4 text-5xl font-bold leading-snug text-blue-800 font-title">{title}</h1>
                <ParagraphContainer>
                    <Paragraph>
                        iTeam is a new event which intends to encourage those with an interest in producing digital educational resources to teach the bible to work together within a defined project for PBS. It is hoped that each contributor benefits personally in developing their own skillset by working along with complimentary skills while the group as a whole brings a whole year of bible lessons to be "click ready" for the classroom.
                    </Paragraph>
                    <div className="my-10">
                        <div className="my-10">
                            <EventCardContainer type={"iteam"}>
                            </EventCardContainer>
                        </div>
                    </div>
                    <Paragraph>
                        We are glad that you are interested in joining with us this summer, and would appreciate it if you could complete this form, and return it to us, as we have been advised to keep detailed records of participants.
                    </Paragraph>
                    <Paragraph>
                        In accordance with our Child Safety Policy (which applies, since both minors and adults will participate in this week), we have to ask some rather personal questions. These are necessary for legal reasons, and we do trust that you will understand.
                    </Paragraph>
                </ParagraphContainer>
                <div className="flex items-stretch justify-center my-10">
                    <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScmiVmc6UyVxgOFiT-hGU393EWaDwq8_H7O4FW8DJk0yBbfBw/viewform?embedded=true" className="w-full max-w-4xl h-[35rem] border border-y-2 py-1 border-x-0 border-gray-400 m-1">Loading…</iframe>
                </div>
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