import { seriesNames } from "./constants";

const BES_GLOBALS = {
    besLinks: {}
};

export const setBesLinksOnce = function (updateValue) {
    BES_GLOBALS.besLinks = updateValue;
    Object.freeze(BES_GLOBALS);
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

export const groupedBySeriesBes = function () {
    let pivot = {};
    seriesNames.forEach((series) => {
        pivot[series.code] = getCurrentSeriesList(series.code);
    });
    return pivot;
};
