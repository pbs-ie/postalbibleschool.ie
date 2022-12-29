import Heading2 from "@/Components/Typography/Heading2";
import LessonDownloadBar from "./LessonDownloadBar";

export default function MonthlyOverview({ children }) {
    const monthLessons = [
        {
            level: "Level 0",
            themeColor: "bg-bibletime-pink",
            title: "A9-Jacob"
        },
        {
            level: "Level 1",
            themeColor: "bg-bibletime-orange",
            title: "A9-Jacob"
        },
        {
            level: "Level 2",
            themeColor: "bg-bibletime-red",
            title: "A9-Jacob"
        },
        {
            level: "Level 3",
            themeColor: "bg-bibletime-green",
            title: "A9-Jacob"
        },
        {
            level: "Level 4",
            themeColor: "bg-bibletime-blue",
            title: "A9-Jacob"
        }
    ];
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
                            <LessonDownloadBar key={index} title={lesson.title} infoText={lesson.level} infoClass={lesson.themeColor}></LessonDownloadBar>
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