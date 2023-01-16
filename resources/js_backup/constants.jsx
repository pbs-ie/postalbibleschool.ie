import Level0Image from "@images/Level0_A1.jpg";
import Level1Image from "@images/Level1_A1.jpg";
import Level2Image from "@images/Level2_A1.jpg";
import Level3Image from "@images/Level3_A1.jpg";
import Level4Image from "@images/Level4_A1.jpg";

export const courseContent = [
    {
        heading: "Bible Time Lessons",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: Level0Image,
        type: "bibletime"
    },
    {
        heading: "Going Deeper",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: Level1Image,
        type: "goingdeeper"
    },
    {
        heading: "Gleaners",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: Level2Image,
        type: "gleaners"
    }
];

export const groupThemes = {
    "bibletime": [
        { tagCode: "level0", tagClass: "bg-bibletime-pink", tagName: "level 0" },
        { tagCode: "level1", tagClass: "bg-bibletime-orange", tagName: "level 1" },
        { tagCode: "level2", tagClass: "bg-bibletime-red", tagName: "level 2" },
        { tagCode: "level3", tagClass: "bg-bibletime-green", tagName: "level 3" },
        { tagCode: "level4", tagClass: "bg-bibletime-blue", tagName: "level 4" }],
    "goingdeeper": [
        { tagCode: "groupA", tagClass: "bg-bibletime-blue", tagName: "group A" },
        { tagCode: "groupB", tagClass: "bg-bibletime-green", tagName: "group B" },
        { tagCode: "groupC", tagClass: "bg-bibletime-red", tagName: "group C" }
    ],
    "gleaners": [
        { tagCode: "groupA", tagClass: "bg-bibletime-pink", tagName: "group A" },
        { tagCode: "groupB", tagClass: "bg-bibletime-orange", tagName: "group B" },
        { tagCode: "groupC", tagClass: "bg-bibletime-red", tagName: "group C" },
        { tagCode: "groupD", tagClass: "bg-bibletime-green", tagName: "group D" },
        { tagCode: "groupE", tagClass: "bg-bibletime-blue", tagName: "group E" }
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
    { name: "C series", code: "C" }
];

export const downloadUrlBase = "https://www.besweb.com/downloads/en/bibletime/";