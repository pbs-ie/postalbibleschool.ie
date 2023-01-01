import Heading2 from "@/Components/Typography/Heading2";
import { bibleTimeLevels, monthNames } from "@/constants";
import { getAlphabetFromNumber, getDownloadLink } from "@/helper";
import LessonDownloadButton from "./LessonDownloadButton";

export default function MonthlyOverview({ selectedMonth, selectedSeries, children }) {
    const monthLessons = bibleTimeLevels;
    const seriesAlpha = getAlphabetFromNumber(selectedSeries).toUpperCase();

    const assemblyVideo = {
        tag: "Online Presentation",
        themeColor: "bg-blue-500",
        title: "Changes After Salvation"
    };

    return (
        <div className="flex flex-col">
            <div className="mb-2">
                <Heading2>Bible Time Lessons</Heading2>
                <div className="space-y-1">
                    {
                        monthLessons.map((lesson, index) => (
                            <LessonDownloadButton getDownloadLink={getDownloadLink(seriesAlpha, lesson.tagCode, selectedMonth)} key={index} title={`${seriesAlpha}${selectedMonth + 1} - ${monthNames[selectedMonth]}`} infoText={lesson.tagName} infoClass={lesson.tagColor}></LessonDownloadButton>
                        ))
                    }
                </div>
            </div>
            <div className="mb-2">
                <Heading2>School Assembly Video</Heading2>
                <LessonDownloadButton title={`${seriesAlpha}${selectedMonth + 1} ${assemblyVideo.title}`} infoText={assemblyVideo.tag} infoClass={assemblyVideo.themeColor}></LessonDownloadButton>
            </div>
        </div>
    );
}