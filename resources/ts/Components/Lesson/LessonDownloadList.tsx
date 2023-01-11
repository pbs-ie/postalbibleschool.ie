import LessonDownloadButton from "@/Components/Lesson/LessonDownloadButton";
import { monthNames, seriesNames } from "@/constants";
import { getDownloadLink } from "@/helper";
import { useEffect, useState } from "react";

export default function LessonDownloadList({ tagClass = "bg-bibletime-pink", tagCode = "level0", isWideScreen = false }) {




    return (
        <div className={`grid grid-cols-${seriesNames.length} gap-4`}>
            {
                seriesNames.map((seriesElement, index) => (
                    <div key={index} className="flex flex-col space-y-0.5">
                        <div className={`text-center h-fit w-full text-gray-50 ${tagClass} py-2 mb-2 rounded`}>{seriesElement.name}</div>
                        {
                            monthNames.map((month, index) => (
                                <LessonDownloadButton key={index} downloadLink={getDownloadLink(seriesElement.code, tagCode, index)} infoClass={tagClass} title={`${seriesElement.code}${(index + 1)}${isWideScreen ? ' - ' + month : ''}`} infoText={null}></LessonDownloadButton>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    );
}