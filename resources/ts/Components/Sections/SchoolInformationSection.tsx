
import SchoolInformationCard, { InformationCardProps } from "@/Components/Cards/SchoolInformationCard";
import ChevronRight from "@/Elements/Icons/ChevronRight";
import Envelope from "@/Elements/Icons/Envelope";
import Newspaper from "@/Elements/Icons/Newspaper";
import School from "@/Elements/Icons/SchoolIcon";
import HomeIcon from "@/Elements/Icons/HomeIcon";

export default function SchoolInformationSection({ schoolDetails }: { schoolDetails: SchoolDetailsProps }) {
    let cardRows: InformationCardProps[] = [];
    // let lessonRows: InformationCardProps[] = [];
    cardRows = [
        {
            title: 'School Name',
            value: schoolDetails.schoolName,
            Icon: School
        },
        {
            title: 'Email',
            value: schoolDetails.email,
            Icon: Envelope
        },
        {
            title: 'Contact Name',
            value: schoolDetails.contactName,
            Icon: Newspaper
        },
        {
            title: 'Address',
            value: <div className="w-full text-left whitespace-pre-line">{schoolDetails.address.replaceAll('\\n', '\n')}</div>,
            Icon: HomeIcon
        }
    ]

    // lessonRows = [
    //     {
    //         title: 'Level 0',
    //         value: schoolDetails.level0Order + "",
    //         Icon: ChevronRight,
    //         titleStyle: "text-white bg-bibletime-pink"
    //     },
    //     {
    //         title: 'Level 1',
    //         value: schoolDetails.level1Order + "",
    //         Icon: ChevronRight,
    //         titleStyle: "text-white bg-bibletime-orange"
    //     },
    //     {
    //         title: 'Level 2',
    //         value: schoolDetails.level2Order + "",
    //         Icon: ChevronRight,
    //         titleStyle: "text-white bg-bibletime-red"
    //     },
    //     {
    //         title: 'Level 3',
    //         value: schoolDetails.level3Order + "",
    //         Icon: ChevronRight,
    //         titleStyle: "text-white bg-bibletime-green"
    //     },
    //     {
    //         title: 'Level 4',
    //         value: schoolDetails.level4Order + "",
    //         Icon: ChevronRight,
    //         titleStyle: "text-white bg-bibletime-blue"
    //     },
    //     {
    //         title: 'Teacher Lesson Plans',
    //         value: schoolDetails.tlpOrder + "",
    //         Icon: ChevronRight
    //     },
    // ]

    return (
        <div className="flex flex-wrap items-start gap-2 mb-5">
            <SchoolInformationCard heading="School Information" helpText="If any of the details mentioned is incorrect, please send us an email with the correction." rows={cardRows} />
        </div>

    )
}