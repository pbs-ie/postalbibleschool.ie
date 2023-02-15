import Heading3 from "@/Components/Typography/Heading3";
import { bibleTimeLevels, monthNames } from "@/constants";
import { getDownloadLink } from "@/helper";
import LessonDownloadButton from "@/Components/Lesson/LessonDownloadButton";
import RedirectButtonWithPill from "@/Components/Buttons/RedirectButtonWithPill";

interface Overview {
    selectedMonth: number;
    selectedSeriesAlphabet: string;
    assemblyTitle?: string;
    assemblyLink?: string;
    assemblySeries?: string;
    assemblyImageLink?: string;
}

export default function LessonSelectorList({ selectedMonth, selectedSeriesAlphabet, assemblyTitle = "", assemblyLink = "", assemblySeries = "", assemblyImageLink = "" }: Overview) {
    const monthLessons = bibleTimeLevels;

    return (
        <div className="flex flex-col justify-center px-2 md:px-0">
            <div className="mb-10">
                <Heading3>Bible Time Lessons</Heading3>
                <div className="space-y-2">
                    {
                        monthLessons.map((lesson, index) => (
                            <LessonDownloadButton downloadLink={getDownloadLink(selectedSeriesAlphabet, lesson.tagCode, selectedMonth)} key={index} title={`${selectedSeriesAlphabet}${selectedMonth + 1} - ${monthNames[selectedMonth]}`} infoSubText={lesson.tagSubText} infoText={lesson.tagName} infoClass={lesson.tagColor}></LessonDownloadButton>
                        ))
                    }
                </div>
            </div>
            {(assemblyTitle && assemblyTitle !== "") ?
                <div className="mb-2">
                    <Heading3>School Assembly Video</Heading3>
                    <RedirectButtonWithPill title={`${assemblySeries} ${assemblyTitle}`} pillText={monthNames[selectedMonth]} pillClass="bg-blue-500" downloadLink={assemblyLink} imageLink={assemblyImageLink}></RedirectButtonWithPill>
                </div>
                :
                <div className="mb-2">
                    <Heading3>School Assembly Video</Heading3>
                    <RedirectButtonWithPill title="Go to Assembly Videos" pillText="Online Presentation" pillClass="bg-blue-500" downloadLink={route('assembly.index')}></RedirectButtonWithPill>
                </div>
            }
        </div>
    );
}