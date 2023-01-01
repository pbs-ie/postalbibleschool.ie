import LessonDownloadButton from "@/Components/MonthlyLessons/LessonDownloadButton";
import { monthNames, seriesNames } from "@/constants";
import { getDownloadLink } from "@/helper";
import { useEffect, useState } from "react";

export default function LessonDownloadList({ tagClass = "bg-bibletime-pink", tagCode = "level0" }) {
    const [isWideScreen, setIsWideScreen] = useState(false);


    useEffect(() => {
        const mql = window.matchMedia("(min-width: 640px)");
        const onChange = () => setIsWideScreen(!!mql.matches);
        mql.addEventListener("change", onChange);

        setIsWideScreen(mql.matches);

        return () => {
            mql.removeEventListener("change", onChange);
        };

    }, []);



    return (
        <div className={`grid grid-cols-${seriesNames.length} gap-4`}>
            {
                seriesNames.map((seriesElement, index) => (
                    <div key={index} className="flex flex-col space-y-0.5">
                        <div className={`text-center h-fit w-full text-gray-50 ${tagClass} py-2 mb-2 rounded`}>{seriesElement.name}</div>
                        {
                            monthNames.map((month, index) => (
                                <LessonDownloadButton key={index} getDownloadLink={getDownloadLink(seriesElement.code, tagCode, index)} infoClass={tagClass} title={`${seriesElement.code}${(index + 1)}${isWideScreen ? ' - ' + month : ''}`}></LessonDownloadButton>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    );
}