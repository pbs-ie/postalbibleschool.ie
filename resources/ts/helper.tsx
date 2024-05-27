import { gleanersSeriesNames } from "@/constants";
import { useEffect } from "react";
import { scroller } from "react-scroll";

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
    bibleTimeBySeries: any;
    goingDeeperBySeries: any;
    gleanersBySeries: any;
}

const BES_GLOBALS: BesLinksType = {
    bibleTimeBySeries: {},
    goingDeeperBySeries: {},
    gleanersBySeries: {},
};

export const setAllBesLinks = function (bibleTimeValues: responseLinks, goingDeeperValues: responseLinks = {}, gleanersValues: responseLinks = {}) {
    BES_GLOBALS.bibleTimeBySeries = groupedBySeriesBes(bibleTimeValues);
    if (Object.keys(goingDeeperValues).length !== 0) {
        BES_GLOBALS.goingDeeperBySeries = groupedBySeriesBes(goingDeeperValues);
    }
    if (Object.keys(gleanersValues).length !== 0) {
        BES_GLOBALS.gleanersBySeries = groupedBySeriesBes(gleanersValues);
    }
}

// Returns the download url for BES lessons from the BES links list
export const getDownloadLink = function (seriesCode: string, tagCode: string, monthNumber: (number | string), type = "bibletime"): string {
    if (type === "bibletime") {
        return BES_GLOBALS.bibleTimeBySeries[seriesCode]?.[tagCode]?.[monthNumber]?.link ?? "";
    }
    else if (type === "goingdeeper") {
        return BES_GLOBALS.goingDeeperBySeries[seriesCode]?.[tagCode]?.[monthNumber]?.link ?? "";
    }
    else if (type === "gleaners") {
        return BES_GLOBALS.gleanersBySeries[seriesCode]?.[tagCode]?.[monthNumber]?.link ?? "";

    }
    return "";
};


const getCurrentSeriesList = function (seriesCode: string, updateValues: responseLinks) {
    let onlyTagged = {} as responseLinks;
    const besLinks = updateValues;
    for (const key in besLinks) {
        let filtered = besLinks[key].filter((value: propertyItem) => value.series === seriesCode);
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

const groupedBySeriesBes = function (updateValues: responseLinks) {
    let pivot: { [property: string]: responseLinks } = {};
    gleanersSeriesNames.forEach((series) => {
        let currentList = getCurrentSeriesList(series.code, updateValues);
        if (Object.keys(currentList).length !== 0) {
            pivot[series.code] = currentList;
        }
    });
    return pivot;
};


// Converts series number to corresponding alphabet
export const getAlphabetFromNumber = function (num: number): string {
    return (num + 10).toString(36);
};

export const getUpperCaseAlphabetFromNumber = (num: number): string => {
    return getAlphabetFromNumber(num).toUpperCase();
}

export const sortArrayById = (array: any[]) => array.sort((a, b) => a.id - b.id);

export const getLastElementsOfArray = (array: any[], number: number) => array.slice(-1 * number);

export const getButtonClassNamesAsString = (hierarchy: Button["hierarchy"], size: Button["size"]) => {
    let classList: string[] = "inline-flex mt-1 items-center justify-center capitalize rounded font-medium leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-300".split(' ');

    switch (hierarchy) {
        case "primary":
            classList.push(...("drop-shadow-md text-white bg-pbsblue focus:bg-blue-700 focus:drop-shadow-lg  hover:bg-blue-700 hover:-translate-y-px hover:drop-shadow-lg active:translate-y-0 active:drop-shadow-md active:bg-blue-700".split(' ')));
            break;
        case "secondary":
            classList.push(...("border border-pbsblue text-blue-900 bg-white focus:drop-shadow-lg hover:-translate-y-px hover:drop-shadow-lg active:translate-y-0 active:drop-shadow-md focus:bg-gray-50 hover:bg-gray-50 active:bg-gray-50".split(' ')));
            break;
        case "tertiary":
            classList.push(...("text-blue-900 bg-gray-200 focus:bg-gray-300 hover:bg-gray-300 active:bg-gray-300".split(' ')));
            break;
        case "transparent":
            classList.push(...("text-blue-800 bg-transparent focus:underline hover:underline active:underline".split(' ')));
    }

    switch (size) {
        case "large":
            classList.push(...("text-lg px-8 py-3 tracking-wide".split(' ')));
            break;
        case "medium":
            classList.push(...("px-6 py-2.5".split(' ')));
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
    return (value.length > index) ? value.slice(0, index - 1) + '…' : value;
};

export const truncateStringEnd = (value: string, showLength: number) => {
    return (value.length > showLength) ? '…' + value.slice(-1 * showLength) : value;
};

export const useScrollTo = (to: string, props: any) => {
    useEffect(() => {
        if (to && to !== "") {
            setTimeout(() => {
                scroller.scrollTo(to, props)
            }, 100);
        }
    }, [to]);
}