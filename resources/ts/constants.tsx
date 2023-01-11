import Level0Image from "@images/Level0_A1.jpg";
import Level1Image from "@images/Level1_A1.jpg";
import Level2Image from "@images/Level2_A1.jpg";
import Level3Image from "@images/Level3_A1.jpg";
import Level4Image from "@images/Level4_A1.jpg";

declare global {
    interface GroupThemes {
        tagCode: string;
        tagClass: string;
        tagName: string;
    }
    interface CourseContent {
        heading: string;
        description: string;
        image: string;
        type: "bibletime" | "goingdeeper" | "gleaners";
        scrollTo: string;
    }
    interface Button {
        type: "submit" | "button" | "reset" | undefined;
        className: string;
        processing: boolean;
        children: React.ReactNode;
        onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
    }
}

interface LevelsDescription {
    tagName: string,
    tagCode: string,
    tagColor: string,
    image: string,
    title: string
}

export const courseContent: CourseContent[] = [
    {
        heading: "Bible Time Lessons",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: Level0Image,
        type: "bibletime",
        scrollTo: "lesson-download"
    },
    {
        heading: "New Life",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: Level1Image,
        type: "goingdeeper",
        scrollTo: "new-life"
    },
    {
        heading: "Gleaners",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: Level2Image,
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
export const seriesNames = [
    { name: "A series", code: "A" },
    { name: "B series", code: "B" },
    { name: "C series", code: "C" },
];
export const gleanersSeriesNames = [
    { name: "A series", code: "A" },
    { name: "B series", code: "B" },
    { name: "C series", code: "C" },
    { name: "D series", code: "D" },
    { name: "E series", code: "E" },
]

export const downloadUrlBase = "https://www.besweb.com/downloads/en/bibletime/";