import Level0Image from "@images/lessons/Level0_A1.jpg";
import Level1Image from "@images/lessons/Level1_A1.jpg";
import Level2Image from "@images/lessons/Level2_A1.jpg";
import Level3Image from "@images/lessons/Level3_A1.jpg";
import Level4Image from "@images/lessons/Level4_A1.jpg";
import BibleTimeLessons from "@images/lessons/lessons-fan-english.png";
import GoingDeeperLessons from "@images/lessons/goingdeeper-fan.png";
import GleanersLessons from "@images/lessons/gleaners-lessons.png";
import Paragraph from "@/Components/Typography/Paragraph";
import { ErrorBag, Errors, PageProps } from "@inertiajs/core/types/types";
import { Config } from "ziggy-js";

declare global {
    interface Window {
        Ziggy: Config
    }
    // function route(
    //     name?: undefined,
    //     params?: RouteParamsWithQueryOverload | RouteParam,
    //     absolute?: boolean,
    //     config?: Config,
    // ): Router;

    // function route(
    //     name: string,
    //     params?: RouteParamsWithQueryOverload | RouteParam,
    //     absolute?: boolean,
    //     config?: Config,
    // ): string;
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
        buttonText?: string;
    }
    interface Button {
        type?: "submit" | "button" | "reset";
        hierarchy?: "primary" | "secondary" | "tertiary" | "transparent" | "delete";
        size?: "xsmall" | "small" | "medium" | "large";
        processing?: boolean;
        children: string | React.ReactNode;
        onClick?: React.MouseEventHandler<HTMLButtonElement>;
        formMethod?: string;
        form?: string;
        dataTest?: string;
    }
    interface ButtonLinkProps {
        hierarchy?: Button["hierarchy"];
        size?: Button["size"];
        href: string;
        children: React.ReactNode;
        Icon?: Icon["props"];
        isExternalLink?: boolean;
        dataTest?: string;
    }
    interface PassedProps extends PageProps {
        errors: Errors & ErrorBag;
        auth: {
            user: {
                name: string;
                email: string;
                nickname: string;
                picture: string;
            };
        };
        settings: {
            [key in SettingKeys]: SettingProps;
        }
        flash: {
            success?: string;
            failure?: string;
            warning?: string;
        }
    }
    interface VideoListMeta {
        monthTitle: string,
        month: string,
        id: number,
        series: string,
        routename: string,
        imageLink: string,
        category?: string
    }

    interface VideoMeta {
        externalUrl: string,
        title: string,
        duration: string,
        id: number
    }

    interface FileMeta {
        name: string,
        title: string,
        type: "slide" | "document" | "",
        filePath?: string,
        fileData?: File | null,
        id: number
    }

    interface LessonOrder {
        id: number;
        fmRecordId: number | string;
        email: string;
        schoolName: string;
        schoolType: string;
        level0Order: number;
        level1Order: number;
        level2Order: number;
        level3Order: number;
        level4Order: number;
        tlpOrder: number;
    }
    interface Icon {
        props: ({ className }: {
            className?: string;
        }) => JSX.Element
    }
    interface ClassroomProps {
        id: number,
        name: string,
        curriculum_name: string,
        curriculum_id: number,
        level_0_order: number,
        level_1_order: number,
        level_2_order: number,
        level_3_order: number,
        level_4_order: number,
        tlp_order: number,
    }

    type SettingKeys = "shed_upcoming_card";
    interface SettingProps {
        key: SettingKeys;
        label: string;
        value?: string;
        type: string;
    }

    interface CurriculumProps {
        name: string,
        email: string,
        jan_lesson?: "paper" | "digital",
        feb_lesson?: "paper" | "digital",
        mar_lesson?: "paper" | "digital",
        apr_lesson?: "paper" | "digital",
        may_lesson?: "paper" | "digital",
        jun_lesson?: "paper" | "digital",
        sep_lesson?: "paper" | "digital",
        oct_lesson?: "paper" | "digital",
        nov_lesson?: "paper" | "digital",
        dec_lesson?: "paper" | "digital",
        curriculum_type: "paper" | "digital",
        digital_count: number,
        id: number
    }
}

export interface SeriesName {
    name: string;
    code: string;
    tagClass: string;
}

export const getCurrentMonthNumber = () => (new Date()).getMonth();
// New series for BES started in 2022 -> A series. The following year should be B series and so on
// This will need to be manually fixed when and if BES makes changes on their end
export const getCurrentSeriesNumber = () => ((new Date()).getFullYear() - 2022) % 3;

