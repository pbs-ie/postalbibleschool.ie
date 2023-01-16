import LessonDownloadButton from "@/Components/Lesson/LessonDownloadButton";
import { gleanersSeriesNames, monthNames, seriesNames } from "@/constants";
import { getDownloadLink } from "@/helper";
import { useEffect, useState } from "react";

export default function LessonDownloadList({ tagClass = "bg-bibletime-pink", tagCode = "level0", isWideScreen = false, type = "bibletime" }) {
    const [gridCols, setGridCols] = useState("");
    const getSeries = () => {
        switch (type) {
            case "gleaners":
                return gleanersSeriesNames;
            default:
                return seriesNames;
        }
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
                    <div key={index} className="flex flex-col space-y-0.5">
                        <div className={`text-center h-fit w-full text-gray-50 ${tagClass} py-2 mb-2 rounded`}>{seriesElement.name}</div>
                        {
                            monthNames.map((month, index) => (
                                <LessonDownloadButton key={index} downloadLink={getDownloadLink(seriesElement.code, tagCode, index, type)} infoClass={tagClass} title={`${seriesElement.code}${(index + 1)}${type !== "gleaners" && isWideScreen ? ' - ' + month : ''}`} infoText={null}></LessonDownloadButton>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    );
}