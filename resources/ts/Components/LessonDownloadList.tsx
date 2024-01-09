import LessonDownloadButton from "@/Elements/Buttons/LessonDownloadButton";
import { gleanersSeriesNames, goingDeeperSeriesNames, monthNames, SeriesName, seriesNames } from "@/constants";
import { getDownloadLink } from "@/helper";
import { useEffect, useState } from "react";

interface LessonDownloadList {
    tagClass: string;
    tagCode: string;
    isWideScreen: boolean;
    type: "bibletime" | "goingdeeper" | "gleaners"
}

export default function LessonDownloadList({ tagClass = "bg-bibletime-pink", tagCode = "level0", isWideScreen = false, type = "bibletime" }: LessonDownloadList) {
    const [gridCols, setGridCols] = useState("");
    const getSeries = () => {
        switch (type) {
            case "gleaners":
                return gleanersSeriesNames;
            case "goingdeeper":
                return goingDeeperSeriesNames;
            default:
                return seriesNames;
        }
    }
    const getActiveTagClass = (seriesElement: SeriesName) => {
        return seriesElement.tagClass === "" ? tagClass : seriesElement.tagClass;
    }


    useEffect(() => {
        if (type === "gleaners") {
            setGridCols("grid-cols-5");
        } else {
            setGridCols("grid-cols-3");
        }
    }, [])

    return (
        <div className={`grid ${gridCols} gap-1`}>
            {
                getSeries().map((seriesElement, index) => (
                    <div key={index} className="flex flex-col gap-0.5">
                        <div className={`text-center h-fit w-full text-gray-50 ${getActiveTagClass(seriesElement)} p-2 mb-2 rounded`}>{seriesElement.name}</div>
                        {
                            monthNames.map((month, index) => (
                                <LessonDownloadButton key={index} downloadLink={getDownloadLink(seriesElement.code, tagCode, index, type)} infoClass={getActiveTagClass(seriesElement)} title={`${seriesElement.code}${(index + 1)}${type !== "gleaners" && isWideScreen ? ' - ' + month : ''}`}></LessonDownloadButton>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    );
}