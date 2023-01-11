import LessonCard from "@/Components/Lesson/LessonCard";
import Heading2 from "@/Components/Typography/Heading2";
import LessonDownloadList from "@/Components/Lesson/LessonDownloadList";

import { bibleTimeLevels, gleanersLevels, newLifeLevels } from "@/constants";
import { ReactNode, useEffect, useState } from "react";

interface DownloadSection {
    heading: string;
    description: ReactNode;
    type: "bibletime" | "newlife" | "gleaners"
}

export default function LessonDownloadSection({ heading, description, type }: DownloadSection) {
    const [selectedLevel, setSelectedLevel] = useState<GroupThemes>({} as GroupThemes);
    const [isWideScreen, setIsWideScreen] = useState(false);


    useEffect(() => {
        const mql = window.matchMedia("(min-width: 640px)");
        const onChange = () => setIsWideScreen(!!mql.matches);
        mql.addEventListener("change", onChange);

        setIsWideScreen(mql.matches);

        return () => {
            mql.removeEventListener("change", onChange);
        };

    }, []);

    const getCurrentTypeList = () => {
        switch (type) {
            case "bibletime":
                return bibleTimeLevels;
            case "newlife":
                return newLifeLevels;
            case "gleaners":
                return gleanersLevels;
        }
    }

    return (
        <section id="lesson-download" className="my-20 px-10 sm:px-20">
            <Heading2>{heading}</Heading2>
            {description}

            <div className="flex flex-col md:flex-row justify-around mt-4 mb-8 w-full">
                {
                    getCurrentTypeList().map((level, index) => (

                        <LessonCard isWideScreen={isWideScreen} setSelectedLevel={setSelectedLevel} className={"p-2"} key={index} heading={level.tagName} tagCode={level.tagCode} image={level.image} description={"Bible Stories"} type={type}></LessonCard>
                    ))
                }
            </div>
            <LessonDownloadList isWideScreen={isWideScreen} tagClass={selectedLevel.tagClass} tagCode={selectedLevel.tagCode}></LessonDownloadList>
        </section>
    );
}