import Level0Image from "@images/lessons/Level0_A1.jpg";
import Level1Image from "@images/lessons/Level1_A1.jpg";
import Level2Image from "@images/lessons/Level2_A1.jpg";
import Level3Image from "@images/lessons/Level3_A1.jpg";
import Level4Image from "@images/lessons/Level4_A1.jpg";
import BibleTimeLessons from "@images/lessons/lessons-fan-english.jpg";
import GoingDeeperLessons from "@images/lessons/goingdeeper-fan.jpg";
import GleanersLessons from "@images/lessons/gleaners-lessons.jpg";
import Paragraph from "./Components/Typography/Paragraph";
import { ErrorBag, Errors, Page, PageProps } from "@inertiajs/inertia/types/types";
import { Link } from "@inertiajs/inertia-react";

declare global {
    function route(name?: string, params?: any): any;

    interface GroupThemes {
        tagCode: string;
        tagClass: string;
        tagName: string;
    }
    interface CourseContent {
        heading: string;
        description: React.ReactNode;
        longDescription?: React.ReactNode;
        image: string;
        type: "bibletime" | "goingdeeper" | "gleaners";
        scrollTo?: string;
    }
    interface Button {
        type?: "submit" | "button" | "reset" | undefined;
        className?: string;
        processing?: boolean;
        children: React.ReactNode;
        onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    }
    interface PassedProps extends Page<PageProps> {
        props: {
            errors: Errors & ErrorBag;
            auth: {
                user: {
                    name: string;
                };
            };
            flash: {
                success?: string;
                failure?: string;
            }
        };
    }
}

interface LevelsDescription {
    tagName: string,
    tagCode: string,
    tagColor: string,
    image: string,
    title: string
}

export interface SeriesName {
    name: string;
    code: string;
    tagClass: string;
}

export const courseContent: CourseContent[] = [
    {
        heading: "Bible Time Lessons",
        description: <Paragraph>Bibletime is an extensive course of weekly fun-filled, activity work sheets for pre-school children right up to the age of 16. It covers the majority of the main Bible stories from Creation through to the early Church. Bibletime is designed for individual use or in a group setting and is available free of charge.</Paragraph>,
        longDescription: <><Paragraph>Bibletime is an extensive course of weekly fun-filled, activity work sheets for pre-school children right up to the age of 16. It covers the majority of the main Bible stories from Creation through to the early Church. Bibletime is designed for individual use or in a group setting and is available free of charge.</Paragraph>
            <Paragraph>The course is split into 5 levels aimed at an approximate reading age. Each level consists of a syllabus of 36 lessons split monthly over 3 years. Each lesson is subdivided into four stories or studies which can be completed weekly. The stories are taken from both the Old and New Testaments and cover basic Bible stories and major Bible characters.</Paragraph>

            <Paragraph>If you would like to receive free printed copies of the lessons each month in the post, have them marked and possibly receive prizes based on your scores, please <Link as="a" className="text-blue-600 underline hover:text-blue-800 visited:text-purple-600" href={route('contactus')}>contact us</Link></Paragraph></>,
        image: BibleTimeLessons,
        type: "bibletime",
        scrollTo: "bibletime"
    },
    {
        heading: "Going Deeper",
        description: <><Paragraph>Aimed at ages 15 to adult Going Deeper is a course designed for those who want to start digging a little deeper into the Bible. Going Deeper is designed for individual use and is free of charge. The course is split into 3 groups of 12 monthly lessons like the Bibletime lessons. This course was started in 2022 and is currently being updated each month. </Paragraph><Paragraph className="text-lg text-center text-blue-600">You may find some lessons missing, they will be added in soon!</Paragraph></>,
        image: GoingDeeperLessons,
        type: "goingdeeper",
        scrollTo: "goingdeeper"
    },
    {
        heading: "Gleaners",
        description: <><Paragraph>Gleaners is an in depth 5 year study course aimed at adults, covering a wide range of subjects including creation, christian life and prophecy. It is designed for individual use and is free of charge. Please get in touch if this would be of benefit to you.</Paragraph></>,
        image: GleanersLessons,
        type: "gleaners",
        scrollTo: "gleaners"
    }
];

export const groupThemes: { [key: string]: GroupThemes[] } = {
    "bibletime": [
        { tagCode: "level0", tagClass: "bg-bibletime-pink", tagName: "level 0" },
        { tagCode: "level1", tagClass: "bg-bibletime-orange", tagName: "level 1" },
        { tagCode: "level2", tagClass: "bg-bibletime-red", tagName: "level 2" },
        { tagCode: "level3", tagClass: "bg-bibletime-green", tagName: "level 3" },
        { tagCode: "level4", tagClass: "bg-bibletime-blue", tagName: "level 4" }],
    "goingdeeper": [
        { tagCode: "goingdeeper", tagClass: "bg-bibletime-blue", tagName: "going deeper A" },
        { tagCode: "goingdeeper", tagClass: "bg-bibletime-green", tagName: "going deeper B" },
        { tagCode: "goingdeeper", tagClass: "bg-bibletime-red", tagName: "going deeper C" }
    ],
    "gleaners": [
        { tagCode: "gleaners", tagClass: "bg-bibletime-pink", tagName: "gleaners A" },
        { tagCode: "gleaners", tagClass: "bg-bibletime-orange", tagName: "gleaners B" },
        { tagCode: "gleaners", tagClass: "bg-bibletime-red", tagName: "gleaners C" },
        { tagCode: "gleaners", tagClass: "bg-bibletime-green", tagName: "gleaners D" },
        { tagCode: "gleaners", tagClass: "bg-bibletime-blue", tagName: "gleaners E" }
    ]
};

export const bibleTimeLevels = [
    {
        tagName: "Level 0",
        tagCode: "level0",
        tagColor: "bg-bibletime-pink",
        image: Level0Image,
        title: "A9 - Jacob"
    },
    {
        tagName: "Level 1",
        tagCode: "level1",
        tagColor: "bg-bibletime-orange",
        image: Level1Image,
        title: "A9 - Jacob"
    },
    {
        tagName: "Level 2",
        tagCode: "level2",
        tagColor: "bg-bibletime-red",
        image: Level2Image,
        title: "A9 - Jacob"
    },
    {
        tagName: "Level 3",
        tagCode: "level3",
        tagColor: "bg-bibletime-green",
        image: Level3Image,
        title: "A9 - Jacob"
    },
    {
        tagName: "Level 4",
        tagCode: "level4",
        tagColor: "bg-bibletime-blue",
        image: Level4Image,
        title: "A9 - Jacob"
    }
];
export const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const seriesNames: SeriesName[] = [
    { name: "A series", code: "A", tagClass: "" },
    { name: "B series", code: "B", tagClass: "" },
    { name: "C series", code: "C", tagClass: "" },
];
export const goingDeeperSeriesNames: SeriesName[] = [
    { name: "A series", code: "A", tagClass: "bg-bibletime-red" },
    { name: "B series", code: "B", tagClass: "bg-bibletime-green" },
    { name: "C series", code: "C", tagClass: "bg-bibletime-blue" },
]
export const gleanersSeriesNames: SeriesName[] = [
    { name: "A series", code: "A", tagClass: "bg-bibletime-pink" },
    { name: "B series", code: "B", tagClass: "bg-bibletime-orange" },
    { name: "C series", code: "C", tagClass: "bg-bibletime-red" },
    { name: "D series", code: "D", tagClass: "bg-bibletime-green" },
    { name: "E series", code: "E", tagClass: "bg-bibletime-blue" },
]

export const downloadUrlBase = "https://www.besweb.com/downloads/en/bibletime/";