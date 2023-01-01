import Heading2 from "@/Components/Typography/Heading2";
import { bibleTimeLevels } from "@/constants";
import LessonDownloadBar from "./LessonDownloadBar";

export default function MonthlyOverview({ children }) {
    const monthLessons = bibleTimeLevels;
    const assemblyVideo = {
        tag: "Online Presentation",
        themeColor: "bg-blue-500",
        title: "A9 - Changes After Salvation"
    };


    return (
        <div className="flex flex-col">
            <div className="mb-2">
                <Heading2>Bible Time Lessons</Heading2>
                <div className="space-y-1">
                    {
                        monthLessons.map((lesson, index) => (
                            <LessonDownloadBar key={index} title={lesson.title} infoText={lesson.level} infoClass={lesson.tagColor}></LessonDownloadBar>
                        ))
                    }
                </div>
            </div>
            <div className="mb-2">
                <Heading2>School Assembly Video</Heading2>
                <LessonDownloadBar title={assemblyVideo.title} infoText={assemblyVideo.tag} infoClass={assemblyVideo.themeColor}></LessonDownloadBar>
            </div>
        </div>
    );
}