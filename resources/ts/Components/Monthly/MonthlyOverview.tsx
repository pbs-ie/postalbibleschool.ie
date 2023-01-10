import Heading3 from "@/Components/Typography/Heading3";
import { bibleTimeLevels, monthNames } from "@/constants";
import { getAlphabetFromNumber, getDownloadLink } from "@/helper";
import LessonDownloadButton from "@/Components/Lesson/LessonDownloadButton";

interface Overview {
    selectedMonth: number,
    selectedSeries: number
}

export default function MonthlyOverview({ selectedMonth, selectedSeries }: Overview) {
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
                <Heading3>Bible Time Lessons</Heading3>
                <div className="space-y-1">
                    {
                        monthLessons.map((lesson, index) => (
                            <LessonDownloadButton downloadLink={getDownloadLink(seriesAlpha, lesson.tagCode, selectedMonth)} key={index} title={`${seriesAlpha}${selectedMonth + 1} - ${monthNames[selectedMonth]}`} infoText={lesson.tagName} infoClass={lesson.tagColor}></LessonDownloadButton>
                        ))
                    }
                </div>
            </div>
            <div className="mb-2">
                <Heading3>School Assembly Video</Heading3>
                <LessonDownloadButton title={`${seriesAlpha}${selectedMonth + 1} ${assemblyVideo.title}`} infoText={assemblyVideo.tag} infoClass={assemblyVideo.themeColor} downloadLink={""}></LessonDownloadButton>
            </div>
        </div>
    );
}