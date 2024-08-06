import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";

import SchoolOrderSection from "@/Components/Sections/SchoolOrderSection";
import { ProjectedOrders } from "@/Components/Sections/ProjectedOrdersSection";
import SchoolSelectDropdown, { SchoolsList } from "@/Components/SchoolOrders/SchoolSelectDropdown";
import ButtonLink from "@/Elements/Buttons/ButtonLink";
import ChevronLeft from "@/Elements/Icons/ChevronLeft";
import EditIcon from "@/Elements/Icons/EditIcon";

import route from "ziggy-js";


export default function Show({ lessonOrder, schoolsList, classrooms, projectedOrders = [], curricula = [] }: { lessonOrder: LessonOrder, schoolsList: SchoolsList[], classrooms: ClassroomProps[], projectedOrders: ProjectedOrders[], curricula: CurriculumProps[] }) {

    return (
        <WrapperLayout>
            <ButtonLink hierarchy="transparent" href={route('orders.index')}><span className="flex items-center gap-2">
                <ChevronLeft />{"Back to List"}
            </span></ButtonLink>
            <ContentWrapper title="School Lesson Order">
                <div className="flex items-baseline gap-2 bg-gray-100 rounded ">

                    <SchoolSelectDropdown currentSchoolId={lessonOrder.id} schoolsList={schoolsList} />
                    <ButtonLink Icon={EditIcon} href={route('orders.edit', lessonOrder.id)}>Edit</ButtonLink>
                </div>
                <SchoolOrderSection lessonOrder={lessonOrder} classrooms={classrooms} projectedOrders={projectedOrders} curricula={curricula} />

            </ContentWrapper>
        </WrapperLayout>
    )
}