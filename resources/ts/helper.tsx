import { gleanersSeriesNames } from "@/constants";
import { useEffect, useRef, useState } from "react";
import { animateScroll, scroller } from "react-scroll";
import DeviceTabletIcon from "@/Elements/Icons/DeviceTabletIcon";
import Newspaper from "@/Elements/Icons/Newspaper";

interface propertyItem {
    link: string;
    dateModified: string;
    size: string;
    series: string;
    monthNumber: number;
}
export interface responseLinks {
    [property: string]: Array<propertyItem>;
}

interface BesLinksType {
    bibleTimeBySeries: { [property: string]: responseLinks };
    goingDeeperBySeries: { [property: string]: responseLinks };
    gleanersBySeries: { [property: string]: responseLinks };
}

const BES_GLOBALS: BesLinksType = {
    bibleTimeBySeries: {},
    goingDeeperBySeries: {},
    gleanersBySeries: {},
};

export const setAllBesLinks = (bibleTimeValues: responseLinks, goingDeeperValues: responseLinks = {}, gleanersValues: responseLinks = {}) => {
    BES_GLOBALS.bibleTimeBySeries = groupedBySeriesBes(bibleTimeValues);
    if (Object.keys(goingDeeperValues).length !== 0) {
        BES_GLOBALS.goingDeeperBySeries = groupedBySeriesBes(goingDeeperValues);
    }
    if (Object.keys(gleanersValues).length !== 0) {
        BES_GLOBALS.gleanersBySeries = groupedBySeriesBes(gleanersValues);
    }
}

// Returns the download url for BES lessons from the BES links list
export const getDownloadLink = (seriesCode: string, tagCode: string, monthNumber: number, type = "bibletime"): string => {
    if (type === "bibletime") {
        return BES_GLOBALS.bibleTimeBySeries[seriesCode]?.[tagCode]?.[monthNumber]?.link ?? "";
    }
    if (type === "goingdeeper") {
        return BES_GLOBALS.goingDeeperBySeries[seriesCode]?.[tagCode]?.[monthNumber]?.link ?? "";
    }
    if (type === "gleaners") {
        return BES_GLOBALS.gleanersBySeries[seriesCode]?.[tagCode]?.[monthNumber]?.link ?? "";

    }
    return "";
};


const getCurrentSeriesList = (seriesCode: string, updateValues: responseLinks) => {
    const onlyTagged = {} as responseLinks;
    const besLinks = updateValues;
    for (const key in besLinks) {
        const filtered = besLinks[key].filter((value: propertyItem) => value.series === seriesCode).sort((a, b) => a.monthNumber - b.monthNumber);
        if (filtered.length === 0) {
            continue;
        }
        if (onlyTagged[key]?.length) {
            onlyTagged[key] = [...onlyTagged[key], ...filtered];
        }
        else {
            onlyTagged[key] = [...filtered];
        }
    }
    return onlyTagged;
};

const groupedBySeriesBes = (updateValues: responseLinks) => {
    const pivot: { [property: string]: responseLinks } = {};
    for (const series of gleanersSeriesNames) {
        const currentList = getCurrentSeriesList(series.code, updateValues);
        if (Object.keys(currentList).length !== 0) {
            pivot[series.code] = currentList;
        }
    }
    return pivot;
};


// Converts series number to corresponding alphabet
export const getAlphabetFromNumber = (num: number): string => {
    return (num + 10).toString(36);
};

export const getUpperCaseAlphabetFromNumber = (num: number): string => {
    return getAlphabetFromNumber(num).toUpperCase();
}

export const sortArrayById = (array: Array<{ id: number } & Record<string, unknown>>) =>
    array.sort((a, b) => a.id - b.id);

export const getLastElementsOfArray = (array: unknown[], number: number) => array.slice(-1 * number);

