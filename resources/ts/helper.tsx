import { seriesNames } from "./constants";

interface BesLinksType {
    besLinks: any;
    besLinksBySeries: any;
}

const BES_GLOBALS: BesLinksType = {
    besLinks: {},
    besLinksBySeries: {}
};

export const setBesLinksOnce = function (updateValue: any) {
    BES_GLOBALS.besLinks = updateValue;
    BES_GLOBALS.besLinksBySeries = groupedBySeriesBes();
    Object.freeze(BES_GLOBALS);
};

// Returns the download url for BES lessons from the BES links list
export const getDownloadLink = function (seriesCode: string, tagCode: string, monthNumber: (number|string)): string {
    return BES_GLOBALS.besLinksBySeries[seriesCode][tagCode][monthNumber]?.link ?? "";
};

// Converts series number to corresponding alphabet
export const getAlphabetFromNumber = function (num: number): string {
    return (num + 10).toString(36);
};

const getCurrentSeriesList = function (seriesCode: string) {
    let onlyTagged = {} as any;
    const besLinks = BES_GLOBALS.besLinks;
    for (const key in besLinks) {
        let filtered = besLinks[key].filter((value: any) => value.series === seriesCode);
        if (onlyTagged[key]?.length)
            onlyTagged[key] = [...onlyTagged[key], ...filtered];
        else {
            onlyTagged[key] = [...filtered];
        }
    }
    return onlyTagged;
};

const groupedBySeriesBes = function () {
    let pivot = {} as any;
    seriesNames.forEach((series) => {
        pivot[series.code] = getCurrentSeriesList(series.code);
    });
    return pivot;
};
