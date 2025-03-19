import Heading3 from "@/Components/Typography/Heading3";
import { bibleTimeLevels, monthNames } from "@/constants";
import { getDownloadLink } from "@/helper";
import LessonDownloadButton from "@/Elements/Buttons/LessonDownloadButton";
import RedirectButtonWithPill from "@/Elements/Buttons/RedirectButtonWithPill";
import route from "ziggy-js";

interface Overview {
    selectedMonth: number;
    selectedSeriesAlphabet: string;
}

const monthLessons = bibleTimeLevels;
export default function LessonSelectorList({ selectedMonth, selectedSeriesAlphabet }: Overview) {

    return (
        <div className="flex flex-col justify-center px-2 md:px-0">
            <div className="mb-10">
                <Heading3>Bible Time Lessons</Heading3>
                <div className="space-y-2">
                    {
                        monthLessons.map((lesson) => (
                            <LessonDownloadButton downloadLink={getDownloadLink(selectedSeriesAlphabet, lesson.tagCode, selectedMonth)} key={`${lesson.tagName}-${selectedMonth}`} title={`${selectedSeriesAlphabet}${selectedMonth + 1} - ${monthNames[selectedMonth]}`} infoSubText={lesson.tagSubText} infoText={lesson.tagName} infoClass={lesson.tagColor} />
                        ))
                    }
                </div>
            </div>

            <div className="mb-2">
                <Heading3>School Assembly Video</Heading3>
                <RedirectButtonWithPill title="Go to Assembly Videos" pillText="Online Presentation" pillClass="bg-blue-500" downloadLink={route('assembly.index')} />
            </div>
        </div>
    );
}