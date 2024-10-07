import _ from "lodash";
import SchoolInformationCard, { InformationCardProps } from "@/Components/Cards/SchoolInformationCard";
import ChevronRight from "@/Elements/Icons/ChevronRight";
import Envelope from "@/Elements/Icons/Envelope";
import Newspaper from "@/Elements/Icons/Newspaper";
import School from "@/Elements/Icons/SchoolIcon";
import HomeIcon from "@/Elements/Icons/HomeIcon";

export default function SchoolInformationSection({ lessonOrder }: { lessonOrder: LessonOrder }) {
    let cardRows: InformationCardProps[] = [];
    // let lessonRows: InformationCardProps[] = [];
    if (!_.isEmpty(lessonOrder)) {
        cardRows = [
            {
                title: 'School Name',
                value: lessonOrder.schoolName,
                Icon: School
            },
            {
                title: 'Email',
                value: lessonOrder.email,
                Icon: Envelope
            },
            {
                title: 'Contact Name',
                value: lessonOrder.contactName,
                Icon: Newspaper
            },
            {
                title: 'Address',
                value: <div className="w-full text-left whitespace-pre-line">{lessonOrder.address.replaceAll('\\n', '\n')}</div>,
                Icon: HomeIcon
            }
        ]

        // lessonRows = [
        //     {
        //         title: 'Level 0',
        //         value: lessonOrder.level0Order + "",
        //         Icon: ChevronRight,
        //         titleStyle: "text-white bg-bibletime-pink"
        //     },
        //     {
        //         title: 'Level 1',
        //         value: lessonOrder.level1Order + "",
        //         Icon: ChevronRight,
        //         titleStyle: "text-white bg-bibletime-orange"
        //     },
        //     {
        //         title: 'Level 2',
        //         value: lessonOrder.level2Order + "",
        //         Icon: ChevronRight,
        //         titleStyle: "text-white bg-bibletime-red"
        //     },
        //     {
        //         title: 'Level 3',
        //         value: lessonOrder.level3Order + "",
        //         Icon: ChevronRight,
        //         titleStyle: "text-white bg-bibletime-green"
        //     },
        //     {
        //         title: 'Level 4',
        //         value: lessonOrder.level4Order + "",
        //         Icon: ChevronRight,
        //         titleStyle: "text-white bg-bibletime-blue"
        //     },
        //     {
        //         title: 'Teacher Lesson Plans',
        //         value: lessonOrder.tlpOrder + "",
        //         Icon: ChevronRight
        //     },
        // ]
    }
    return (
        _.isEmpty(lessonOrder) ? null
            :
            <div className="flex flex-wrap items-start gap-2 mb-5">
                <SchoolInformationCard heading="School Information" helpText="If any of the details mentioned is incorrect, please send us an email with the correction." rows={cardRows} />
            </div>

    )
}