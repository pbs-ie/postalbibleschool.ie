import { gleanersSeriesNames } from "./constants";

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
    besLinks: responseLinks;
    bibleTimeBySeries: any;
    goingDeeperBySeries: any;
    gleanersBySeries: any;
}

export const BES_GLOBALS: BesLinksType = {
    besLinks: {},
    bibleTimeBySeries: {},
    goingDeeperBySeries: {},
    gleanersBySeries: {},
};

export const setBesLinksOnce = function (updateValue: responseLinks) {
    BES_GLOBALS.besLinks = updateValue;
    BES_GLOBALS.bibleTimeBySeries = groupedBySeriesBes();
};
export const setGoingDeeperLinks = function (updateValue: responseLinks) {
    BES_GLOBALS.besLinks = updateValue;
    BES_GLOBALS.goingDeeperBySeries = groupedBySeriesBes();
}
export const setGleanersLinks = function (updateValue: responseLinks) {
    BES_GLOBALS.besLinks = updateValue;
    BES_GLOBALS.gleanersBySeries = groupedBySeriesBes();
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

// Converts series number to corresponding alphabet
export const getAlphabetFromNumber = function (num: number): string {
    return (num + 10).toString(36);
};

const getCurrentSeriesList = function (seriesCode: string) {
    let onlyTagged = {} as responseLinks;
    const besLinks = BES_GLOBALS.besLinks;
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

const groupedBySeriesBes = function () {
    let pivot: { [property: string]: responseLinks } = {};
    gleanersSeriesNames.forEach((series) => {
        let currentList = getCurrentSeriesList(series.code);
        if (Object.keys(currentList).length !== 0) {
            pivot[series.code] = currentList;
        }
    });
    return pivot;
};
