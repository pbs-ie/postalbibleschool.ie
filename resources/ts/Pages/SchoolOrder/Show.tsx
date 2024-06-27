import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";

import SchoolOrderSection from "@/Components/Sections/SchoolOrderSection";
import SchoolSelectDropdown from "@/Components/SchoolOrders/SchoolSelectDropdown";
import ButtonLink from "@/Elements/Buttons/ButtonLink";
import ChevronLeft from "@/Elements/Icons/ChevronLeft";
import route from "ziggy-js";

export type SchoolsList = Pick<LessonOrder, "id" | "schoolName">;
export interface ClassroomOrderAggregates {
    level_0_order_total: number;
    level_1_order_total: number;
    level_2_order_total: number;
    level_3_order_total: number;
    level_4_order_total: number;
    tlp_order_total: number;
}
export default function Show({ lessonOrder, schoolsList, classroomOrder }: { lessonOrder: LessonOrder, schoolsList: SchoolsList[], classroomOrder: ClassroomOrderAggregates }) {

    return (
        <WrapperLayout>
            <ButtonLink hierarchy="transparent" href={route('orders.index')}><span className="flex items-center gap-2">
                <ChevronLeft />{"Back to List"}
            </span></ButtonLink>
            <ContentWrapper title="School Lesson Order">
                <SchoolSelectDropdown currentSchoolId={lessonOrder.id} schoolsList={schoolsList} />
                <SchoolOrderSection lessonOrder={lessonOrder} classroomOrder={classroomOrder} />
                <div className="inline-flex justify-end w-full gap-2 mt-5 md:justify-end">
                    <ButtonLink hierarchy="secondary" href={route('orders.index')}>Back</ButtonLink>
                    <ButtonLink href={route('orders.edit', lessonOrder.id)}>Edit</ButtonLink>
                </div>
            </ContentWrapper>
        </WrapperLayout>
    )
}