export const getButtonClassNamesAsString = (hierarchy: Button["hierarchy"], size: Button["size"]) => {
    const classList: string[] = "inline-flex mt-1 items-center justify-center capitalize rounded font-medium leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2".split(' ');

    //Form entry related css
    classList.push(...("disabled:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-500 disabled:translate-y-0 disabled:drop-shadow-none disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 transition duration-500".split(' ')));

    switch (hierarchy) {
        case "primary":
            classList.push(...("drop-shadow-md text-white bg-pbsblue focus:bg-blue-700 focus:shadow-lg  hover:bg-blue-700 hover:-translate-y-px hover:shadow-md active:translate-y-0 active:shadow-md active:bg-blue-700".split(' ')));
            break;
        case "secondary":
            classList.push(...("border border-pbsblue disabled:border-slate-200 disabled:border text-blue-900 bg-white focus:shadow-md hover:-translate-y-px hover:shadow-md active:translate-y-0 active:shadow-md focus:bg-gray-50 hover:bg-gray-50 active:bg-gray-50".split(' ')));
            break;
        case "tertiary":
            classList.push(...("text-blue-900 bg-gray-200 focus:bg-gray-300 hover:bg-gray-300 active:bg-gray-300".split(' ')));
            break;
        case "transparent":
            classList.push(...("text-blue-800 bg-transparent focus:underline hover:underline active:underline".split(' ')));
            break;
        case "delete":
            classList.push(...("shadow-md text-white bg-red-500 focus:bg-red-700 focus:shadow-md  hover:bg-red-700 hover:-translate-y-px hover:shadow-md active:translate-y-0 active:shadow-md active:bg-red-700".split(' ')));
    }

    switch (size) {
        case "large":
            classList.push(...("lg:text-lg text-base px-8 py-3 tracking-wide".split(' ')));
            break;
        case "medium":
            classList.push(...("p-2 lg:px-6 text-sm lg:text-base lg:py-2.5".split(' ')));
            break;
        case "small":
            classList.push(...("text-sm px-4 py-1.5".split(' ')));
            break;
        case "xsmall":
            classList.push(...("text-xs px-2 py-0.5 tracking-tight".split(' ')));
            break;
    }
    return [...new Set(classList.filter((item) => item.trim() !== ''))].join(' ');
}

export const truncateString = (value: string, index: number) => {
    return (value.length > index) ? `${value.slice(0, index - 1)}…` : value;
};

export const truncateStringEnd = (value: string, showLength: number) => {
    return (value.length > showLength) ? `…${value.slice(-1 * showLength)}` : value;
};

export const useScrollTo = (to: string, props: unknown) => {
    useEffect(() => {
        if (to && to !== "") {
            setTimeout(() => {
                scroller.scrollTo(to, props)
            }, 100);
        }
    }, [to, props]);
}

export const modalHelper = () => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [currentY, setCurrentY] = useState(0);
    const showModal = () => {
        const tempY = Math.round(window.scrollY);
        setCurrentY(tempY);
        dialogRef.current?.showModal();
        document.body.style.position = 'fixed';
        document.body.style.top = `-${tempY}px`;
    }
    const closeModal = () => {
        dialogRef.current?.close();
        document.body.style.overflow = "unset";
        document.body.style.position = '';
        document.body.style.top = '';
        animateScroll.scrollTo(currentY || 0, {
            duration: 0,
        });
    }
    return { dialogRef, showModal, closeModal };
}

export const getDateRangeLongString = (startDate: string, endDate: string) => {
    const getDaySuffix = (day: number) => {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    }
    const convertEndDate = (date: string) => {
        const newDate = new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
        return newDate.replace(/(\d+)(?=\s)/, (day) => {
            return day + (getDaySuffix(Number.parseInt(day)));
        })
    }
    const convertStartDate = (date: string) => {
        const newDate = new Date(date).toLocaleDateString('en-GB', { day: '2-digit' });
        return newDate + (getDaySuffix(Number.parseInt(newDate)));
    }

    return `${convertStartDate(startDate)} - ${convertEndDate(endDate)}`

}

// ************* Curriculum Helper ************
const mapLessonTypeToIcon = {
    paper: <span title="paper">
        <Newspaper />
    </span>,
    digital: <span title="digital">
        <DeviceTabletIcon className="w-6 h-6 text-blue-800" />
    </span>
}

export const getIconForLessonType = (lessonType?: "paper" | "digital") => {
    if (lessonType) {
        return mapLessonTypeToIcon[lessonType]
    }
    return "";
}
