import OrderInfoCard from "@/Components/Cards/OrderInfoCard";
import ButtonLink from "@/Elements/Buttons/ButtonLink";
import SchoolInformationCard, { InformationCardProps } from "@/Components/Cards/SchoolInformationCard";
import ChevronRight from "@/Elements/Icons/ChevronRight";
import route from "ziggy-js";
import { ClassroomOrderAggregates } from "@/Pages/SchoolOrder/Show";
import _ from "lodash";

export default function SchoolOrderSection({ lessonOrder, classroomOrder }: { lessonOrder: LessonOrder, classroomOrder: ClassroomOrderAggregates }) {


    const schoolCardData: InformationCardProps[] = [
        {
            title: 'Level 0 Totals',
            value: +classroomOrder.level_0_order_total + "",
            Icon: ChevronRight,
            titleStyle: "text-white bg-bibletime-pink"
        },
        {
            title: 'Level 1 Totals',
            value: +classroomOrder.level_1_order_total + "",
            Icon: ChevronRight,
            titleStyle: "text-white bg-bibletime-orange"
        },
        {
            title: 'Level 2 Totals',
            value: +classroomOrder.level_2_order_total + "",
            Icon: ChevronRight,
            titleStyle: "text-white bg-bibletime-red"
        },
        {
            title: 'Level 3 Totals',
            value: +classroomOrder.level_3_order_total + "",
            Icon: ChevronRight,
            titleStyle: "text-white bg-bibletime-green"
        },
        {
            title: 'Level 4 Totals',
            value: +classroomOrder.level_4_order_total + "",
            Icon: ChevronRight,
            titleStyle: "text-white bg-bibletime-blue"
        },
        {
            title: 'Total Teacher Lesson Plans',
            value: +classroomOrder.tlp_order_total + "",
            Icon: ChevronRight
        },
    ]
    return (
        <>
            <div className="flex flex-col items-start justify-center w-full gap-4 p-4 mx-auto lg:flex-row">
                <div className="text-left">
                    <OrderInfoCard contactName={lessonOrder.contactName} schoolName={lessonOrder.schoolName} email={lessonOrder.email} level0Order={lessonOrder.level0Order} level1Order={lessonOrder.level1Order} level2Order={lessonOrder.level2Order} level3Order={lessonOrder.level3Order} level4Order={lessonOrder.level4Order} tlpOrder={lessonOrder.tlpOrder}></OrderInfoCard>
                </div>
                {_.isNull(classroomOrder.level_0_order_total) ?
                    <p className="w-full text-red-800 bg-red-200 lg:w-1/2">No classrooms created for this school</p>
                    :
                    <SchoolInformationCard heading={"Classroom Data"} rows={schoolCardData} />
                }
            </div>
        </>
    )
}