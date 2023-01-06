import { seriesNames } from "./constants";

interface propertyItem {
    link: string;
    dateModified: string;
    size: string;
    series: string;
    monthNumber: number;
}
interface responseLinks {
    [property: string]: Array<propertyItem>;
}

interface BesLinksType {
    besLinks: responseLinks;
    besLinksBySeries: any;
}

const BES_GLOBALS: BesLinksType = {
    besLinks: {},
    besLinksBySeries: {}
};

export const setBesLinksOnce = function (updateValue: responseLinks) {
    BES_GLOBALS.besLinks = updateValue;
    BES_GLOBALS.besLinksBySeries = groupedBySeriesBes();
    Object.freeze(BES_GLOBALS);
};

// Returns the download url for BES lessons from the BES links list
export const getDownloadLink = function (seriesCode: string, tagCode: string, monthNumber: (number | string)): string {
    return BES_GLOBALS.besLinksBySeries[seriesCode]?.[tagCode]?.[monthNumber]?.link ?? "";
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
    seriesNames.forEach((series) => {
        let currentList = getCurrentSeriesList(series.code);
        if (Object.keys(currentList).length !== 0) {
            pivot[series.code] = currentList;
        }
    });
    return pivot;
};
