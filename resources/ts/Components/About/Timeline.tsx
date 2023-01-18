import TimelineEntry from "./TimelineEntry";
import GraysImage from "@images/bertandwendy-300x300.jpg";
import McMeekin1Image from "@images/noelandlizamcmeekin-400x400.jpg";
import McMeekin2Image from "@images/garethandmargaret.jpg";

export default function Timeline() {
    return (
        <div className="mx-auto w-full h-full">
            <div className="relative wrap overflow-hidden p-5 h-full">

                <div className="seperator-line border-2 absolute border-opacity-80 border-blue-400 h-full border left-1/2"></div>

                <TimelineEntry
                    image={GraysImage}
                    imageAlt="Bert and Wendy Gray"
                    heading="Bert & Wendy Gray"
                    description={"Postal Bible School Ireland is now in its 3rd generation of leadership. The work began in 1958 when Bert and Wendy Gray began sending written Sunday school lessons to children in remote parts of Ireland. They oversaw the initial development of the work, supplying it to children and small groups while working with group of volunteer teachers to write the basics of the syllabus that is still used today. Bert and Wendy operated at different times from Dublin, Cork and the Midlands of Ireland."}
                    year={"1958"}
                />

                <TimelineEntry
                    image={McMeekin1Image}
                    imageAlt="Noel and Liza McMeekin"
                    heading="Noel & Liza McMeekin"
                    description={"In 1992 Noel and Liza McMeekin took over the running of the Postal Bible School centre in Ireland and moved the offices to Cootehill in Co. Cavan. They oversaw the growth of the work to over 5000 students and developed the connections with schools and students through regular visits and Bible camps. During their 25 years in charge, hundreds of young people benefited from hearing God's work through summer camps at Ovoca Manor and other activity programmes while thousands were studying God's word through the lessons distributed"}
                    year={"1992"}
                    type="right"
                />
                <TimelineEntry
                    image={McMeekin2Image}
                    imageAlt="Gareth and Margaret McMeekin"
                    heading="Gareth & Margaret McMeekin"
                    description={"In 2018 Noel and Liza decided to reduce their involvement when their sone Gareth and his wife Margaret took over running the Cootehill centre and moved it othe current address in the town center. Gareth and Margaret have been involved in developing discipleship programs alongside the core work of PBS and are now overseeing the development of difital resources to support the existing printed material. The office relies heavily on the support of a broad range of Christians as both staff and volunteers. In the office tram alone, we have had folk from Asia, America, Europe and Ireland in the last few years. The whole work of Postal Bible School has engaged many volunteers from its earliest days with dozens of event volunteers and hundreds of correspondent markers being involved every year. Each of those who serve, whether as staff or volunteers believe that God's word and the Gospel are important foundations for young lives."}
                    year={"2018"}
                />

            </div>
        </div>
    )
}