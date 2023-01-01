import { seriesNames } from "./constants";

const BES_GLOBALS = {
    besLinks: {},
    besLinksBySeries: {}
};

export const setBesLinksOnce = function (updateValue) {
    BES_GLOBALS.besLinks = updateValue;
    BES_GLOBALS.besLinksBySeries = groupedBySeriesBes();
    Object.freeze(BES_GLOBALS);
};

// Returns the download url for BES lessons from the BES links list
export const getDownloadLink = function (seriesCode, tagCode, monthNumber) {
    return BES_GLOBALS.besLinksBySeries[seriesCode][tagCode][monthNumber]?.link ?? "";
};

// Converts series number to corresponding alphabet
export const getAlphabetFromNumber = function (num) {
    return (num + 10).toString(36);
};

const getCurrentSeriesList = function (seriesCode) {
    let onlyTagged = {};
    const besLinks = BES_GLOBALS.besLinks;
    for (const key in besLinks) {
        let filtered = besLinks[key].filter((value) => value.series === seriesCode);
        if (onlyTagged[key]?.length)
            onlyTagged[key] = [...onlyTagged[key], ...filtered];
        else {
            onlyTagged[key] = [...filtered];
        }
    }
    return onlyTagged;
};

const groupedBySeriesBes = function () {
    let pivot = {};
    seriesNames.forEach((series) => {
        pivot[series.code] = getCurrentSeriesList(series.code);
    });
    return pivot;
};
