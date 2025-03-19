import LessonCard from "@/Components/Cards/LessonCard";
import Heading2 from "@/Components/Typography/Heading2";
import LessonDownloadList from "@/Components/LessonDownloadList";

import { bibleTimeLevels } from "@/constants";
import { type ReactNode, useEffect, useState } from "react";
import ParagraphContainer from "@/Components/Typography/ParagraphContainer";

interface DownloadSection {
    heading: string;
    description: ReactNode;
    type: "bibletime" | "goingdeeper" | "gleaners"
}

export default function LessonDownloadListSection({ heading, description, type }: DownloadSection) {
    const [selectedLevel, setSelectedLevel] = useState<GroupThemes>({} as GroupThemes);
    const [isWideScreen, setIsWideScreen] = useState(false);


    useEffect(() => {
        const mql = window.matchMedia("(min-width: 768px)");
        const onChange = () => setIsWideScreen(!!mql.matches);
        mql.addEventListener("change", onChange);

        setIsWideScreen(mql.matches);

        return () => {
            mql.removeEventListener("change", onChange);
        };

    }, []);
    useEffect(() => {
        if (type === "goingdeeper") {
            setSelectedLevel({
                tagCode: type,
                tagClass: "bg-bibletime-blue",
                tagName: "Going Deeper"
            })
        } else if (type === "gleaners") {
            setSelectedLevel({
                tagCode: type,
                tagClass: "bg-bibletime-red",
                tagName: "Gleaners"
            })
        }
    }, [type]);

    return (
        <section id={type} className="px-5 my-20 lg:px-20">
            <Heading2>{heading}</Heading2>
            <ParagraphContainer>{description}</ParagraphContainer>

            {type === "bibletime" &&
                <div className="grid w-full grid-rows-5 mt-4 mb-8 md:grid-rows-1 md:grid-cols-5">
                    {bibleTimeLevels.map((level) => (

                        <LessonCard isWideScreen={isWideScreen} selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} key={level.tagName + level.tagCode} heading={level.tagName} tagCode={level.tagCode} image={level.image} description={level.description} type={type} />
                    ))}
                </div>
            }
            <LessonDownloadList isWideScreen={isWideScreen} tagClass={selectedLevel.tagClass} tagCode={selectedLevel.tagCode} type={type} />
        </section>
    );
}