export const courseContent: CourseContent[] = [
    {
        heading: "Bible Time Lessons",
        description: <Paragraph>Bibletime is an extensive course of weekly fun-filled, activity work sheets for pre-school children right up to the age of 16. It covers the majority of the main Bible stories from Creation through to the early Church. Bibletime is designed for individual use or in a group setting and is available free of charge.</Paragraph>,
        longDescription: <><Paragraph>Bibletime is an extensive course of weekly fun-filled, activity work sheets for pre-school children right up to the age of 16. It covers the majority of the main Bible stories from Creation through to the early Church. Bibletime is designed for individual use or in a group setting and is available free of charge.</Paragraph>
            <Paragraph>The course is split into 5 levels aimed at an approximate reading age. Each level consists of a syllabus of 36 lessons split monthly over 3 years. Each lesson is subdivided into four stories or studies which can be completed weekly. The stories are taken from both the Old and New Testaments and cover basic Bible stories and major Bible characters.</Paragraph>

            <Paragraph>If you would like to receive free printed copies of the lessons each month in the post, have them marked and possibly receive prizes based on your scores, please contact us.</Paragraph></>,
        image: BibleTimeLessons,
        type: "bibletime",
        scrollTo: "bibletime",
        buttonText: "Ages 4-15"
    },
    {
        heading: "Going Deeper",
        description: <><Paragraph>Aimed at ages 15 to adult Going Deeper is a course designed for those who want to start digging a little deeper into the Bible. Going Deeper is designed for individual use and is free of charge. The course is split into 3 groups of 12 monthly lessons like the Bibletime lessons.</Paragraph></>,
        longDescription: <><Paragraph>Aimed at ages 15 to adult Going Deeper is a course designed for those who want to start digging a little deeper into the Bible. Going Deeper is designed for individual use and is free of charge. The course is split into 3 groups of 12 monthly lessons like the Bibletime lessons. This course was started in 2022 and is currently being updated each month. </Paragraph><Paragraph className="text-lg text-center text-blue-600">You may find some lessons missing, they will be added in soon!</Paragraph></>,
        image: GoingDeeperLessons,
        type: "goingdeeper",
        scrollTo: "goingdeeper",
        buttonText: "Age 16 to adults"
    },
    {
        heading: "Gleaners",
        description: <><Paragraph>Gleaners is an in depth 5 year study course aimed at adults, covering a wide range of subjects including creation, christian life and prophecy. It is designed for individual use and is free of charge. Please get in touch if this would be of benefit to you.</Paragraph></>,
        image: GleanersLessons,
        type: "gleaners",
        scrollTo: "gleaners",
        buttonText: "For adults"
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
        { tagCode: "goingdeeper", tagClass: "bg-bibletime-blue", tagName: "group A" },
        { tagCode: "goingdeeper", tagClass: "bg-bibletime-green", tagName: "group B" },
        { tagCode: "goingdeeper", tagClass: "bg-bibletime-red", tagName: "group C" }
    ],
    "gleaners": [
        { tagCode: "gleaners", tagClass: "bg-bibletime-pink", tagName: "group A" },
        { tagCode: "gleaners", tagClass: "bg-bibletime-orange", tagName: "group B" },
        { tagCode: "gleaners", tagClass: "bg-bibletime-red", tagName: "group C" },
        { tagCode: "gleaners", tagClass: "bg-bibletime-green", tagName: "group D" },
        { tagCode: "gleaners", tagClass: "bg-bibletime-blue", tagName: "group E" }
    ]
};

export const bibleTimeLevels = [
    {
        tagName: "Level 0",
        tagSubText: "Preschool",
        tagCode: "level0",
        tagColor: "bg-bibletime-pink",
        image: Level0Image,
        description: <><p>Bible Stories</p><p>Simple Puzzles</p><p>Colouring</p></>
    },
    {
        tagName: "Level 1",
        tagSubText: "Ages 5-7",
        tagCode: "level1",
        tagColor: "bg-bibletime-orange",
        image: Level1Image,
        description: <><p>Bible Stories</p><p>Colouring Puzzles</p><p>Questions</p></>
    },
    {
        tagName: "Level 2",
        tagSubText: "Ages 8-10",
        tagCode: "level2",
        tagColor: "bg-bibletime-red",
        image: Level2Image,
        description: <><p>More advanced Bible stories with tasks and key verses to learn</p></>
    },
    {
        tagName: "Level 3",
        tagSubText: "Ages 11-13",
        tagCode: "level3",
        tagColor: "bg-bibletime-green",
        image: Level3Image,
        description: <><p>Deeper level Bible readings, questions and activities with key verses to learn</p></>
    },
    {
        tagName: "Level 4",
        tagSubText: "Ages 14+",
        tagCode: "level4",
        tagColor: "bg-bibletime-blue",
        image: Level4Image,
        description: <><p>Advanced Bible readings, more complex question and key verses to learn</p></>
    }
];
export type MonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const monthNames: MonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

type MonthKeys = keyof Pick<CurriculumProps, "jan_lesson" | "feb_lesson" | "mar_lesson" | "apr_lesson" | "may_lesson" | "jun_lesson" | "sep_lesson" | "oct_lesson" | "nov_lesson" | "dec_lesson">;

export const monthMap = new Map<MonthKeys, number>([
    ["jan_lesson", 0],
    ["feb_lesson", 1],
    ["mar_lesson", 2],
    ["apr_lesson", 3],
    ["may_lesson", 4],
    ["jun_lesson", 5],
    ["sep_lesson", 8],
    ["oct_lesson", 9],
    ["nov_lesson", 10],
    ["dec_lesson", 11]
]);

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